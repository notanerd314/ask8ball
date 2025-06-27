"use client"

import { useEightBall } from "../context/EightBallContext";

export default function PersonalityInfo() {
  const { currentPersonality } = useEightBall()

  return (
    <div className='text-center leading-normal text-[1.5rem]'>
      <h1>
        <span className="mr-3 text-[2.75rem]">{currentPersonality.theme.icon}</span>
        {currentPersonality.name}
      </h1>
      <p>{currentPersonality.description}</p>
    </div>
  );
}