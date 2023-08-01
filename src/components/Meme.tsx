import { useGlobalContext } from "@/app/context/store";
import { db } from "@/config/firebase";
import createContext from "@/utils/createContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ColoredMemeContext from "./ui/ColoredMemeContext";

const Meme = () => {
  const { userName, partyId, memes, players, rounds, timer, appTimer, phase, setTimer } = useGlobalContext();
  const [selectedContext, setSelectedContext] = useState<number | null>(null);
  const [memeContext, setMemeContext] = useState<Meme | null>(null);
  const isHost = players[0]?.name === userName;

  const voteMeme = async (i: number | null) => {
    const playerIndexToUpdate = players.findIndex((player) => player.name === userName);
    players[playerIndexToUpdate].selectedContext = i;

    await updateDoc(doc(db, "parties", partyId), {
      players,
    });
  };

  useEffect(() => {
    if (isHost && rounds.length == 5 && phase == 6 && timer == 0) {
      updateDoc(doc(db, "parties", partyId), {
        phase: 7,
      });
      setTimer(15);
    }
  }, [isHost, timer, rounds]);

  useEffect(() => {
    if (isHost && phase == 2) {
      const updatedPlayers = players.map((player) => ({
        ...player,
        selectedContext: null,
      }));
      updateDoc(doc(db, "parties", partyId), {
        players: updatedPlayers,
      });
      setSelectedContext(null);
    }

    if (isHost && rounds.length < 5 && phase == 6 && timer == 0) {
      const updatedPlayers = players.map((player) => ({
        name: player.name,
        avatar: player.avatar,
        regenerate: false,
        selectedContext: null,
        gifUrl: null,
        voteGifPlayer: null,
        points: player.points,
      }));
      updateDoc(doc(db, "parties", partyId), {
        players: updatedPlayers,
        memes: [],
        phase: 1,
      });
      createContext(players, partyId);
      setTimer(20);
    }
  }, [timer, isHost]);

  useEffect(() => {
    if (phase >= 3 && phase <= 6) {
      const currentRound = rounds[rounds.length - 1];
      setMemeContext(currentRound);
    }
  }, [rounds, phase]);

  useEffect(() => {
    if (phase == 1) {
      const playerIndexToUpdate = players.findIndex((player) => player.name === userName);
      setSelectedContext(players[playerIndexToUpdate]?.selectedContext);
    }
  }, [players, phase]);

  useEffect(() => {
    if (isHost) {
      const contextTwo = players.filter((player) => player.selectedContext === 1);
      const contextOne = players.filter((player) => player.selectedContext === 0);
      const createRound = async (context: string) => {
        await updateDoc(doc(db, "parties", partyId), {
          rounds: arrayUnion({ context }),
        });
      };

      const setServerPhase = async (phase: number) => {
        await updateDoc(doc(db, "parties", partyId), {
          phase,
        });
      };
      if (contextOne.length + contextTwo.length == players.length && phase == 1) {
        if (contextTwo.length > contextOne.length) {
          const meme = memes[1].context;
          createRound(meme);
          setServerPhase(2);
          setTimer(0);
        } else if (contextTwo.length < contextOne.length) {
          const meme = memes[0].context;
          createRound(meme);
          setServerPhase(2);
          setTimer(0);
        }
      }

      if (appTimer == 0 && phase == 1) {
        if (contextTwo.length > contextOne.length) {
          const meme = memes[1].context;
          createRound(meme);
          setServerPhase(2);
          setTimer(0);
        } else if (contextTwo.length < contextOne.length) {
          const meme = memes[0].context;
          createRound(meme);
          setServerPhase(2);
          setTimer(0);
        }
      }
    }
  }, [appTimer, players, phase]);

  return (
    <>
      <div className="mt-4 md:mt-5 max-w-xl text-lg leading-tight md:text-2xl px-6 mx-auto">
        {phase > 0 && phase < 3 && (
          <div>
            {memes.length != 0 ? (
              memes.map((meme, i) => (
                <div key={i}>
                  <button
                    disabled={i === selectedContext}
                    className={`${
                      i == selectedContext
                        ? "bg-primary border-primary cursor-default"
                        : "cursor-pointer hover:bg-gray-600"
                    } py-3 px-4 bg-bgLight border border-gray-700 rounded-xl inline-block`}
                    onClick={() => voteMeme(i)}
                  >
                    <ColoredMemeContext meme={meme.context} players={players} />
                  </button>
                  <div className="flex space-x-2 my-2">
                    {players.map((player, pi) => {
                      if (player.selectedContext == i) {
                        return (
                          <div
                            key={pi}
                            className={`${
                              player.name === userName && "border-2 border-green-500"
                            } w-[25px] h-[25px] md:w-[30px] md:h-[30px] bg-slate-400 rounded-full relative`}
                          >
                            <Image src={`https://api.multiavatar.com/${player.avatar}.png`} alt="avatar" fill />
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-2">
                <div
                  className={`w-full py-3 px-4 bg-bgLight border border-gray-700 rounded-xl inline-block space-y-3 md:space-y-4`}
                >
                  <div className="h-2 md:h-3 w-full bg-bgLit rounded-full animate-pulse" />
                  <div className="h-2 md:h-3 w-full bg-bgLit rounded-full animate-pulse" />
                  <div className="h-2 md:h-3 w-3/4 bg-bgLit rounded-full mx-auto animate-pulse" />
                </div>
                <div
                  className={`w-full py-3 px-4 bg-bgLight border border-gray-700 rounded-xl inline-block space-y-3 md:space-y-4`}
                >
                  <div className="h-2 md:h-3 w-full bg-bgLit rounded-full animate-pulse" />
                  <div className="h-2 md:h-3 w-full bg-bgLit rounded-full animate-pulse" />
                  <div className="h-2 md:h-3 w-3/4 bg-bgLit rounded-full mx-auto animate-pulse" />
                </div>
              </div>
            )}
          </div>
        )}

        {phase > 2 && phase < 7 && memeContext && (
          <div>
            <button disabled className="py-3 px-4 bg-bgLight border border-gray-700 rounded-xl inline-block">
              <ColoredMemeContext meme={memeContext.context} players={players} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Meme;
