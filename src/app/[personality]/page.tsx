import MainEightBall from "@/components/eightball/MainEightBall";
import NavBar from "@/components/NavBar";
import { getPersonalityByLinkName } from "@/helpers/api";

export default async function Home({ params }: { params: { personality: string } }) {
  const currentParams = await params;

  const personality = getPersonalityByLinkName(currentParams.personality);

  return (
    <>
      <NavBar />
      
      <MainEightBall personalityData={personality!} />
    </>
  );
}
