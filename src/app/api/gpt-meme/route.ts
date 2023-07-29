import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: NextRequest) {
  const { contextOne, contextTwo, lang } = await req.json();

  const promptWithPlayersOne = process.env.CHATGPT_PROMPT?.replace("#playersOne", contextOne || "");

  const promptWithPlayersTwo = promptWithPlayersOne?.replace("#playersTwo", contextTwo || "");

  const memeContext = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: lang == "Bangla" ? promptWithPlayersTwo + "  In Bangla." : promptWithPlayersTwo,
    temperature: 0.8,
    max_tokens: lang == "Bangla" ? 400 : 100,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const response = memeContext.data.choices[0].text?.trim() || "Sorry, there was a problem";
  return NextResponse.json({ context: response });
}

// const { searchParams } = new URL(req.url);
//   const players = searchParams.get("players");
