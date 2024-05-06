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
    // if (isHost && players.length < 4) {
    //   toast.info(`Need ${4 - players.length} more player(s) to start!`, {
    //     position: "top-center",
    //     autoClose: 4000,
    //     hideProgressBar: true,
    //     theme: "colored",
    //     style: {
    //       backgroundColor: "#A374FF",
    //       color: "#FFFFFF",
    //     },
    //     progress: undefined,
    //   });
    //   return;
    // }

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
        memes: [],
      });
    }
  };
  return (
    <div className="fixed bottom-0 w-full py-6 text-xl transform -translate-x-1/2 border-t bg-bgDark md:py-8 border-bgLight left-1/2">
      {isHost ? (
        <button className="w-[295px]" onClick={startGame}>
          <Button text={phase == 7 ? "New Game" : "Start Game"} alt={false} />
        </button>
      ) : (
        <button
          onClick={startGame}
          className="w-[295px] py-[12px] md:py-[15px] bg-bgLight text-textDark cursor-default rounded-xl"
        >
          {phase == 7 ? "New Game" : "Start Game"}
        </button>
      )}
    </div>
  );
};

export default Start;
