"use client";

import { EightBallProvider, useEightBall } from "./context/EightBallContext";
import UnifiedEightBall from "./UnifiedEightBall";
import { PersonalityConfig } from "../../lib/prompts";

/** 
 * Main content with provider
 * @param personalityData - Personality configuration for the eight ball
 * @returns JSX element of the main content wrapped with the provider
 */
export default function MainEightBall({ personalityData }: { personalityData: PersonalityConfig }) {
  return (
    <EightBallProvider personalityData={personalityData}>
      <UnifiedEightBall />
    </EightBallProvider>
  );
}