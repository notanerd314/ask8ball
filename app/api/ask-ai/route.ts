import { getRandomItem } from "../../../lib/rng";
import getSystemPrompt from "../../../lib/prompts";
import { personalitiesList } from "../../../lib/personalities";

import { signParams } from "../../../lib/cryptography";

const llamaMaverick = "meta-llama/llama-4-maverick-17b-128e-instruct";
const llamaGuard = "meta-llama/llama-guard-4-12b";

type GuardResponse = {
  isSafe: boolean;
  categories: string[];
};

async function fetchGuardResponse(question: string): Promise<string> {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MODERATION_GROQ!}`,
    },
    body: JSON.stringify({
      model: llamaGuard,
      messages: [{ role: "user", content: question }],
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

async function fetchAIResponse(question: string, systemPrompt: string, temperature: number | undefined): Promise<string> {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LLM_GROQ!}`,
    },
    body: JSON.stringify({
      model: llamaMaverick,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
      temperature: temperature || 1.1,
      top_p: 1,
      max_tokens: 25,
      n: 1,
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content;
}

function parseGuardResponse(data: string): GuardResponse {
  const lines = data.trim().split("\n");
  const isSafe = lines[0]?.toLowerCase() === "safe";
  const categories = lines[1]?.split(",").map(c => c.trim()) || [];

  return { isSafe, categories };
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();

    const question = body.question;
    if (typeof question !== "string") {
      throw new Error("Invalid question format");
    }

    const personality = body.personality;
    if (typeof personality !== "string") {
      throw new Error("Invalid personality format");
    }

    const answerPrompt = getRandomItem([
      "Yes",
      "No",
      "Maybe",
      "No answer",
    ]);

    const rawGuard = await fetchGuardResponse(question);
    const parsedGuard = parseGuardResponse(rawGuard);

    const personalityData = personalitiesList.find(p => p.linkname === personality);

    if (!personalityData) {
      throw new Error("Personality not found");
    }

    const systemPrompt = getSystemPrompt(answerPrompt, personalityData);

    let aiResponse: string;
    if (personalityData.customResponseScript) {
      aiResponse = personalityData.customResponseScript(question);
    } else {
      aiResponse = await fetchAIResponse(question, systemPrompt, personalityData.temperature);
    }

    const sig = signParams([question, aiResponse, personalityData.linkname], process.env.IMAGE_SECRET || "");

    return Response.json({
      question,
      response: aiResponse,
      responseType: parsedGuard.isSafe ? answerPrompt : "Overwritten",
      isSafe: parsedGuard.isSafe,
      violatedCategories: parsedGuard.categories,
      personality: personalityData.name,
      imageLink: `/api/image/share-result?question=${encodeURIComponent(question)}&response=${encodeURIComponent(aiResponse)}&personality=${encodeURIComponent(personalityData.linkname)}&sig=${sig}`,
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: error }, { status: 500 });
  }
}