"use client";

import { EightBallProvider, useEightBall } from "./context/EightBallContext";
import PersonalityInfo from "./PersonalityInfo";
import Magic8Ball from "./Magic8Ball";
import ShareButtons from "./ShareButtons";
import { PersonalityConfig } from "../../lib/prompts";
import Link from "next/link";

/** 
 * Main content with provider
 * @param personalityData - Personality configuration for the eight ball
 * @returns JSX element of the main content wrapped with the provider
 */
export default function MainEightBall({ personalityData }: { personalityData: PersonalityConfig }) {
  return (
    <EightBallProvider personalityData={personalityData}>
      <Main8BallContent />
    </EightBallProvider>
  );
}

/**
 * Optimized main container component for eight ball experience
 * @returns JSX element of the main content with simplified design
 */
function Main8BallContent() {
  const {
    ballCurrentState,
    currentResponse,
    currentPersonality
  } = useEightBall();

  const hasResponse = !!currentResponse.response && ballCurrentState !== "shaking";

  return (
    <div className="page-transition">
      {/* Background with personality theme */}
      <div
        className="fixed inset-0 opacity-80 -z-50"
        style={{ background: currentPersonality.theme.cssBackground }}
      />

      {/* Main content */}
      <main className="flex flex-col justify-center items-center gap-12 mb-8 overflow-auto" id="eightball">
        <PersonalityInfo />
        <Magic8Ball />
        <ShareButtons hasResponse={hasResponse} currentResponse={currentResponse} />

        <p className="text-center text-sm text-white/40 mx-auto">
          The responses are AI-generated for entertainment purposes only, don't be serious.
        </p>
      </main>
    </div>
  );
}