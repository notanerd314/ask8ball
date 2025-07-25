import MainEightBall from "@/components/eightball/MainEightBall";
import Footer from "@/components/eightball/Footer";
import NavBar from "@/components/eightball/NavBar";
import { getPersonalityByLinkName } from "@/helpers/api";

export default function Home() {
  const personality = getPersonalityByLinkName("sarcastic");

  return (
    <>
      <NavBar />
      
      <MainEightBall personalityData={personality!} />

      <Footer />
    </>
  );
}
