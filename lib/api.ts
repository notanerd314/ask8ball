import { PersonalityConfig } from "./types/eightball";
import { DOMAIN } from "./constants/secret";
import { APIResponse, APIError } from "./types/api";

/** 
 * Fetches personality configuration by slug
 * @param slug - Personality identifier
 * @returns Promise resolving to personality config or null if not found
 */
export async function getPersonalityData(slug: string): Promise<PersonalityConfig | null> {
  try {
    const res = await fetch(`${DOMAIN}api/get-personality?personality=${slug}`);

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch personality data: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching personality data:", error);
    return null;
  }
}

/** 
 * Fetches all available personality configurations
 * @returns Promise resolving to array of personality configs
 */
export async function getAllPersonalities(): Promise<PersonalityConfig[]> {
  try {
    const res = await fetch(`${DOMAIN}api/all-personalities`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch personalities: ${res.statusText}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching personalities:", error);
    return [];
  }
}

/** 
 * Sends question to AI and returns response with metadata
 * @param question - User's question string
 * @param personality - Personality identifier
 * @param signal - AbortSignal for request cancellation
 * @returns Promise resolving to AI response with metadata
 */
export const getAnswer = async (
  question: string, 
  personality: string, 
  signal?: AbortSignal
): Promise<APIResponse> => {
  const res = await fetch("/api/ask-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, personality }),
    signal,
  });

  if (!res.ok) {
    const errorData: APIError = await res.json();
    const error = new Error(errorData.error);
    (error as any).code = errorData.code;
    throw error;
  }
  const data: APIResponse = await res.json();
  return data;
};