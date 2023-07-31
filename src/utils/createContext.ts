import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { pickRandomPlayers } from "./functions";
import { toast } from "react-toastify";

const retryDelay = 500; // Delay in milliseconds before retrying

export default async function createContext(
  players: PlayerInfo[],
  partyId: string,
  lang?: string,
  maxRetries = 2
): Promise<void> {
  let retries = 0;

  while (retries <= maxRetries) {
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

        return { response: gpt };
      };

      const data = await generateMeme();

      if (data.response.error) {
        if (data.response.error.status === 429) {
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
        console.log(data.response.context);
        const memes = JSON.parse(data.response.context);

        await updateDoc(doc(db, "parties", partyId), {
          memes: [{ context: memes[0] }, { context: memes[1] }],
        });
      }

      // If there are no errors, break out of the loop
      break;
    } catch (error: any) {
      console.error("Error occurred during context creation:", error);
      retries++;

      // Check if we should retry or exit the loop
      if (retries <= maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay)); // Wait for the retryDelay before trying again
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
    }
  }
}
