"use client"

import { useEightBall } from "../context/EightBallContext";

export default function PersonalityInfo() {
  const { currentPersonality } = useEightBall()

  return (
    <div className='absolute p-6 leading-loose lg:text-left text-center bg-black/20 self-start rounded-2xl shadow-lg ml-6'>
      <h1 className='!text-5xl'>{currentPersonality.name}</h1>
      <p>{currentPersonality.long_name}</p>
    </div>
  );
}