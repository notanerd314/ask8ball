import { getRandomItem } from "../../../lib/rng";
import getSystemPrompt from "../../../lib/prompts";
import { personalitiesList } from "../../../lib/personalities";
import { AnswerPrompt } from "../../../lib/types/eightball";
import { APIResponse, APIError, GuardResponse } from "../../../lib/types/api";
import { validateQuestion, validatePersonality, ValidationError } from "../../../lib/validation/input";
import { createShareSignature } from "../../../lib/utils/share";


const llamaScout = "meta-llama/llama-4-scout-17b-16e-instruct";
const llamaGuard = "meta-llama/llama-guard-4-12b";


/** 
 * Checks content safety using Llama Guard model
 * @param question - The user question to validate
 * @returns Promise resolving to raw guard response string
 */
async function fetchGuardResponse(question: string): Promise<string> {
  if (!process.env.MODERATION_GROQ) {
    throw new Error('Moderation API key not configured');
  }

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

  if (!response.ok) {
    throw new Error(`Moderation API error: ${response.status}`);
  }

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
  if (!process.env.LLM_GROQ) {
    throw new Error('LLM API key not configured');
  }

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

  if (!response.ok) {
    throw new Error(`LLM API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.choices?.[0]?.message?.content) {
    throw new Error('Invalid AI response format');
  }
  
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

    // Validate inputs
    const question = validateQuestion(body.question);
    const personality = validatePersonality(body.personality);

    const answerPrompt = getRandomItem([
      AnswerPrompt.Yes,
      AnswerPrompt.No,
      AnswerPrompt.Maybe,
      AnswerPrompt.NoAnswer
    ]);

    const rawGuard = await fetchGuardResponse(question);
    const parsedGuard = parseGuardResponse(rawGuard);

    const personalityData = personalitiesList.find(p => p.linkname === personality);

    if (!personalityData) {
      throw new ValidationError("Personality not found", "PERSONALITY_NOT_FOUND");
    }

    const systemPrompt = getSystemPrompt(answerPrompt, personalityData);

    let aiResponse: string;
    if (personalityData.customResponseScript) {
      aiResponse = personalityData.customResponseScript(question);
    } else {
      aiResponse = await fetchAIResponse(question, systemPrompt, personalityData.temperature);
    }

    const shareData = {
      question,
      response: aiResponse,
      personality: personalityData.linkname,
      timestamp: Date.now()
    };
    
    const sig = createShareSignature(shareData, process.env.IMAGE_SECRET || "");

    const response: APIResponse = {
      question,
      response: aiResponse,
      responseType: parsedGuard.isSafe ? answerPrompt : "Overwritten",
      isSafe: parsedGuard.isSafe,
      violatedCategories: parsedGuard.categories,
      personality: personalityData.name,
      shareSig: sig,
    };

    return Response.json(response);
    
  } catch (error) {
    console.error("API Error:", error);
    
    if (error instanceof ValidationError) {
      const apiError: APIError = {
        error: error.message,
        code: error.code
      };
      return Response.json(apiError, { status: 400 });
    }
    
    const apiError: APIError = {
      error: "Internal server error",
      code: "INTERNAL_ERROR"
    };
    return Response.json(apiError, { status: 500 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: error }, { status: 500 });
  }
}