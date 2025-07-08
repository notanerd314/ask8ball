"use client";

import { useEightBall } from "./context/EightBallContext";

const TITLE_BASE_CLASSES = "font-bold";
const TITLE_WITH_TAG_CLASSES = "flex items-center justify-center mt-2 mb-1";
const ICON_CLASSES = "mr-3";
const NAME_CLASSES = "text-4xl";
const TAG_CLASSES = "!text-[0.95rem] ml-3";
const DESCRIPTION_CLASSES = "text-[1.25rem]";

/** 
 * Component displaying current personality information
 * @returns JSX element with personality name, icon, and description
 */
export default function PersonalityInfo() {
  const { currentPersonality } = useEightBall();

  const titleClasses = `${TITLE_BASE_CLASSES} ${
    currentPersonality.tag ? TITLE_WITH_TAG_CLASSES : ""
  }`;

  return (
    <div className='text-center leading-relaxed'>
      <h2 className={titleClasses}>
        <span className={ICON_CLASSES}>{currentPersonality.theme.icon}</span>
        <span className={NAME_CLASSES}>{currentPersonality.name}</span>
        {currentPersonality.tag && (
          <mark className={TAG_CLASSES}>{currentPersonality.tag}</mark>
        )}
      </h2>
      <p className={DESCRIPTION_CLASSES}>{currentPersonality.description}</p>
    </div>
  );
}