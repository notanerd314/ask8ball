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
      <h1 className="w-64 text-center">
        {personalitiesList.at(currentPersonality)?.name}
      </h1>
      <button onClick={() => switchPersonality(1)}>
        <ChevronRightIcon />
      </button>
    </div>
  );
}