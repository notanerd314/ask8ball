"use client";

import { Modal } from "@notanerd/components";
import { usePaintDry } from "./PaintDryContext.client";

import { Cinzel } from "next/font/google";

const font = Cinzel({ subsets: ["latin"], display: "swap", weight: "500" });

export default function FailScene() {
  const { gameState, dryProgress, timeElapsed, restartGame } = usePaintDry();


  return (
    <Modal
      isOpen={gameState === "failed"}
      onClose={() => { }}
      modalClassName="text-white text-center w-full absolute -translate-1/2 top-1/2 left-1/2"
      backdropClassName="bg-black/60 cursor-pointer backdrop-blur-sm"
      onClick={() => restartGame()}
    >
      <h2 className={"sm:text-[6rem] text-[3.5rem] text-red-500/60 leading-none py-9 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_10%,rgba(0,0,0,0.7)_20%,rgba(0,0,0,0.7)_80%,rgba(0,0,0,0)_90%,rgba(0,0,0,0)_100%)] animate-[fadeIn_2s_ease-out_forwards] " + font.className}>YOU FAILED</h2>

      <p className="font-bold text-white/70 text-2xl leading-relaxed">
        You clicked outside the tab and failed.
      </p>

      <p className="font-bold text-white/70 text-2xl leading-relaxed rainbow-text">
        You completed {dryProgress.toFixed(1)}% of the challenge, in {timeElapsed} seconds.
      </p>

      <small className="text-white/50 text-lg">
        (Press anywhere to restart)
      </small>
    </Modal>
  )
}