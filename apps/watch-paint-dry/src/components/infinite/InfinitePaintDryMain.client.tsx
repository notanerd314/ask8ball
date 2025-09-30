"use client";

import { getRandomInt, getRandomItem } from "@notanerd/rng";
import { useEffect, useState } from "react";
import { useInfinitePaintDry, InfinitePaintDryProvider } from "./InfinitePaintDryContext.client";

import IntroductionScene from "./IntroductionScene.client";
import TimeProgressIndicator from "../TimeProgressIndicator";
import PaintDry from "@/components/PaintDry";
import FailScene from "./FailScene.client";
import { VolumeProvider } from "../VolumeContext";
import VolumeToggle from "../VolumeToggle";

const bgColors = [
  // Bold & Vibrant
  "#FF6F61", // Coral Red
  "#6B5B95", // Deep Purple
  "#88B04B", // Olive Green
  "#FFA500", // Vivid Orange
  "#008080", // Teal
  "#E63946", // Bold Watermelon Red
  "#F4A261", // Desert Orange

  // Earthy & Muted
  "#8D8741", // Olive Brown
  "#659DBD", // Dusty Blue
  "#DAA520", // Goldenrod
  "#BC986A", // Khaki Brown
  "#A2A392", // Sage Gray-Green
];


function InfinitePaintDryView() {
  const [bgColor, setBgColor] = useState("");
  const [noiseSize, setNoiseSize] = useState(0);

  const { timeElapsed, gameState } = useInfinitePaintDry();

  useEffect(() => {
    setBgColor(getRandomItem(bgColors));
    setNoiseSize(getRandomInt(500, 650));
  }, [])

  useEffect(() => {
    if (gameState !== "inprogress") return;
    setBgColor(getRandomItem(bgColors));
    setNoiseSize(getRandomInt(500, 650));
  }, [gameState]);

  return (
    <>
      <IntroductionScene />
      <FailScene />
      <VolumeToggle />
      <TimeProgressIndicator timeElapsed={timeElapsed} />
      <PaintDry color={bgColor} noiseSize={noiseSize} progress={40} />
    </>
  );
}

export default function InfinitePaintDryMain() {
  return (
    <main>
      <VolumeProvider>
        <InfinitePaintDryProvider>
          <InfinitePaintDryView />
        </InfinitePaintDryProvider>
      </VolumeProvider>
    </main>
  );
}
