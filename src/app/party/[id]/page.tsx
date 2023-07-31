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
import { MdInstallMobile } from "react-icons/md";
import PageAnimation from "@/components/ui/PageAnimation";

const Party = ({ params: { id } }: { params: { id: string } }) => {
  const { userName, setUserName, partyId, setPartyId, setMemes, players, setPlayers, setRounds, phase, setPhase } =
    useGlobalContext();
  const [spectating, setSpectating] = useState(Boolean);
  const [party, loading] = useDocument(doc(db, "parties", id));
  const [placeholder, setPlaceholder] = useState(0);
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
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
    if (party) {
      setPageLoading(true);
      const documentRef = doc(db, "parties", partyId);
      const currentUsers = party.data()?.players;
      const updatedUsers = currentUsers.filter((user: any) => user.name !== userName);

      await updateDoc(documentRef, { players: updatedUsers });
      router.push("/");
    }
  };

  if (loading || pageLoading) return <LoadingPage />;
  if (!party?.data()?.code) return <NotFoundPage />;
  return (
    <section className="text-center flex flex-col justify-between">
      <section>
        <header className="fixed w-full bg-bgDark top-0 left-0 z-40">
          {phase != 0 && <Timer />}
          <div className="flex justify-between items-center px-6 md:px-8 pb-4 md:pb-6 pt-4 md:pt-6">
            <div className="w-[135px] h-[62px] relative ">
              <Image src="/logo.svg" fill alt="logo" className="object-contain" />
            </div>
            <div className="flex text-textDark font-normal space-x-4">
              {spectating ? (
                <div>
                  <AiFillEye className="text-2xl mx-auto" />
                  <p>Spectating</p>
                </div>
              ) : (
                <div
                  className="hover:text-orange-500 cursor-pointer transition-colors duration-200 ease-in-out"
                  onClick={leaveParty}
                >
                  <BiSolidExit className="text-2xl mx-auto" />
                  <p>Leave</p>
                </div>
              )}
              <div>
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
          </div>
        </header>
        <div className="mt-28" />
        {phase === 0 && (
          <div>
            <div className="space-y-4 mt-4 mb-12">
              <p className="text-2xl font-bold">Party Code</p>
              <p className="py-3 bg-bgLight inline-block tracking-[35px] pl-[35px] rounded-xl border border-gray-700">
                {party?.data()?.code}
              </p>
            </div>

            <div className="space-y-5 mb-6 max-w-xs lg:max-w-sm mx-auto">
              <p className="text-2xl font-bold">Players</p>
              <div className="grid grid-cols-4 gap-4">
                {players.map((player, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-slate-400 rounded-full mb-2 relative">
                      <Image src={`https://api.multiavatar.com/${player.avatar}.png`} alt="avatar" fill />
                    </div>
                    <p className="font-normal text-textDark text-base lg:text-lg max-w-[65px] text-center">
                      {player.name}
                    </p>
                  </div>
                ))}
                {Array.from({ length: placeholder }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 border border-dashed border-slate-600 rounded-full mb-2 relative" />
                    <div className=" h-4 w-14 bg-bgLight rounded-xl mt-[6px] md:mt-[8px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {phase != 0 && (
          <p className={`${phase == 7 ? "text-center" : "text-left"} max-w-xl mx-auto px-6 text-xl md:text-2xl`}>
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
