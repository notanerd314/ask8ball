"use client";

import { useEightBall } from "./context/EightBallContext";

/** 
 * Optimized personality information component
 * @returns JSX element with personality name, icon, and description
 */
export default function PersonalityInfo() {
  const { currentPersonality } = useEightBall();

  return (
    <div className="text-center space-y-4 max-w-2xl mx-auto px-4">
      {/* Icon - simplified */}
      <div className="text-6xl md:text-7xl">
        {currentPersonality.theme.icon}
      </div>

      {/* Name and tag */}
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {currentPersonality.name}
          </h1>
          {currentPersonality.tag && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-400 text-black">
              ✨ {currentPersonality.tag}
            </span>
          )}
        </div>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg mx-auto">
          {currentPersonality.description}
        </p>
      </div>
    </div>
  );
}