import MainEightBall from "@/components/eightball/MainEightBall";
import { getPersonalityByLinkName } from "@/helpers/api";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function EightBall() {
  const personality = getPersonalityByLinkName("sarcastic");

  return (
    <>

      <MainEightBall personalityData={personality!} />
    </>
  );
}
