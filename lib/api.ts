import { PersonalityConfig } from "./types/eightball";
import { DOMAIN } from "./constants/secret";
import { APIResponse } from "./types/eightball";

/** 
 * Fetches personality configuration by slug
 * @param slug - Personality identifier
 * @returns Promise resolving to personality config or null if not found
 */
export async function getPersonalityData(slug: string): Promise<PersonalityConfig | null> {
  try {
    // Replace with your actual API endpoint
    const res = await fetch(`${DOMAIN}api/get-personality?personality=${slug}`);

    if (!res.ok) {
      // Handle non-2xx responses
      if (res.status === 404) {
        return null; // Personality not found
      }
      throw new Error(`Failed to fetch personality data: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching personality data:", error);
    return null; // Handle network errors or other issues
  }
}

/** 
 * Fetches all available personality configurations
 * @returns Promise resolving to array of personality configs
 */
export async function getAllPersonalities(): Promise<PersonalityConfig[]> {
  try {
    const res = await fetch(`${DOMAIN}api/all-personalities`);
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
 * @returns Promise resolving to AI response with metadata
 */
export const getAnswer = async (question: string, personality: string): Promise<APIResponse> => {
  const res = await fetch("/api/ask-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, personality }),
  });

  const data = await res.json();
  return data;
};