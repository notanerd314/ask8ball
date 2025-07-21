import { getAllPersonalities } from "@/helpers/api";

export async function GET() {
  const smallPersonalitiesList = getAllPersonalities();

  return new Response(JSON.stringify(smallPersonalitiesList), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}