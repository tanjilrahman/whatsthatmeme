import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import translate from "translate";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { contextOne, contextTwo, lang } = await req.json();

    const promptWithPlayersOne = process.env.CHATGPT_PROMPT?.replace(
      "#playersOne",
      contextOne || ""
    );

    const promptWithPlayersTwo = promptWithPlayersOne?.replace(
      "#playersTwo",
      contextTwo || ""
    );

    const memeContext = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: promptWithPlayersTwo || "",
        },
      ],
      temperature: 0.8,
      max_tokens: 100,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const response =
      memeContext.choices[0].message.content || "Sorry, there was a problem";

    let finalResponse = response;

    if (lang === "Bangla") {
      translate.engine = "google";
      const translated = await translate(response, "bn");
      finalResponse = translated;
    }

    return NextResponse.json({
      context: finalResponse,
    });
  } catch (error: any) {
    // Handle the error and send it to the frontend
    console.log(error.response.data.error.message);
    return NextResponse.json({ error }, { status: 500 });
  }
}
