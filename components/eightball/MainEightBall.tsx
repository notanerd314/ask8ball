"use client";

import { useState } from "react";
import ShareDialog from "../dialogs/ShareDialog";
import { EightBallProvider, useEightBall } from "./context/EightBallContext";
import PersonalityInfo from "./PersonalityInfo";
import { ShareIcon, CopyIcon } from "../utils/FontAwesome";
import Magic8Ball from "./Magic8Ball";
import { PersonalityConfig } from "../../lib/prompts";
import useCopyText from "./hooks/useCopyShareText";

const CONTAINER_BASE_CLASSES = "flex flex-col items-center w-full lg:h-[90vh] h-[97vh] overflow-hidden gap-4 pr-5 pl-5 pt-25 pb-6 rounded-b-[40px] mb-10 -z-50";
const SHARE_BUTTON_CLASSES = "!p-5 lg:!p-4 !text-2xl !rounded-full bg-black/60 transition-transform hover:scale-110 active:scale-95";
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
    currentResponse
  } = useEightBall();

  const { copyText } = useCopyText();

  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className={CONTAINER_BASE_CLASSES} style={containerStyle}>
      <ShareDialog isOpen={isShareOpen} setIsOpen={setIsShareOpen} />

      <PersonalityInfo />
      <Magic8Ball />

      <div className='flex flex-row items-center gap-2'>
        <button
          className={SHARE_BUTTON_CLASSES + " text-green-300"}
          onClick={() => setIsShareOpen(true)}
          hidden={ballCurrentState === "shaking" || !currentResponse.response}
        >
          <ShareIcon size={20} /> Share
        </button>

        <button
          className={SHARE_BUTTON_CLASSES + " text-amber-300"}
          onClick={copyText}
          hidden={ballCurrentState === "shaking" || !currentResponse.response}
        >
          <CopyIcon size={20} /> Copy
        </button>
      </div>

      <p className={DISCLAIMER_CLASSES}>
        The responses are AI-generated for entertainment purposes only. Do not take this seriously.
      </p>
    </div>
  )
}