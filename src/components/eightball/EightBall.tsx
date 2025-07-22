"use client";

import { EightBallProvider } from "./EightBallContext";
import { PersonalityConfig } from "@/helpers/types";

export default function EightBall({ personalityData }: { personalityData: PersonalityConfig }) {
  return (
    <EightBallProvider personality={personalityData}>
      <p>{JSON.stringify(personalityData)}</p>
    </EightBallProvider>
  )
}