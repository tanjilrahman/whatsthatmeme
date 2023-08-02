"use client";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { addDoc, updateDoc, collection, doc, query, where, getDocs, arrayUnion } from "firebase/firestore";
import { generatePartyCode } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "./context/store";
import { HiPencilAlt } from "react-icons/hi";
import ProfileModal from "@/components/ui/ProfileModal";
import LoadingPage from "@/components/ui/LoadingPage";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import Logo from "@/components/logo/Logo";

export default function Home() {
  const router = useRouter();
  const [codeInput, setCodeInput] = useState("");
  const [rehydration, setRehydration] = useState(false);
  const partiesCollectionRef = collection(db, "parties");
  const { userName, setUserName, setRounds, setMemes, setPlayers, setPhase, setTimer, isFirstVisit, setIsFirstVisit } =
    useGlobalContext();
  const [pageLoading, setPageLoading] = useState(false);

  const [toggleModal, setToggleModal] = useState(false);

  useEffect(() => {
    setRehydration(true);
  }, [rehydration]);

  function closeModal() {
    setToggleModal(false);
  }

  function openModal() {
    setToggleModal(true);
  }

  useEffect(() => {
    // Check if userId is already cached in localStorage
    const cachedUserName = localStorage.getItem("playerName");

    if (cachedUserName) {
      setUserName(cachedUserName);
    } else if (!isFirstVisit) {
      setPageLoading(true);
      setIsFirstVisit(true);
      router.push("/welcome");
    }
    setRounds([]);
    setMemes([]);
    setPlayers([]);
    setPhase(0);
    setTimer(-1);
  }, []);

  const createParty = async () => {
    try {
      if (!userName) {
        return openModal();
      }
      setPageLoading(true);
      const partyData = await addDoc(partiesCollectionRef, {
        code: generatePartyCode(),
        memes: [],
        players: [
          {
            name: userName,
            avatar: localStorage.getItem("avatar"),
            regenerate: false,
            selectedContext: null,
            gifUrl: null,
            voteGifPlayer: null,
            points: 0,
          },
        ],
        rounds: [],
        roundTimer: -1,
        phase: 0,
      });
      router.push(`/party/${partyData.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const joinParty = async (code: string) => {
    if (!userName) {
      return openModal();
    }
    if (!codeInput) {
      toast.info("Invalid party code!", {
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
      return;
    }
    setPageLoading(true);
    const q = query(partiesCollectionRef, where("code", "==", code));

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 0) {
        toast.info("Invalid party code!", {
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
        setCodeInput("");
        setPageLoading(false);
        return;
      }

      const documentRef = doc(db, "parties", querySnapshot.docs[0].id);
      const currentUsers = querySnapshot.docs[0].data().players;
      const userExists = currentUsers.some((user: unknown) => {
        const userInfo = user as any; // Type assertion as 'any'
        return userInfo.name === userName;
      });

      if (currentUsers.length > 11) {
        return alert("Party is full!");
      }

      if (userExists) {
        console.log("User already exists in the party.");
        router.push(`/party/${documentRef.id}`);
        return;
      }

      await updateDoc(documentRef, {
        players: arrayUnion({
          name: userName,
          avatar: localStorage.getItem("avatar"),
          regenerate: false,
          selectedContext: null,
          gifUrl: null,
          voteGifPlayer: null,
          points: 0,
        }),
      });

      router.push(`/party/${documentRef.id}`);
      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      joinParty(codeInput);
    }
  };

  if (!rehydration || pageLoading) {
    return <LoadingPage />;
  } else {
    return (
      <div className="text-center flex flex-col justify-between py-20 md:py-24 text-lg h-screen">
        {/* <div className="overflow-hidden">
          <div
            aria-hidden={true}
            className="absolute inset-y-16 inset-x-0 w-16 rounded-full rotate-45 bg bg-gradient-to-b from-pink-500 to-purple-600 blur-3xl opacity-50"
          />
          <div
            aria-hidden={true}
            className="absolute inset-x-16 inset-y-0 w-16 rounded-full rotate-45 ml-auto  bg bg-gradient-to-b from-pink-500 to-purple-600 blur-3xl opacity-50"
          />
        </div> */}
        <Logo />
        <ProfileModal toggleModal={toggleModal} closeModal={closeModal} />

        <div className="mx-auto">
          <div className="mb-5">
            {userName && (
              <div className="flex text-xl items-center justify-center space-x-2 text-textDark">
                <p>
                  What's up, <span className="underline">{userName}</span>
                </p>{" "}
                <HiPencilAlt className="text-bgLit hover:text-textDark" onClick={openModal} />
              </div>
            )}
          </div>
          <div>
            <button onClick={createParty} className="w-[295px]">
              <Button text="Create Party" alt={false} />
            </button>
          </div>
          <p className="text-xl text-bgLit my-2 md:my-4">or,</p>
          <div className="w-[295px] p-4 bg-bgLight rounded-xl mx-auto">
            <input
              type="text"
              value={codeInput}
              onKeyDown={handleKeyDown}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              className="text-center text-xl bg-bgLight border-none mb-4 outline-none"
              placeholder="Enter Code"
            />
            <button onClick={() => joinParty(codeInput)} className="w-full">
              <Button text="Join Party" alt={true} />
            </button>
          </div>
          <button className=" text-bgLit mt-2 underline cursor-pointer" onClick={() => router.push("/welcome")}>
            How to play?
          </button>
        </div>
      </div>
    );
  }
}
