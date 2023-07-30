import { useGlobalContext } from "@/app/context/store";
import { findRoundWinners } from "@/utils/functions";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const RoundWinner = () => {
  const { players } = useGlobalContext();
  const [roundWinners, setRoundWinners] = useState<PlayerInfo[]>([]);
  const [showWinner, setShowWinner] = useState<PlayerInfo>();
  const [roundPoints, setRoundPoints] = useState(0);

  useEffect(() => {
    setRoundWinners(findRoundWinners(players));
    setRoundPoints(0);
  }, []);

  useEffect(() => {
    setShowWinner(roundWinners[0]);
    players.map((player) => {
      if (player.voteGifPlayer === roundWinners[0]?.name) {
        setRoundPoints((prevPoint) => prevPoint + 100);
      }
    });
  }, [roundWinners]);

  return (
    <div className="max-w-xl mx-auto px-6 mb-6">
      <div className="flex items-center justify-between mt-6 md:mt-8 ">
        <div className="flex space-x-1">
          {roundWinners.map((winner, i) => (
            <div
              key={i}
              onClick={() => setShowWinner(winner)}
              className={`${
                roundWinners.length > 1 && winner.name == showWinner?.name ? "bg-bgLight" : "bg-none cursor-pointer"
              } flex items-center space-x-2 md:space-x-3 py-2 px-3 rounded-xl`}
            >
              <div className="w-[40px] h-[40px] md:w-[45px] md:h-[45px] bg-slate-400 rounded-full relative">
                <Image src={`https://api.multiavatar.com/${winner.avatar}.png`} alt="avatar" fill />
              </div>
              <p className="md:text-xl font-normal text-textDark">{winner.name}</p>
            </div>
          ))}
        </div>
        <p className="font-black italic text-xl md:text-2xl text-yellow-500">+{roundPoints}</p>
      </div>

      <div>
        <div className="w-full h-[358px] md:h-[500px] mt-3 md:mt-6 relative border-8 border-bgLight bg-bgLit rounded-xl">
          <Image src={showWinner?.gifUrl!} alt="gif" fill className="object-contain mx-auto" />
        </div>

        <div className="space-y-2 mt-3 md:mt-6 text-left">
          {players.map((player, i) => {
            return (
              player.voteGifPlayer === showWinner?.name && (
                <div key={i} className="inline-block mr-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] bg-slate-400 rounded-full relative">
                      <Image src={`https://api.multiavatar.com/${player.avatar}.png`} alt="avatar" fill />
                    </div>
                    <p className="text-sm md:text-base font-normal text-textDark">{player.name}</p>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoundWinner;
