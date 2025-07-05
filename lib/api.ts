import { PersonalityConfig } from "./types/eightball";

export async function getPersonalityData(slug: string): Promise<PersonalityConfig | null> {
  try {
    // Replace with your actual API endpoint
    const res = await fetch(`http://localhost:3000/api/get-personality?personality=${slug}`);

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

export async function getAllPersonalities(): Promise<PersonalityConfig[]> {
  try {
    const res = await fetch("http://localhost:3000/api/all-personalities");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching personalities:", error);
    return [];
  }
}

export const getAnswer = async (question: string, personality: string) => {
  const res = await fetch("/api/ask-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, personality }),
  });

  const data = await res.json();
  return data;
};