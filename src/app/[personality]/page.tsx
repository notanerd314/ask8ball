import MainEightBall from "@/components/eightball/MainEightBall";
import NavBar from "@/components/NavBar";
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
      <NavBar />
      
      <MainEightBall personalityData={personality!} />
    </>
  );
}
