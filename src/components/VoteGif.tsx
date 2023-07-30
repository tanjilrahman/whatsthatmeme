import { useGlobalContext } from "@/app/context/store";
import { db } from "@/config/firebase";
import { randomPlayerWithGif } from "@/utils/functions";
import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
const VoteGif = () => {
  const { userName, partyId, players, timer, phase } = useGlobalContext();
  const [voted, setVoted] = useState(String);
  const isHost = players[0]?.name === userName;

  const handleVoteGif = async (playerName: string) => {
    if (userName === playerName) return alert("You can not vote your gif!");
    setVoted(playerName);
    const alreadyVoted = players.filter((player) => player.name === userName && player.voteGifPlayer != null);

    const updatedPlayers = players.map((player) => ({
      ...player,
      voteGifPlayer: player.name === userName ? playerName : player.voteGifPlayer,
      points:
        player.name === alreadyVoted[0]?.voteGifPlayer
          ? player.points - 100
          : player.name === playerName
          ? player.points + 100
          : player.points,
    }));

    await updateDoc(doc(db, "parties", partyId), {
      players: updatedPlayers,
    });
  };

  useEffect(() => {
    const playersNotVoted = players.filter((player) => player.voteGifPlayer === null);

    if (timer == 0 && phase == 5 && playersNotVoted.length > 0) {
      const voteGif = async () => {
        const updatedPlayers = players.map((player) => ({
          ...player,
          voteGifPlayer: player.voteGifPlayer === null ? randomPlayerWithGif(players) : player.voteGifPlayer,
          points: player.name === randomPlayerWithGif(players) ? player.points + 100 : player.points,
        }));

        await updateDoc(doc(db, "parties", partyId), {
          players: updatedPlayers,
        });
      };

      voteGif();
    }
  }, [isHost, timer, phase]);

  return (
    <div className="max-w-xl mx-auto px-6">
      <div className="flex justify-center mt-3 md:mt-6 space-x-1 md:space-x-2">
        {players.map((player, i) => (
          <div key={i} className="w-[20px] h-[20px] md:w-[25px] md:h-[25px] bg-slate-400 rounded-full relative">
            {player.voteGifPlayer && (
              <div className="w-full h-full relative">
                <TiTick className="text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30" />
                <div className="w-full h-full absolute top-0 left-0 bg-green-400 opacity-50 rounded-full z-20"></div>
              </div>
            )}
            <Image src={`https://api.multiavatar.com/${player.avatar}.png`} alt="avatar" fill />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2  gap-4 md:gap-5 mt-3 md:mt-6 mb-6">
        {players.map(
          (player, i) =>
            player.gifUrl && (
              <div key={i} className="mx-auto w-full">
                <div className="h-44 w-full md:h-60 relative border-8 border-bgLight bg-bgLit rounded-xl">
                  <Image src={player.gifUrl!} alt="gif" fill className="object-contain" />
                </div>
                <button
                  disabled={player.name === userName}
                  className={`${voted === player.name && "bg-primary"} ${
                    player.name != userName ? "bg-bgLight" : " ring-1 ring-bgLit ring-inset text-bgLit"
                  } mt-4 rounded-xl w-full py-[10px]`}
                  onClick={() => handleVoteGif(player.name!)}
                >
                  {voted === player.name ? "Voted" : "Vote"}
                </button>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default VoteGif;
