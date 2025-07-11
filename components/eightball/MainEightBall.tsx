"use client";

import { EightBallProvider, useEightBall } from "./context/EightBallContext";
import PersonalityInfo from "./PersonalityInfo";
import Magic8Ball from "./Magic8Ball";
import { PersonalityConfig } from "../../lib/prompts";
import useCopyText, { generateShareText } from "./hooks/useCopyShareText";
import useSound from "use-sound";
import { useAudioUnlock } from "./hooks/useAudioUnlock";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

const CONTAINER_BASE_CLASSES = "flex flex-col items-center w-full lg:h-[90vh] h-[97vh] overflow-hidden gap-4 pr-5 pl-5 pt-25 pb-6 rounded-b-[40px] mb-10 -z-50";
const SHARE_BUTTON_CLASSES = "!p-5 lg:!p-4 !text-2xl !rounded-full !bg-black/60 transition-transform hover:scale-110 active:scale-95";
const DISCLAIMER_CLASSES = "text-sm text-center text-white/50";

/** 
 * Main content with provider
 * @param personalityData - Personality configuration for the eight ball
 * @returns JSX element of the main content wrapped with the provider
 */
export default function MainEightBall({ personalityData }: { personalityData: PersonalityConfig }) {
  const containerStyle = {
    background: personalityData.theme.cssBackground
  };

  return (
    <EightBallProvider personalityData={personalityData}>
      <Main8BallContent containerStyle={containerStyle} />
    </EightBallProvider>
  );
}

/**
 * Main container component for eight ball experience
 * @param containerStyle - The background of the personality
 * @returns JSX element of the main content
 */ function Main8BallContent({ containerStyle }: { containerStyle: React.CSSProperties }) {
  const {
    ballCurrentState,
    currentResponse,
    currentPersonality
  } = useEightBall();

  if (currentPersonality.backgroundSound) {
    const [play, { stop }] = useSound(currentPersonality.backgroundSound, {
      loop: true,
      volume: 0.1,
    });

    useAudioUnlock(play);
  };

  const { copyText, copyIndicated } = useCopyText();

  return (
    <div className={CONTAINER_BASE_CLASSES} style={containerStyle}>
      <PersonalityInfo />
      <Magic8Ball />

      <div className='flex flex-row items-center gap-2'>
        <a
          className={SHARE_BUTTON_CLASSES + " !text-blue-300"}
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(generateShareText(currentResponse))}`}
          target="_blank"
          hidden={ballCurrentState === "shaking" || !currentResponse.response}
        >
          <FontAwesomeIcon icon={faXTwitter} /> Tweet
        </a>

        <button
          className={SHARE_BUTTON_CLASSES + " text-amber-300"}
          onClick={copyText}
          hidden={ballCurrentState === "shaking" || !currentResponse.response}
        >
          <FontAwesomeIcon icon={faCopy} /> {copyIndicated ? "Copied!" : "Copy"}
        </button>
      </div>

      <p className={DISCLAIMER_CLASSES}>
        The responses are AI-generated for entertainment purposes only. Do not take this seriously.
      </p>
    </div>
  )
}