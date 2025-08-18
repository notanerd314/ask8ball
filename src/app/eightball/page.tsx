import MainEightBall from "@/components/eightball/MainEightBall.client";
import { getPersonalityByLinkName } from "@/utils/eightball/personalities";

export default function EightBall() {
  const personality = getPersonalityByLinkName("sarcastic");

  return <MainEightBall personalityData={personality!} />;
}
