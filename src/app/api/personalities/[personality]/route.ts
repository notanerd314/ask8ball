import { getPersonalityByLinkName } from "@/helpers/api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { personality: string } }) {
  const awaitedParams = await params
  const personality = getPersonalityByLinkName(awaitedParams.personality);

  return new Response(JSON.stringify(personality), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}