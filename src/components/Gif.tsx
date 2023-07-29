import { useGlobalContext } from "@/app/context/store";
import React, { useEffect, useState } from "react";
import GifPicker, { TenorImage, Theme } from "gif-picker-react";
import Image from "next/image";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import RoundWinner from "./RoundWinner";
import SlideShow from "./SlideShow";
import VoteGif from "./VoteGif";
import Winner from "./Winner";
import { TiTick } from "react-icons/ti";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Gif = () => {
  const { userName, partyId, players, setTimer, timer, phase, setPhase } = useGlobalContext();
  const [gifUrl, setGifUrl] = useState<string | null>();
  const [toggleGif, setToggleGif] = useState(true);
  const isHost = players[0]?.name === userName;

  const handleGifClick = async (tenorImage: TenorImage) => {
    console.log(tenorImage);
    setToggleGif(false);
    setGifUrl(tenorImage.preview.url);
    const updatedPlayers = players.map((player) => ({
      ...player,
      gifUrl: player.name === userName ? tenorImage.preview.url : player.gifUrl,
    }));

    await updateDoc(doc(db, "parties", partyId), { players: updatedPlayers });
  };

  const toggleGifPicker = () => {
    toggleGif ? setToggleGif(false) : setToggleGif(true);
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
          {!toggleGif && (
            <div className="w-full h-[358px] md:h-[480px] mt-3 md:mt-6 relative md:border-8 md:border-bgLight md:bg-bgLit rounded-xl">
              <AiOutlinePlusCircle
                onClick={toggleGifPicker}
                className="text-8xl text-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              />
              {gifUrl && <Image src={gifUrl} alt="gif" fill className="object-contain mx-auto" />}
            </div>
          )}

          <div className={`${!toggleGif && "fixed bottom-0 md:bottom-28"} w-full md:w-[530px] mt-3 md:mt-6 `}>
            <div
              onClick={toggleGifPicker}
              className={`${
                !toggleGif && "md:rounded-b-xl"
              } h-[35px] w-full bg-bgLight border-b border-gray-700 rounded-t-xl -mb-[5px] flex justify-center items-center cursor-pointer`}
            >
              <div className="h-[6px] w-[55px] rounded-full bg-bgLit mb-[5px]" />
            </div>
            {toggleGif && (
              <div className="w-full md:h-full">
                <GifPicker
                  tenorApiKey={process.env.NEXT_PUBLIC_TENORAPIKEY || ""}
                  onGifClick={(tenorImage) => handleGifClick(tenorImage)}
                  theme={Theme.DARK}
                  width="100%"
                  categoryHeight={80}
                  country="US"
                  autoFocusSearch={false}
                />
              </div>
            )}
          </div>
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
