"use client"

import { useEightBall } from "../context/EightBallContext";

export default function PersonalityInfo() {
  const { currentPersonality } = useEightBall()

  return (
    <div className='text-center leading-relaxed text-[1.25rem]'>
      <h1 className=''>{currentPersonality.name}</h1>
      <p>{currentPersonality.long_name}</p>
    </div>
  );
}