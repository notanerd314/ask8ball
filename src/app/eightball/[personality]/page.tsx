import MainEightBall from "@/components/eightball/MainEightBall";
import Logo from "@/components/Logo";
import Link from "next/link";
import { getPersonalityByLinkName } from "@/helpers/api";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { personality: string } }) {
  const currentParams = await params;
  const personality = getPersonalityByLinkName(currentParams.personality);

  if (!personality) {
    return notFound();
  }

  return (
    <>
      
      <MainEightBall personalityData={personality!} />
    </>
  );
}
