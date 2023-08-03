"use client";

import { useGlobalContext } from "@/app/context/store";
import { Dialog, Transition } from "@headlessui/react";
import { HiUserRemove } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Image from "next/image";
import { Fragment } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { toast } from "react-toastify";

export default function PartyModal({
  partyCode,
  toggleModal,
  closeModal,
}: {
  partyCode: string;
  toggleModal: boolean;
  closeModal: () => void;
}) {
  const { userName, players, partyId } = useGlobalContext();
  const isHost = players[0]?.name === userName;

  const playerss = [
    {
      name: "test 1",
      avatar: "fadf",
    },
    {
      name: "test 1",
      avatar: "fadf",
    },
    {
      name: "test 1",
      avatar: "fadf",
    },
    {
      name: "test 1",
      avatar: "fadf",
    },
    {
      name: "test 1",
      avatar: "fadf",
    },
    {
      name: "test 1",
      avatar: "fadf",
    },
    {
      name: "test 1",
      avatar: "fadf",
    },
    {
      name: "test 1",
      avatar: "fadf",
    },
    {
      name: "test 1",
      avatar: "fadf",
    },
    {
      name: "test 1",
      avatar: "fadf",
    },
    {
      name: "test 1",
      avatar: "fadf",
    },
    {
      name: "test 1",
      avatar: "fadf",
    },
    {
      name: "test 1",
      avatar: "fadf",
    },
    {
      name: "test 1",
      avatar: "fadf",
    },
  ];

  const handlePlayerRemove = (name: string) => {
    if (userName === name) return;
    if (players && isHost) {
      // setPageLoading(true);
      const updatedPlayers = players.filter((player: any) => player.name !== name);

      updateDoc(doc(db, "parties", partyId), {
        players: updatedPlayers,
      });
    } else {
      toast.info("You are not the host!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        theme: "colored",
        style: {
          backgroundColor: "#A374FF",
          color: "#FFFFFF",
        },
        progress: undefined,
      });
    }
  };

  return (
    <>
      <Transition appear show={toggleModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-bgDark bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-h-[80vh] overflow-scroll max-w-md transform rounded-2xl bg-bgLight p-6 align-middle shadow-xl transition-all text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-textLight flex justify-between items-center"
                  >
                    <p>Party Info</p>

                    <AiOutlineCloseCircle onClick={() => closeModal()} className="hover:text-primary cursor-pointer" />
                  </Dialog.Title>

                  <p className="py-3 bg-bgLit inline-block tracking-[35px] pl-[35px] rounded-xl border border-gray-600 text-lg md:text-xl mt-6">
                    {partyCode}
                  </p>

                  <div className="space-y-3 mt-6">
                    {players.map((player, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="flex space-x-3 md:space-x-4 items-center">
                          <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-slate-400 rounded-full mx-auto relative">
                            {player.avatar && (
                              <Image src={`https://api.multiavatar.com/${player.avatar}.png`} alt="avatar" fill />
                            )}
                          </div>
                          <p className="text-lg md:text-xl">{player.name}</p>
                        </div>
                        <div
                          className={`${
                            isHost && userName != player.name
                              ? "bg-textLight hover:bg-orange-500 hover:text-textLight text-bgLight cursor-pointer"
                              : "bg-bgLit text-gray-500"
                          } rounded-xl p-[8px] text-lg text-center`}
                          onClick={() => handlePlayerRemove(player.name)}
                        >
                          <HiUserRemove />
                        </div>
                      </div>
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
