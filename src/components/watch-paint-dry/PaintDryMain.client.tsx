"use client";

import { getRandomInt, getRandomItem } from "@/rng";
import { useEffect, useState } from "react";
import { usePaintDry, PaintDryProvider } from "./PaintDryContext.client";

import IntroductionOverlay from "./IntroductionOverlay.client";
import FailOverlay from "./FailOverlay.client";
import WinOverlay from "./WinOverlay.client";
import PaintDry from "./PaintDry";
import PageTitle from "./PageTitle.client";
import StateDebug from "./StateDebug.client";
import ProgressIndicator from "./ProgressIndicator.client";

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

  // Dark & Rich
  "#2F4858", // Dark Slate Blue
  "#1B1B1E", // Charcoal Black
  "#3E2723", // Espresso Brown
  "#4A4E69", // Twilight Purple
  "#003366", // Navy Blue

  // Cool & Neutral
  "#B0BEC5", // Cool Gray
  "#D3D3D3", // Light Gray
  "#ECECEC", // Off White
  "#5D737E", // Steel Blue-Gray

  // Pastel & Soft (to complement your existing ones)
  "#F8C8DC", // Baby Pink
  "#D0E8F2", // Powder Blue
  "#D9EAD3", // Pale Mint
  "#FFFACD", // Lemon Chiffon
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
      <StateDebug />
      <PageTitle />

      <ProgressIndicator />

      <IntroductionOverlay />
      <FailOverlay />
      <WinOverlay />

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
