import { useGlobalContext } from "@/app/context/store";
import React, { useEffect, useRef, useState } from "react";
import GifPicker, { TenorImage, Theme } from "gif-picker-react";
import Image from "next/image";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import RoundWinner from "./RoundWinner";
import SlideShow from "./SlideShow";
import VoteGif from "./VoteGif";
import Winner from "./Winner";
import { TiTick } from "react-icons/ti";
import { Drawer } from "vaul";
import Button from "./ui/Button";

const Gif = () => {
  const { userName, partyId, players, setTimer, timer, phase, setPhase } = useGlobalContext();
  const [gifUrl, setGifUrl] = useState<string | null>();
  const isHost = players[0]?.name === userName;
  const drawerTrigger = useRef<HTMLButtonElement>(null);

  const handleGifClick = async (tenorImage: TenorImage) => {
    if (drawerTrigger.current) {
      drawerTrigger.current.click();
    }
    setGifUrl(tenorImage.preview.url);
    const updatedPlayers = players.map((player) => ({
      ...player,
      gifUrl: player.name === userName ? tenorImage.preview.url : player.gifUrl,
    }));

    await updateDoc(doc(db, "parties", partyId), { players: updatedPlayers });
  };

  useEffect(() => {
    const playerGif = players.find((player) => player.name === userName);
    setGifUrl(playerGif?.gifUrl);
  }, [players]);

  useEffect(() => {
    if (isHost) {
      const gifSelectedPlayers = players.filter((player) => player.gifUrl != null);
      const gifVotedPlayers = players.filter((player) => player.voteGifPlayer != null);
      if (gifSelectedPlayers.length === players.length && phase == 3) {
        setTimer(0);
        setServerPhase(4);
      }

      if (gifVotedPlayers.length === players.length && phase == 5) {
        setTimer(0);
        setServerPhase(6);
      }
    }
  }, [players]);

  const setServerPhase = async (phase: number) => {
    await updateDoc(doc(db, "parties", partyId), {
      phase,
    });
  };

  useEffect(() => {
    if (isHost && timer == 0 && phase === 2) {
      setTimer(90);
      setServerPhase(3);
    }

    if (isHost && timer == 0 && phase == 3) {
      const participatingPlayers = players.filter((player) => player.gifUrl).length;
      if (participatingPlayers > players.length / 2) {
        setTimer(participatingPlayers * 5);
        setServerPhase(4);
      }
    }

    if (isHost && timer == 0 && phase == 4) {
      setTimer(15);
      setServerPhase(5);
    }
    if (isHost && timer == 0 && phase == 5) {
      if (players.filter((player) => player.voteGifPlayer).length == players.length) {
        setTimer(10);
        setServerPhase(6);
      }
    }
  }, [timer, phase, players]);

  return (
    <>
      {phase == 3 && (
        <div className="flex flex-col items-center mt-3 max-w-xl mx-auto md:px-6">
          <div className="flex space-x-1 md:space-x-2">
            {players.map((player, i) => (
              <div key={i} className="w-[20px] h-[20px] md:w-[25px] md:h-[25px] bg-slate-400 rounded-full relative">
                {player.gifUrl && (
                  <div className="w-full h-full relative">
                    <TiTick className="text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30" />
                    <div className="w-full h-full absolute top-0 left-0 bg-green-400 opacity-50 rounded-full z-20"></div>
                  </div>
                )}
                <Image src={`https://api.multiavatar.com/${player.avatar}.png`} alt="avatar" fill />
              </div>
            ))}
          </div>

          <div className="w-full h-[358px] md:h-[480px] mt-3 md:mt-6 mb-36 relative md:border-8 md:border-bgLight md:bg-bgLit rounded-xl">
            {gifUrl && <Image src={gifUrl} alt="gif" fill className="object-contain mx-auto" />}
          </div>

          <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild ref={drawerTrigger}>
              <div className="fixed bg-bgDark w-full pt-6 border-t border-bgLight pb-10 left-1/2 transform -translate-x-1/2 bottom-0">
                <button className="w-[295px]">
                  <Button text="Select Gif" alt={true} />
                </button>
              </div>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="bg-bgDark flex flex-col fixed bottom-0 left-0 right-0 max-h-[60vh] rounded-t-xl">
                <div className="bg-bgDark py-3 md:py-5 rounded-t-xl">
                  <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 " />
                </div>
                <div className="w-full mx-auto flex flex-col overflow-auto rounded-t-xl">
                  <div className="w-full px-3">
                    <GifPicker
                      tenorApiKey={process.env.NEXT_PUBLIC_TENORAPIKEY || ""}
                      onGifClick={(tenorImage) => handleGifClick(tenorImage)}
                      theme={Theme.DARK}
                      width="100%"
                      height="100%"
                      country="US"
                      autoFocusSearch={false}
                    />
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      )}
      {phase == 4 && <SlideShow />}

      {phase == 5 && <VoteGif />}

      {phase == 6 && <RoundWinner />}

      {phase == 7 && <Winner />}
    </>
  );
};

export default Gif;
