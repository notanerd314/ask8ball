import MainEightBall from "@/components/MainEightBall.client"
import { getPersonalityByLinkName } from "../utils/personalities";

export default function EightBall() {
  const personality = getPersonalityByLinkName("sarcastic");

  return <MainEightBall personalityData={personality!} />;
}
