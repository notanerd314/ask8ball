import { personalitiesList } from "../../../lib/prompts";

export async function GET(req: Request): Promise<Response> {
    const {searchParams} = new URL(req.url);
    const personality = searchParams.get("personality");
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
}