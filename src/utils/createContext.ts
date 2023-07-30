import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { pickRandomPlayers } from "./functions";
import { toast } from "react-toastify";

export default async function createContext(players: PlayerInfo[], partyId: string, lang?: string): Promise<void> {
  try {
    const generateMeme = async () => {
      const gpt = await fetch("/api/gpt-meme", {
        body: JSON.stringify({
          contextOne: pickRandomPlayers(players.map((player) => player.name)),
          contextTwo: pickRandomPlayers(players.map((player) => player.name)),
          lang,
        }),
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }).then((response) => response.json());

      return {
        respose: gpt,
      };
    };

    const data = await generateMeme();

    if (data.respose.error) {
      if (data.respose.error.status === 429) {
        toast.error("API rate limit reached! Please try again in 20s.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          theme: "colored",
          style: {
            backgroundColor: "#3B4FFE",
            color: "#FFFFFF",
          },
          progress: undefined,
        });
      } else {
        toast.error("Something went wrong! Please try again later.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          theme: "colored",
          style: {
            backgroundColor: "#3B4FFE",
            color: "#FFFFFF",
          },
          progress: undefined,
        });
      }
    } else {
      console.log(data.respose.context);
      const memes = JSON.parse(data.respose.context);

      await updateDoc(doc(db, "parties", partyId), {
        memes: [{ context: memes[0] }, { context: memes[1] }],
      });
    }
  } catch (error: any) {
    toast.error("ChatGPT r matha gese 🥴! Please try again.", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      theme: "colored",
      style: {
        backgroundColor: "#3B4FFE",
        color: "#FFFFFF",
      },
      progress: undefined,
    });
    console.error("Error occurred during context creation:", error);
  }
}
