"use client";
import Gif from "@/components/Gif";
import Meme from "@/components/Meme";
import RegenerateModal from "@/components/ui/RegenerateModal";
import Start from "@/components/Start";
import { Timer } from "@/components/Timer";
import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useGlobalContext } from "../../context/store";
import { BiSolidExit } from "react-icons/bi";
import LoadingPage from "@/components/ui/LoadingPage";
import { AiFillEye } from "react-icons/ai";
import NotFoundPage from "@/components/ui/NotFoundPage";
import { MdInstallMobile, MdGroups } from "react-icons/md";
import PageAnimation from "@/components/ui/PageAnimation";
import { motion } from "framer-motion";
import LogoHeader from "@/components/logo/LogoHeader";
import PartyModal from "@/components/ui/PartyModal";
import { toast } from "react-toastify";
const Party = ({ params: { id } }: { params: { id: string } }) => {
  const { userName, setUserName, partyId, setPartyId, setMemes, players, setPlayers, setRounds, phase, setPhase } =
    useGlobalContext();
  const [spectating, setSpectating] = useState(Boolean);
  const [party, loading] = useDocument(doc(db, "parties", id));
  const [placeholder, setPlaceholder] = useState(0);
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);

  function closeModal() {
    setToggleModal(false);
  }

  function openModal() {
    setToggleModal(true);
  }

  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    prompt(): Promise<void>;
  }

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Event handler to capture the beforeinstallprompt event
    const handleBeforeInstallPrompt = (event: Event) => {
      const beforeInstallEvent = event as BeforeInstallPromptEvent;
      event.preventDefault();
      setDeferredPrompt(beforeInstallEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
    }
  };

  useEffect(() => {
    const cachedUserName = localStorage.getItem("playerName");

    if (cachedUserName) {
      setUserName(cachedUserName);
    }
    setPartyId(id);
  }, []);

  useEffect(() => {
    if (party) {
      const partyData = party.data();
      setPlayers(partyData?.players);
      setMemes(partyData?.memes);
      setRounds(partyData?.rounds);
      setPhase(partyData?.phase);
      const existingPlayers: string[] = partyData?.players?.map((player: any) => player.name);
      const isSpectating = !existingPlayers?.includes(userName);
      setSpectating(isSpectating);
    }
  }, [party]);

  useEffect(() => {
    if (players.length < 4) {
      setPlaceholder(4 - players.length);
    } else {
      setPlaceholder(0);
    }
  }, [players]);

  const leaveParty = async () => {
    if (party && !spectating) {
      setPageLoading(true);
      const documentRef = doc(db, "parties", partyId);
      const currentUsers = party.data()?.players;
      const updatedUsers = currentUsers.filter((user: any) => user.name !== userName);

      await updateDoc(documentRef, { players: updatedUsers });
      router.push("/");
    } else {
      router.push("/");
    }
  };

  if (loading || pageLoading) return <LoadingPage />;
  if (!party?.data()?.code) return <NotFoundPage />;
  return (
    <section className="text-center flex flex-col justify-between">
      <PartyModal partyCode={party?.data()?.code} toggleModal={toggleModal} closeModal={closeModal} />

      {/* <div className="overflow-hidden">
        <div
          aria-hidden={true}
          className="absolute inset-y-16 inset-x-0 w-16 rounded-full rotate-45 bg bg-gradient-to-b from-pink-500 to-purple-600 blur-3xl opacity-50"
        />
        <div
          aria-hidden={true}
          className="absolute inset-x-16 inset-y-0 w-16 rounded-full rotate-45 ml-auto  bg bg-gradient-to-b from-pink-500 to-purple-600 blur-3xl opacity-50"
        />
      </div> */}
      <section>
        <header className="fixed w-full bg-bgDark top-0 left-0">
          {phase != 0 && <Timer />}
          <div className="flex justify-between items-center px-6 md:px-8 pb-4 md:pb-6 pt-4 md:pt-6">
            <div>
              <LogoHeader />
            </div>

            <div className="flex text-textDark font-normal space-x-4">
              {phase != 0 && (
                <div
                  className="hover:text-primary cursor-pointer transition-colors duration-200 ease-in-out"
                  onClick={openModal}
                >
                  <MdGroups className="text-2xl mx-auto" />
                  <p>Party</p>
                </div>
              )}

              <div
                className="hover:text-orange-500 cursor-pointer transition-colors duration-200 ease-in-out"
                onClick={leaveParty}
              >
                <BiSolidExit className="text-2xl mx-auto" />
                <p>Leave</p>
              </div>

              {spectating && (
                <div className="text-orange-500">
                  <AiFillEye className="text-2xl mx-auto" />
                  <p>Spectating</p>
                </div>
              )}
              {deferredPrompt && (
                <div
                  onClick={handleInstall}
                  className="text-textDark hover:text-primary cursor-pointer transition-colors duration-200 ease-in-out"
                >
                  <MdInstallMobile className="text-2xl mx-auto" />
                  <p>Install</p>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="mt-24 md:mt-36" />
        {phase === 0 && (
          <div>
            <div className="space-y-3 md:space-y-4 mt-4 mb-10 md:mb-12">
              <p className="text-xl md:text-2xl font-bold">Party Code</p>
              <p className="py-3 bg-bgLight inline-block tracking-[35px] pl-[35px] rounded-xl border border-gray-700 text-lg md:text-xl">
                {party?.data()?.code}
              </p>
            </div>

            <div className="space-y-3 md:space-y-5 mb-6 max-w-xs lg:max-w-sm mx-auto">
              <p className="text-xl md:text-2xl font-bold">Players</p>
              <div className="grid grid-cols-4 gap-4">
                {players.map((player, i) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { ease: "easeInOut", duration: 0.3 },
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: "easeInOut", duration: 0.3 }}
                    key={i}
                    className="flex flex-col items-center"
                  >
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-slate-400 rounded-full mb-2 relative">
                      <Image src={`https://api.multiavatar.com/${player.avatar}.png`} alt="avatar" fill />
                    </div>
                    <p className="font-normal text-textDark text-base lg:text-lg max-w-[65px] text-center">
                      {player.name}
                    </p>
                  </motion.div>
                ))}
                {Array.from({ length: placeholder }).map((_, index) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { ease: "easeInOut", duration: 0.3 },
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: "easeInOut", duration: 0.3 }}
                    key={index}
                    className="flex flex-col items-center"
                  >
                    <div className="w-14 h-14 lg:w-16 lg:h-16 border border-dashed border-slate-600 rounded-full mb-2 relative" />
                    <div className=" h-4 w-14 bg-bgLight rounded-xl mt-[6px] md:mt-[8px]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {phase != 0 && (
          <p
            className={`${
              phase == 7 ? "text-center" : "text-left"
            } max-w-xl mx-auto px-6 text-xl md:text-2xl font-bold`}
          >
            {phase === 1 && "Select Meme"} {phase === 3 && "Pick a GIF"} {phase === 4 && "Slideshow"}
            {phase === 5 && "Vote"}
            {phase === 6 && "Round Winner 🎉"}
            {phase === 7 && "Game Winner 🎉"}
          </p>
        )}
        <Meme />

        <Gif />
      </section>
      <div>
        {(phase == 0 || phase == 7) && <Start />}
        {phase == 1 && <RegenerateModal />}
      </div>

      <PageAnimation />
    </section>
  );
};

export default Party;
