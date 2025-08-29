"use client";
import { getRandomInt, getRandomItem } from "@/rng";
import { useEffect, useState } from "react";
import { usePaintDry } from "./PaintDryContext.client";

const bgColors = [
  "#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF", "#A0C4FF",
  "#BDB2FF", "#FFC6FF", "#FFB5A7", "#FCD5CE", "#C1FFD7", "#D0F4DE",
  "#F5F5F5", "#EDEDED"
];

// Helper: maps percent (0-100) to value between min and max
function percentToValue(percent: number, min = 0, max = 1) {
  return min + (percent / 100) * (max - min);
}

// Easing for more natural drying curve (fast start, slow finish)
function easeOutQuad(t: number) {
  return t * (2 - t);
}

// Gloss opacity: stays full till 80%, then fades out by 100%
function glossOpacity(progress: number) {
  if (progress < 80) return 1;
  if (progress < 100) return 1 - (progress - 80) / 20;
  return 0;
}

export default function PaintDry({ color }: { color: string }) {
  const { dryProgress } = usePaintDry();
  const [noiseSize, setNoiseSize] = useState(0);
  const [bgColor, setBgColor] = useState(color);

  useEffect(() => {
    setNoiseSize(getRandomInt(650, 800));
    if (bgColor === "random") setBgColor(getRandomItem(bgColors));
  }, []);

  // Clamp and ease progress for more realistic drying feel
  const clampedProgress = Math.min(dryProgress, 100);
  const easedProgress = easeOutQuad(clampedProgress / 100) * 100;

  // Base paint layer filter with brightness, saturation, and subtle hue shift
  const baseFilter = `
    brightness(${1 - easedProgress / 1200})
    saturate(${1.3 - easedProgress / 250})
    hue-rotate(${easedProgress / 20}deg)
  `;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white">
      {/* DEBUG */}
      <div className="absolute top-4 left-4 z-50 text-black">
        <p>Progress: {clampedProgress.toFixed(1)}%</p>
      </div>

      {/* Base paint layer (darker, richer at first) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: bgColor,
          filter: baseFilter,
        }}
      />

      {/* Gloss highlight - broad sweep */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 65%)`,
          mixBlendMode: "screen",
          opacity: glossOpacity(easedProgress),
        }}
      />

      {/* Radial gloss hotspot */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 35% 25%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0) 60%)`,
          mixBlendMode: "screen",
          opacity: glossOpacity(easedProgress),
        }}
      />

      {/* Roller streaks */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.08) 0px,
            rgba(255,255,255,0.08) 3px,
            transparent 2px,
            transparent 16px
          )`,
          mixBlendMode: "overlay",
          opacity: 1 - percentToValue(easedProgress, 0, 1),
        }}
      />

      {/* Texture layer (fades IN slowly as paint dries) with animated noise */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/watch-paint-dry/buried.png')",
          backgroundSize: `${noiseSize}px`,
          opacity: percentToValue(easedProgress, 0, 0.45),
        }}
      />
    </div>
  );
}
