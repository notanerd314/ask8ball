"use client";

import { getRandomInt, getRandomItem } from "@/rng";
import { useEffect, useState } from "react";
import { usePaintDry, PaintDryProvider } from "./PaintDryContext.client";

import IntroductionOverlay from "./IntroductionOverlay.client";
import FailOverlay from "./FailOverlay.client";
import WinOverlay from "./WinOverlay.client";
import PaintDry from "./PaintDry";
import TTS from "./TTS.client";
import PageTitle from "./PageTitle.client";

const bgColors = [
  "#FFADAD", "#FFD6A5", "#CAFFBF", "#9BF6FF", "#A0C4FF",
  "#BDB2FF", "#FFC6FF", "#FFB5A7", "#FCD5CE", "#C1FFD7", "#D0F4DE"
];

function PaintDryView() {
  const [bgColor, setBgColor] = useState("");
  const [noiseSize, setNoiseSize] = useState(0);

  const { dryProgress } = usePaintDry();

  useEffect(() => {
    setBgColor(getRandomItem(bgColors));
    setNoiseSize(getRandomInt(500, 650));
  }, []);

  return (
    <>
      <PageTitle />
      <IntroductionOverlay />
      <FailOverlay />
      <WinOverlay />
      <PaintDry color={bgColor} noiseSize={noiseSize} progress={dryProgress} />
      <TTS />
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
