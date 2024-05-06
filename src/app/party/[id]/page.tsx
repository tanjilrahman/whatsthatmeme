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
import LanguageDropdown from "@/components/ui/LanguageDropdown";

const Party = ({ params: { id } }: { params: { id: string } }) => {
  const {
    userName,
    setUserName,
    partyId,
    setPartyId,
    setMemes,
    players,
    setPlayers,
    setRounds,
    phase,
    setPhase,
  } = useGlobalContext();
  const [spectating, setSpectating] = useState(Boolean);
  const [party, loading] = useDocument(doc(db, "parties", id));
  const [placeholder, setPlaceholder] = useState(0);
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const isHost = players[0]?.name === userName;

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

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Event handler to capture the beforeinstallprompt event
    const handleBeforeInstallPrompt = (event: Event) => {
      const beforeInstallEvent = event as BeforeInstallPromptEvent;
      event.preventDefault();
      setDeferredPrompt(beforeInstallEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
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
      const existingPlayers: string[] = partyData?.players?.map(
        (player: any) => player.name
      );
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
      const updatedUsers = currentUsers.filter(
        (user: any) => user.name !== userName
      );

      await updateDoc(documentRef, { players: updatedUsers });
      router.push("/");
    } else {
      router.push("/");
    }
  };

  if (loading || pageLoading) return <LoadingPage />;
  if (!party?.data()?.code) return <NotFoundPage />;
  return (
    <section className="flex flex-col justify-between text-center">
      <PartyModal
        partyCode={party?.data()?.code}
        toggleModal={toggleModal}
        closeModal={closeModal}
      />

      {/* <div className="overflow-hidden">
        <div
          aria-hidden={true}
          className="absolute inset-x-0 w-16 rotate-45 rounded-full opacity-50 inset-y-16 bg bg-gradient-to-b from-pink-500 to-purple-600 blur-3xl"
        />
        <div
          aria-hidden={true}
          className="absolute inset-y-0 w-16 ml-auto rotate-45 rounded-full opacity-50 inset-x-16 bg bg-gradient-to-b from-pink-500 to-purple-600 blur-3xl"
        />
      </div> */}
      <section>
        <header className="fixed top-0 left-0 z-40 w-full bg-bgDark">
          {phase != 0 && <Timer />}
          <div className="flex items-center justify-between px-6 pt-4 pb-4 md:px-8 md:pb-6 md:pt-6">
            <div>
              <LogoHeader />
            </div>

            <div className="flex space-x-4 font-normal text-textDark">
              <LanguageDropdown isHost={isHost} />
              {phase != 0 && (
                <div
                  className="transition-colors duration-200 ease-in-out cursor-pointer hover:text-primary"
                  onClick={openModal}
                >
                  <MdGroups className="mx-auto text-2xl" />
                  <p>Party</p>
                </div>
              )}

              <div
                className="transition-colors duration-200 ease-in-out cursor-pointer hover:text-orange-500"
                onClick={leaveParty}
              >
                <BiSolidExit className="mx-auto text-2xl" />
                <p>Leave</p>
              </div>

              {spectating && (
                <div className="text-orange-500">
                  <AiFillEye className="mx-auto text-2xl" />
                  <p>Spectating</p>
                </div>
              )}
              {deferredPrompt && (
                <div
                  onClick={handleInstall}
                  className="transition-colors duration-200 ease-in-out cursor-pointer text-textDark hover:text-primary"
                >
                  <MdInstallMobile className="mx-auto text-2xl" />
                  <p>Install</p>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="mt-24 md:mt-36" />
        {phase === 0 && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="mt-4 mb-10 space-y-3 md:space-y-4 md:mb-12">
              <p className="text-xl font-bold md:text-2xl">Party Code</p>
              <p className="py-3 bg-bgLight inline-block tracking-[35px] pl-[35px] rounded-xl border border-gray-700 text-lg md:text-xl">
                {party?.data()?.code}
              </p>
            </div>

            <div className="max-w-xs mx-auto mb-6 space-y-3 md:space-y-5 lg:max-w-sm">
              <p className="text-xl font-bold md:text-2xl">Players</p>
              <div className="grid grid-cols-4 gap-4">
                {players.map((player, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="relative mb-2 rounded-full w-14 h-14 lg:w-16 lg:h-16 bg-slate-400">
                      <Image
                        src={`https://api.multiavatar.com/${player.avatar}.png`}
                        alt="avatar"
                        fill
                      />
                    </div>
                    <p className="font-normal text-textDark text-base lg:text-lg max-w-[65px] text-center">
                      {player.name}
                    </p>
                  </div>
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
                    <div className="relative mb-2 border border-dashed rounded-full w-14 h-14 lg:w-16 lg:h-16 border-slate-600" />
                    <div className=" h-4 w-14 bg-bgLight rounded-xl mt-[6px] md:mt-[8px]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {phase != 0 && (
          <p
            className={`${
              phase == 7 ? "text-center" : "text-left"
            } max-w-xl mx-auto px-6 text-xl md:text-2xl font-bold`}
          >
            {phase === 1 && "Select Meme"} {phase === 3 && "Pick a GIF"}{" "}
            {phase === 4 && "Slideshow"}
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
