import MainEightBall from "@/components/eightball/MainEightBall";
import { getPersonalityByLinkName } from "@/helpers/eightball/api";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { personality: string } }) {
  const currentParams = await params;
  const personality = getPersonalityByLinkName(currentParams.personality);

  if (!personality) {
    return notFound();
  }

  return <MainEightBall personalityData={personality!} />;
}
