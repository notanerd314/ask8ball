"use client";

import { useEightBall } from "./context/EightBallContext";

/** 
 * Enhanced personality information component with better visual hierarchy
 * @returns JSX element with personality name, icon, and description
 */
export default function PersonalityInfo() {
  const { currentPersonality } = useEightBall();

  return (
    <div className="text-center space-y-4 max-w-2xl mx-auto px-4">
      {/* Icon with glow effect */}
      <div className="relative inline-block">
        <div className="text-6xl md:text-7xl filter drop-shadow-2xl">
          {currentPersonality.theme.icon}
        </div>
        <div 
          className="absolute inset-0 blur-2xl opacity-50 -z-10"
          style={{ color: currentPersonality.theme.accentColor }}
        >
          {currentPersonality.theme.icon}
        </div>
      </div>

      {/* Name and tag */}
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            {currentPersonality.name}
          </h1>
          {currentPersonality.tag && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow-lg">
              ✨ {currentPersonality.tag}
            </span>
          )}
        </div>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg mx-auto">
          {currentPersonality.description}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="flex justify-center gap-2 opacity-60">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white/40 float"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </div>
    </div>
  );
}