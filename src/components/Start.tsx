import { useGlobalContext } from "@/app/context/store";
import { db } from "@/config/firebase";
import createContext from "@/utils/createContext";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Button from "./ui/Button";

const Start = () => {
  const { userName, partyId, players, setTimer, phase } = useGlobalContext();
  const isHost = players[0]?.name === userName;

  const startGame = () => {
    if (isHost && players.length < 4) {
      toast.info(`Need ${4 - players.length} more player(s) to start!`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        theme: "colored",
        style: {
          backgroundColor: "#3B4FFE",
          color: "#FFFFFF",
        },
        progress: undefined,
      });
      return;
    }

    if (!isHost) {
      return;
    }

    createContext(players, partyId);
    const updatedPlayers = players.map((player) => ({
      name: player.name,
      avatar: player.avatar,
      regenerate: false,
      selectedContext: null,
      gifUrl: null,
      voteGifPlayer: null,
      points: 0,
    }));

    if (phase == 0) {
      setTimer(20);
      updateDoc(doc(db, "parties", partyId), {
        phase: 1,
        lang: "English",
      });
    }

    if (phase == 7) {
      setTimer(20);
      updateDoc(doc(db, "parties", partyId), {
        phase: 1,
        lang: "English",
        players: updatedPlayers,
        rounds: [],
      });
    }
  };
  return (
    <div className="fixed bg-bgDark w-full pt-6 border-t border-bgLight pb-10 left-1/2 transform -translate-x-1/2 bottom-0">
      {isHost && players.length > 3 ? (
        <button className="w-[295px]" onClick={startGame}>
          <Button text={phase == 7 ? "New Game" : "Start Game"} alt={false} />
        </button>
      ) : (
        <button onClick={startGame} className="w-[295px] py-[15px] bg-bgLight text-textDark cursor-default rounded-xl">
          {phase == 7 ? "New Game" : "Start Game"}
        </button>
      )}
    </div>
  );
};

export default Start;
