import { getPersonalityByLinkName } from "@/helpers/api";
import { QUESTION_MAX_LENGTH, AI_MODEL } from "@/helpers/constants";
import getSystemPrompt from "@/helpers/prompts";
import { getRandomItem } from "@/helpers/rng";
import { AnswerPrompt } from "@/helpers/types";
import { NextRequest } from "next/server";

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
      model: AI_MODEL,
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
 * Handles AI question requests with content moderation
 * @param req - HTTP request containing question and personality
 * @returns Promise resolving to JSON response with AI answer and metadata
 * @throws Error if question or personality is invalid
 */
export async function POST(req: NextRequest): Promise<Response> {
  const body = await req.json();

  const question = body.question;
  if (typeof question !== "string" || question.length > QUESTION_MAX_LENGTH) {
    throw new Error("Invalid question format");
  }

  const personalityName = body.personality;
  if (typeof personalityName !== "string") {
    throw new Error("Invalid personality format");
  }

  const personality = getPersonalityByLinkName(personalityName);

  const answerType = getRandomItem(Object.values(AnswerPrompt))
  const systemPrompt = getSystemPrompt(answerType, personality!);
  const answer = await fetchAIResponse(question, systemPrompt, personality?.temperature);

  return new Response(JSON.stringify({
    question, answer, answerType, personality: personalityName
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}