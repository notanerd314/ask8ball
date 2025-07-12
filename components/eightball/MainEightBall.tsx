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
    minHeight: '100vh'
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
      <main className="relative min-h-screen flex flex-col">
        {/* Hero section */}
        <section className="flex-1 flex flex-col justify-center items-center px-4 py-20 space-y-12">
          <PersonalityInfo />
          <Magic8Ball />
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
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
        {soundUrl && (
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`
              fixed bottom-6 right-6 p-4 rounded-2xl
              border transition-all duration-200
              hover:scale-110 z-40
              ${audioEnabled 
                ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                : 'bg-white/10 text-white/60 border-white/20'
              }
            `}
            title={audioEnabled ? "Disable background audio" : "Enable background audio"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              {audioEnabled ? (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              ) : (
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              )}
            </svg>
          </button>
        )}

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