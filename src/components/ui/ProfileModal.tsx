"use client";

import { useGlobalContext } from "@/app/context/store";
import { generateRandomString } from "@/utils/functions";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { PiUserCircleBold } from "react-icons/pi";

export default function ProfileModal({ toggleModal, closeModal }: { toggleModal: boolean; closeModal: () => void }) {
  const { setUserName, userName } = useGlobalContext();
  const [nameInput, setNameInput] = useState(userName);
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));

  const generateAvatar = () => {
    const src = generateRandomString();
    localStorage.setItem("avatar", src);
    setAvatar(src);
  };

  const defaultAvatar = () => {
    localStorage.setItem("avatar", nameInput);
    setAvatar(nameInput);
  };

  const handleSave = () => {
    localStorage.setItem("playerName", nameInput);
    setUserName(nameInput);
    if (!avatar || !nameInput) {
      localStorage.setItem("avatar", nameInput);
      setAvatar(nameInput);
    }
    closeModal();
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSave();
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-bgLight p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-textLight">
                    Create Profile
                  </Dialog.Title>

                  <div className="w-[125px] h-[125px] bg-slate-400 rounded-full mx-auto my-6 relative">
                    {avatar && <Image src={`https://api.multiavatar.com/${avatar}.png`} alt="avatar" fill />}
                  </div>

                  <div className="flex space-x-4 my-3">
                    <div
                      onClick={generateAvatar}
                      className="rounded-xl w-full py-[8px] bg-textLight text-lg text-bgLight text-center hover:bg-primary hover:text-textLight cursor-pointer"
                    >
                      Random
                    </div>
                    <div
                      onClick={defaultAvatar}
                      className="rounded-xl w-full py-[8px] bg-textLight text-lg text-bgLight text-center hover:bg-pink-500 hover:text-textLight cursor-pointer"
                    >
                      True Avatar
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-gray-500 font-normal">
                      Create your perfect profile, generate a random avatar or set your true one based on your name 😉
                    </p>
                  </div>

                  <div className="bg-bgLit h-12 rounded-xl flex items-center mt-4 mb-8 border border-gray-600">
                    <PiUserCircleBold className="text-gray-400 text-3xl mx-2" />
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full h-full bg-bgLit border-none outline-none rounded-r-xl font-normal"
                      placeholder="User Name"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="rounded-xl w-full py-[15px] bg-primary text-lg"
                      onClick={handleSave}
                    >
                      Save
                    </button>
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
