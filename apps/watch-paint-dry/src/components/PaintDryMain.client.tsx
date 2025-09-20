"use client";

import { getRandomInt, getRandomItem } from "@notanerd/rng";
import { useEffect, useState } from "react";
import { usePaintDry, PaintDryProvider } from "./PaintDryContext.client";

import IntroductionModal from "./IntroductionModal.client";
import FailModal from "./FailModal.client";
import WinModal from "./WinModal.client";
import PaintDry from "./PaintDry";
import ProgressIndicator from "./TimeProgressIndicator";
import PaintSelectionModal from "./PaintSelectionModal.client";
import StateDebug from "./StateDebug.client";

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

  const { dryProgress, totalSeconds } = usePaintDry();

  useEffect(() => {
    if (totalSeconds === 0) return;
    setBgColor(getRandomItem(bgColors));
    setNoiseSize(getRandomInt(500, 650));
  }, [totalSeconds]);

  return (
    <>
      <ProgressIndicator />

      <IntroductionModal />
      <PaintSelectionModal />
      <FailModal />
      <WinModal />

      <StateDebug />

      <PaintDry color={bgColor} noiseSize={noiseSize} progress={dryProgress} />
    </>
  );
}

export default function PaintDryMain() {
  return (
    <main>
      <PaintDryProvider>
        <PaintDryView />
      </PaintDryProvider>
    </main>
  );
}
