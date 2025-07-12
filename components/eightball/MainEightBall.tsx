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

  const containerStyle = {
    background: currentPersonality.theme.cssBackground,
    maxHeight: '100vh'
  };

  const hasResponse = currentResponse.response && ballCurrentState !== "shaking";

  return (
    <div className="page-transition">
      {/* Background with personality theme */}
      <div 
        className="fixed inset-0 -z-50 transition-all duration-500 ease-out"
        style={containerStyle}
      />

      {/* Main content */}
      <main className="relative min-h-screen flex flex-col max-h-screen">
        {/* Hero section */}
        <section className="flex-1 flex flex-col justify-center items-center px-4 py-20 space-y-12">
          <PersonalityInfo />
          <Magic8Ball />

          {/* Share actions - always visible */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={copyText}
              disabled={!hasResponse}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-2xl font-medium
                transition-all duration-200 hover:scale-105
                ${!hasResponse 
                  ? 'bg-white/5 text-white/40 border border-white/10 cursor-not-allowed' 
                  : copyIndicated 
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }
              `}
            >
              <FontAwesomeIcon icon={copyIndicated ? faShare : faCopy} />
              {copyIndicated ? "Copied!" : hasResponse ? "Copy Result" : "Get a response first"}
            </button>

            <a
              href={hasResponse ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(generateShareText(currentResponse))}` : "#"}
              target={hasResponse ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`
                flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-200
                ${!hasResponse 
                  ? 'bg-blue-500/10 text-blue-300/40 border border-blue-500/20 cursor-not-allowed pointer-events-none' 
                  : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 hover:scale-105'
                }
              `}
            >
              <FontAwesomeIcon icon={faXTwitter} />
              Share on X
            </a>
          </div>
        </section>

        {/* Audio toggle (floating) - simplified */}

        {/* Disclaimer */}
        <div className="text-center py-8 px-4">
          <p className="text-sm text-white/50 max-w-2xl mx-auto">
            🔮 The responses are AI-generated for entertainment purposes only. 
            Don't make life decisions based on a digital magic 8-ball! 
            (But do have fun with it.) ✨
          </p>
        </div>
      </main>
    </div>
  );
}