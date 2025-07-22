import EightBall from "@/components/eightball/EightBall";
import NavBar from "@/components/NavBar";
import { getPersonalityByLinkName } from "@/helpers/api";

export default function Home() {
  const personality = getPersonalityByLinkName("sarcastic");

  return (
    <>
      <div className="fixed inset-0 w-screen h-screen -z-50" style={{ background: personality?.theme?.cssBackground, opacity: 0.95 }} />
      <NavBar />
      <EightBall personalityData={personality!} />
    </>
  );
}
