import { personalitiesList } from "../../../lib/prompts";

export async function GET(req: Request): Promise<Response> {
    return new Response(JSON.stringify(personalitiesList), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}