import MainEightBall from "@/components/eightball/MainEightBall";
import { getPersonalityByLinkName } from "@/helpers/eightball/api";

export default function EightBall() {
  const personality = getPersonalityByLinkName("sarcastic");

  return <MainEightBall personalityData={personality!} />;
}
