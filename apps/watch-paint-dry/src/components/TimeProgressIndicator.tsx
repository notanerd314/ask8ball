'use client';

import { usePaintDry } from "./PaintDryContext.client";
import { Roboto_Mono } from "next/font/google";

const font = Roboto_Mono({ subsets: ["latin"], display: "swap", weight: "300" });

export default function ProgressIndicator() {
  const { timeElapsed, gameState } = usePaintDry();

  function convertHHMMSS(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  return (
    <>
      <p
        className={`absolute z-50 p-3 md:text-[12rem] text-[6rem] tracking-[-0.075em] font-bold text-black/30 top-1/2 left-1/2 -translate-1/2 ${font.className}`}
        hidden={gameState !== "inprogress"}
      >
        {convertHHMMSS(timeElapsed)}
      </p>
    </>
  );
}
