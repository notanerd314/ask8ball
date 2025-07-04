"use client"

import { useEightBall } from "../context/EightBallContext";

export default function PersonalityInfo() {
  const { currentPersonality } = useEightBall()

  return (
    <div className='text-center leading-relaxed text-[1.25rem]'>
      <h2>
        <span className="mr-3">{currentPersonality.theme.icon}</span>
        {currentPersonality.name}
      </h2>
      <p>{currentPersonality.description}</p>
    </div>
  );
}