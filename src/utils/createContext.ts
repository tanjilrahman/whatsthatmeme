import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { pickRandomPlayers } from "./functions";

export default async function createContext(players: PlayerInfo[], partyId: string, lang?: string): Promise<void> {
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
      context: gpt.context,
    };
  };

  const rawMemes = await generateMeme();

  const memes = JSON.parse(rawMemes.context);

  await updateDoc(doc(db, "parties", partyId), {
    memes: [{ context: memes[0] }, { context: memes[1] }],
  });
}

// const gpt = await fetch(`/api/gpt-meme?players=${pickRandomPlayers(players.map((player) => player.name))}`, {
//   method: "POST",
//   headers: {
//     "Content-type": "application/json",
//   },
// }).then((response) => response.json());

// return {
//   context: gpt.context,
// };
