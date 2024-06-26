"use client";

import { useGlobalContext } from "@/app/context/store";
import { db } from "@/config/firebase";
import createContext from "@/utils/createContext";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";

const RegenerateModal = () => {
  const { userName, partyId, players, setTimer } = useGlobalContext();
  const [regeneratePrompt, setRegeneratePrompt] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const isHost = players[0]?.name === userName;

  const regenerate = async (prompt: boolean) => {
    setIsRegenerating(prompt);
    const updatedPlayers = players.map((player) => ({
      ...player,
      regenerate: player.name === userName ? prompt : player.regenerate,
    }));

    await updateDoc(doc(db, "parties", partyId), { players: updatedPlayers });
  };

  useEffect(() => {
    const reqRegenerate = players.filter((player) => player.regenerate);
    setRegeneratePrompt(reqRegenerate[0]?.regenerate ? true : false);

    if (isHost && reqRegenerate.length > players.length / 2) {
      createContext(players, partyId);

      const updatedPlayers = players.map((player) => ({
        ...player,
        selectedContext: null,
        regenerate: false,
      }));

      updateDoc(doc(db, "parties", partyId), {
        memes: [],
        players: updatedPlayers,
      });

      setTimer(20);
    }

    if (reqRegenerate.length > players.length / 2) {
      setIsRegenerating(false);
    }
  }, [players, partyId, isHost]);

  return (
    <>
      {regeneratePrompt && (
        <Transition appear show={regeneratePrompt} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => {}}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-opacity-25 bg-bgDark backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex items-center justify-center min-h-full p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl bg-bgLight">
                    {/* <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-textLight">
                      Regenerate <LanguageDropdown isHost={isHost} lang={lang} handleSetLang={handleSetLang} />
                    </Dialog.Title> */}
                    <div className="mb-4 -mt-3">
                      <p className="font-normal text-gray-500">
                        Do you want to regenerate the contexts?
                      </p>
                    </div>
                    <div className="flex mt-3 space-x-4">
                      <div className="w-full">
                        <div
                          onClick={() => regenerate(true)}
                          className={`${
                            isRegenerating
                              ? "bg-primary text-textLight"
                              : "cursor-pointer bg-textLight text-bgLight"
                          } rounded-xl py-[8px] text-lg text-center hover:bg-primary hover:text-textLight`}
                        >
                          Yes
                        </div>
                        <div className="flex mt-2 space-x-1">
                          {players.map((player) =>
                            player.regenerate ? (
                              <div
                                key={player.name}
                                className="w-[15px] h-[15px] md:w-[20px] md:h-[20px] bg-slate-400 rounded-full relative"
                              >
                                <Image
                                  src={`https://api.multiavatar.com/${player.avatar}.png`}
                                  alt="avatar"
                                  fill
                                />
                              </div>
                            ) : null
                          )}
                        </div>
                      </div>
                      <div className="w-full">
                        <div
                          onClick={() => regenerate(false)}
                          className={`${
                            !isRegenerating
                              ? "bg-orange-600 text-textLight"
                              : "cursor-pointer bg-textLight text-bgLight"
                          } rounded-xl py-[8px] text-lg text-center hover:bg-orange-600 hover:text-textLight`}
                        >
                          No
                        </div>
                        <div className="flex mt-2 space-x-1">
                          {players.map((player) =>
                            !player.regenerate ? (
                              <div
                                key={player.name}
                                className="w-[15px] h-[15px] md:w-[20px] md:h-[20px] bg-slate-400 rounded-full relative"
                              >
                                <Image
                                  src={`https://api.multiavatar.com/${player.avatar}.png`}
                                  alt="avatar"
                                  fill
                                />
                              </div>
                            ) : null
                          )}
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
      {
        <div className="fixed bottom-0 w-full py-6 transform -translate-x-1/2 border-t bg-bgDark md:py-8 border-bgLight left-1/2">
          <button
            className="rounded-xl w-[295px] py-[12px] md:py-[15px] bg-bgLight text-xl"
            onClick={() => regenerate(true)}
          >
            Regenerate
          </button>
        </div>
      }
    </>
  );
};

export default RegenerateModal;
