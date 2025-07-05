"use client"

import { useEightBall } from "../context/EightBallContext";

export default function PersonalityInfo() {
  const { currentPersonality } = useEightBall()

  return (
    <div className='text-center leading-relaxed text-[1.25rem]'>
      <h2 className={`font-bold ${currentPersonality.tag && "flex items-center justify-center mt-2 mb-1"}`}>
        <span className="mr-3">{currentPersonality.theme.icon}</span>
        <span className="text-4xl">{currentPersonality.name}</span>
        {currentPersonality.tag && <mark className="!text-[0.95rem] ml-3">{currentPersonality.tag}</mark>}
      </h2>
      <p>{currentPersonality.description}</p>
    </div>
  );
}