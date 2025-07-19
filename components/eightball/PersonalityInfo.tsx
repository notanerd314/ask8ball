"use client";

import { useEightBall } from "./context/EightBallContext";

/** 
 * Optimized personality information component
 * @returns JSX element with personality name, icon, and description
 */
export default function PersonalityInfo() {
  const { currentPersonality } = useEightBall();

  return (
    <section className="text-center flex flex-col gap-2 items-center justify-center max-w-3xl mx-auto mt-12" title="Personality information">
      {/* Name and tag */}
      <h1 className="!text-4xl md:text-5xl font-bold text-white">
        {currentPersonality.theme.icon} {currentPersonality.name}
      </h1>

      <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg">
        {currentPersonality.description}
      </p>
    </section>
  );
}