"use client";

import { useEightBall } from "./context/EightBallContext";

/** 
 * Optimized personality information component
 * @returns JSX element with personality name, icon, and description
 */
export default function PersonalityInfo() {
  const { currentPersonality } = useEightBall();

  return (
    <section className="text-center flex flex-col gap-6 items-center justify-center max-w-4xl mx-auto mt-16 toy-wiggle" title="Personality information">
      {/* Name and tag */}
      <h1 className="!text-6xl md:text-8xl font-black">
        {currentPersonality.theme.icon} {currentPersonality.name}
      </h1>

      <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed max-w-2xl bg-black/40 px-8 py-4 rounded-3xl border-4 border-white/30 shadow-2xl">
        {currentPersonality.description}
      </p>
    </section>
  );
}