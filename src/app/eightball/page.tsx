import MainEightBall from "@/components/eightball/MainEightBall.client";
import { getPersonalityByLinkName } from "@/helpers/eightball/api";

export default function EightBall() {
  const personality = getPersonalityByLinkName("sarcastic");

  return <MainEightBall personalityData={personality!} />;
}
