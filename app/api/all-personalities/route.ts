import { personalitiesList } from "../../../lib/personalities";

/** 
 * Returns all available personality configurations
 * @param req - HTTP request object
 * @returns Promise resolving to JSON response with personalities array
 */
export async function GET(req: Request): Promise<Response> {
    return new Response(JSON.stringify(personalitiesList), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}