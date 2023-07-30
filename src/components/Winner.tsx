import { useGlobalContext } from "@/app/context/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Winner = () => {
  const { userName, players } = useGlobalContext();
  const [sortedPlayers, setSortedPlayers] = useState<PlayerInfo[]>([]);

  useEffect(() => {
    setSortedPlayers(players.slice().sort((a, b) => b.points - a.points));
  }, []);
  return (
    <div className="max-w-xl mx-auto px-6 mb-36 md:mb-48">
      <div className="flex justify-center space-x-4 md:space-x-12 mt-6 md:mt-10">
        <div className="mt-auto w-24">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-400 rounded-full mb-2 relative mx-auto">
            <Image src={`https://api.multiavatar.com/${sortedPlayers[1]?.avatar}.png`} alt="avatar" fill />
          </div>
          <p className="font-normal text-textDark text-base md:text-lg text-center mx-auto bg-bgLight rounded-xl">
            {sortedPlayers[1]?.name}
          </p>
          <p className="text-yellow-500 my-1 text-base md:text-lg w-full text-center mx-auto">
            {sortedPlayers[1]?.points}
          </p>
          <p className="px-2 bg-bgLit rounded-xl inline-block">2</p>
        </div>
        <div className=" w-24">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-400 rounded-full mb-2 relative mx-auto">
            <Image src={`https://api.multiavatar.com/${sortedPlayers[0]?.avatar}.png`} alt="avatar" fill />
          </div>
          <p className="font-normal text-textDark text-base md:text-lg text-center mx-auto bg-bgLight rounded-xl">
            {sortedPlayers[0]?.name}
          </p>
          <p className=" text-yellow-500 my-1 text-base md:text-lg w-full text-center mx-auto">
            {sortedPlayers[0]?.points}
          </p>
          <p className="px-2 bg-yellow-400 text-bgDark rounded-xl inline-block">1</p>
        </div>
        <div className="mt-auto w-24">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-400 rounded-full mb-2 relative mx-auto">
            <Image src={`https://api.multiavatar.com/${sortedPlayers[2]?.avatar}.png`} alt="avatar" fill />
          </div>
          <p className="font-normal text-textDark text-base md:text-lg  text-center bg-bgLight rounded-xl">
            {sortedPlayers[2]?.name}
          </p>
          <p className="text-yellow-500 my-1 text-base md:text-lg w-full text-center mx-auto">
            {sortedPlayers[2]?.points}
          </p>
          <p className="px-2 bg-bgLit rounded-xl inline-block">3</p>
        </div>
      </div>

      <div className="bg-bgLight p-4 md:p-5 space-y-4 rounded-3xl mt-12 md:mx-8">
        {sortedPlayers.slice(3).map((player, i) => (
          <div className="flex items-center text-left bg-bgDark px-4 py-3 rounded-xl">
            <div className="flex items-center flex-grow">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-400 rounded-full mb-2 relative">
                <Image src={`https://api.multiavatar.com/${player.avatar}.png`} alt="avatar" fill />
              </div>
              <div className="ml-4">
                <p className="font-normal text-textDark ">{player.name}</p>
                <p>{player.points}</p>
              </div>
            </div>

            <p className="px-2 bg-bgLit rounded-xl inline-block">{i + 4}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Winner;
