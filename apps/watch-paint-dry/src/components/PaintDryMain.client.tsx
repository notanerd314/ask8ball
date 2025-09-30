"use client";

import { getRandomInt, getRandomItem } from "@notanerd/rng";
import { useEffect, useState } from "react";
import { usePaintDry, PaintDryProvider } from "./PaintDryContext.client";

import IntroductionScene from "./IntroductionScene.client";
import FailScene from "./FailScene.client";
import WinScene from "./WinScene.client";
import PaintDry from "./PaintDry";
import ProgressIndicator from "./TimeProgressIndicator";
import StateDebug from "./StateDebug.client";
import { VolumeProvider } from "./VolumeContext";
import VolumeToggle from "./VolumeToggle";

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


function PaintDryView() {
  const [bgColor, setBgColor] = useState("");
  const [noiseSize, setNoiseSize] = useState(0);

  const { dryProgress, totalSeconds, timeElapsed } = usePaintDry();

  useEffect(() => {
    setBgColor(getRandomItem(bgColors));
  }, [])

  useEffect(() => {
    if (totalSeconds === 0) return;
    setBgColor(getRandomItem(bgColors));
    setNoiseSize(getRandomInt(500, 650));
  }, [totalSeconds]);

  return (
    <>
      <ProgressIndicator timeElapsed={timeElapsed} />

      <IntroductionScene />
      <FailScene />
      <WinScene />
      <VolumeToggle />

      <PaintDry color={bgColor} noiseSize={noiseSize} progress={dryProgress} />
    </>
  );
}

export default function PaintDryMain() {
  return (
    <main>
      <VolumeProvider>
        <PaintDryProvider>
          <PaintDryView />
        </PaintDryProvider>
      </VolumeProvider>
    </main>
  );
}
