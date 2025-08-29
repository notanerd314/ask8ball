"use client";
import { getRandomInt, getRandomItem } from "@/rng";
import { useEffect, useState } from "react";

const bgColors = [
  "#FFADAD", // soft coral
  "#FFD6A5", // warm peach
  "#FDFFB6", // pastel yellow
  "#CAFFBF", // mint green
  "#9BF6FF", // aqua blue
  "#A0C4FF", // baby blue
  "#BDB2FF", // lavender
  "#FFC6FF", // light pink
  "#FFB5A7", // blush
  "#FCD5CE", // rose cream
  "#C1FFD7", // seafoam
  "#D0F4DE", // pale turquoise
  "#FFFFFF", // pure white
  "#F5F5F5", // off-white / eggshell
  "#EDEDED"  // light gray-white
];


function percentToValue(percent: number, min = 0.22, max = 0.45) {
  return min + (percent / 100) * (max - min);
}

export default function PaintDry({ color }: { color: string }) {
  const [progress, setProgress] = useState(0);
  const [noiseSize, setNoiseSize] = useState(0);
  const [bgColor, setBgColor] = useState(color);

  useEffect(() => {
    setNoiseSize(getRandomInt(400, 550));

    if (bgColor === "random") {
      setBgColor(getRandomItem(bgColors));
    }

    const interval = setInterval(() => {
      setProgress((p) => (p < 100 ? p + 0.01 : p));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* DEBUG */}
      <div className="absolute top-4 left-4 z-50">
        <p>Progress: {Math.min(progress, 100).toFixed(1)}%</p>
      </div>

      {/* Base paint layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: bgColor,
          filter: `brightness(${1 - progress / 1000})`,
        }}
      />

      {/* Gloss layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)`,
          mixBlendMode: "screen",
          opacity: 1 - percentToValue(progress, 0, 1), // fades out as it dries
        }}
      />

      {/* Texture layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/watch-paint-dry/buried.png')",
          backgroundSize: `${noiseSize}px`,
          opacity: percentToValue(progress),
        }}
      />
    </div>
  );
}
