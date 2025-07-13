"use client";

import { useEffect, useState } from "react";

import { EightBallProvider, useEightBall } from "./context/EightBallContext";
import PersonalityInfo from "./PersonalityInfo";
import Magic8Ball from "./Magic8Ball";
import { PersonalityConfig } from "../../lib/prompts";
import useCopyText, { generateShareText } from "./hooks/useCopyShareText";
import useSound from "use-sound";
import { useAudioUnlock } from "./hooks/useAudioUnlock";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faShare } from "@fortawesome/free-solid-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

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

  const [audioEnabled, setAudioEnabled] = useState(false);
  const soundUrl = currentPersonality.backgroundSound;
  const [play, { stop }] = useSound(soundUrl || "", {
    loop: true,
    volume: 0.15, // Lower volume for better performance
    soundEnabled: audioEnabled && !!soundUrl,
  });

  useAudioUnlock(play);

  // Audio management
  useEffect(() => {
    if (soundUrl && audioEnabled) {
      play();
    } else {
      stop();
    }

    return () => {
      stop();
    };
  }, [soundUrl, audioEnabled]);

  const { copyText, copyIndicated } = useCopyText();

  const hasResponse = currentResponse.response && ballCurrentState !== "shaking";

  return (
    <div className="page-transition">
      {/* Background with personality theme */}
      <div
        className="fixed inset-0 opacity-80 -z-50"
        style={{ background: currentPersonality.theme.cssBackground }}
      />

      {/* Main content */}
      <main className="flex flex-col justify-center items-center gap-12 mb-8">
        <PersonalityInfo />
        <Magic8Ball />

        {/* Share actions - always visible */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <button
            onClick={copyText}
            disabled={!hasResponse}
            className={`
                flex items-center gap-2 px-6 py-3 !rounded-2xl font-medium
                transition-all duration-200 hover:scale-105
                ${!hasResponse
                ? 'bg-yellow-400/20 text-yellow/40 border border-yellow-400/10 cursor-not-allowed'
                : copyIndicated
                  ? 'bg-green-500/40 text-green-300 border border-green-500/30'
                  : 'bg-yellow-400/40 hover:bg-yellow-400/50 text-white border border-yellow-400/20'
              }
              `}
          >
            <FontAwesomeIcon icon={copyIndicated ? faShare : faCopy} />
            {copyIndicated ? "Copied!" : hasResponse ? "Copy Result" : "Ask the Ball first!"}
          </button>

          <a
            href={hasResponse ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(generateShareText(currentResponse))}` : "#"}
            target={hasResponse ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={`
                flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-200
                ${!hasResponse
                ? '!bg-blue-500/20 !text-white/40 border border-blue-500/20 cursor-not-allowed pointer-events-none'
                : '!bg-blue-500/40 hover:!bg-blue-500/50 !text-white border border-blue-500/30 hover:scale-105'
              }
              `}
          >
            <FontAwesomeIcon icon={faXTwitter} />
            Tweet it!
          </a>
        </div>

        <p className="text-center text-sm text-white/40 mx-auto">
          The responses are AI-generated for entertainment purposes only, don't be serious.
        </p>
      </main>
    </div>
  );
}