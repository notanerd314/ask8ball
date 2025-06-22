"use client"

import { useEightBall } from "../context/EightBallContext";
import { ChevronLeftIcon, ChevronRightIcon } from "../utils/FontAwesome";
import { personalitiesList } from "../../lib/prompts";

export default function PersonalitySwitcher({ personalities }: { personalities: string[] }) {
  const { currentPersonality, setCurrentPersonality } = useEightBall();

  function switchPersonality(direction: number) {
    setCurrentPersonality((currentPersonality + direction) % personalities.length);
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => switchPersonality(-1)}>
        <ChevronLeftIcon />
      </button>
      <div className="w-90 text-center leading-snug">
        <h1>{personalitiesList.at(currentPersonality)?.name}</h1>
        <p>{personalitiesList.at(currentPersonality)?.long_name}</p>
      </div>
      <button onClick={() => switchPersonality(1)}>
        <ChevronRightIcon />
      </button>
    </div>
  );
}