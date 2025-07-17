import { personalitiesList } from "../../../lib/personalities";

/** 
 * Fetches specific personality configuration by linkname
 * @param req - HTTP request with personality query parameter
 * @returns Promise resolving to JSON response with personality data or error
 */
export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);

  const personality = searchParams.get("personality");

  if (personality) {
    const personalityData = personalitiesList.find(p => p.linkname === personality)

    if (!personalityData) {
      return new Response(JSON.stringify({ error: 0 }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(personalityData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new Response(JSON.stringify(personalitiesList), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}