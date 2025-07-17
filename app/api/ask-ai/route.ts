import { getRandomItem } from "../../../lib/rng";
import getSystemPrompt from "../../../lib/prompts";
import { personalitiesList } from "../../../lib/personalities";
import { AnswerPrompt } from "../../../lib/types/eightball";

import { signParams } from "../../../lib/cryptography";
import { QUESTION_MAX_LENGTH } from "../../../lib/constants/eightball";

const llamaScout = "meta-llama/llama-4-scout-17b-16e-instruct";
const llamaGuard = "meta-llama/llama-guard-4-12b";

type GuardResponse = {
  isSafe: boolean;
  categories: string[];
};

/** 
 * Checks content safety using Llama Guard model
 * @param question - The user question to validate
 * @returns Promise resolving to raw guard response string
 */
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

/** 
 * Generates AI response using Qwen model
 * @param question - The user's question
 * @param systemPrompt - The personality-based system prompt
 * @param temperature - AI temperature setting for response randomness
 * @returns Promise resolving to AI-generated response string
 */
async function fetchAIResponse(question: string, systemPrompt: string, temperature: number | undefined): Promise<string> {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LLM_GROQ!}`,
    },
    body: JSON.stringify({
      model: llamaScout,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
      temperature: temperature || 1.1,
      top_p: 1,
      presence_penalty: 1.0,
      frequency_penalty: 0.8,
      max_completion_tokens: 40,
      stream: false
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content;
}

/** 
 * Parses guard response into structured format
 * @param data - Raw guard response string
 * @returns Parsed guard response with safety status and categories
 */
function parseGuardResponse(data: string): GuardResponse {
  const lines = data.trim().split("\n");
  const isSafe = lines[0]?.toLowerCase() === "safe";
  const categories = lines[1]?.split(",").map(c => c.trim()) || [];

  return { isSafe, categories };
}

/** 
 * Handles AI question requests with content moderation
 * @param req - HTTP request containing question and personality
 * @returns Promise resolving to JSON response with AI answer and metadata
 */
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

    if (question.length > QUESTION_MAX_LENGTH) {
      throw new Error("Question too long");
    }

    // const perviousResponse = body.previousResponse;

    const answerPrompt = getRandomItem([
      AnswerPrompt.Yes,
      AnswerPrompt.No,
      AnswerPrompt.Maybe,
      AnswerPrompt.NoAnswer
    ]);

    const rawGuard = await fetchGuardResponse(question);
    // const parsedGuard = parseGuardResponse(rawGuard);

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
      responseType: answerPrompt,
      // isSafe: parsedGuard.isSafe,
      // violatedCategories: parsedGuard.categories,
      personality: personalityData.linkname,
      createdAt: new Date(),
      shareSig: sig
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: error }, { status: 500 });
  }
}