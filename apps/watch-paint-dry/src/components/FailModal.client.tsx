"use client";

import { Modal } from "@notanerd/components";
import { usePaintDry } from "./PaintDryContext.client";

import { Cinzel } from "next/font/google";

const font = Cinzel({ subsets: ["latin"], display: "swap", weight: "500" });

export default function FailModal() {
  const { gameState, dryProgress, timeElapsed, setGameState, setTotalSeconds, setDryProgress } = usePaintDry();

  function restartGame() {
    setDryProgress(0);
    setTotalSeconds(0);
    setGameState("notstarted");
  }

  return (
    <Modal
      isOpen={gameState === "failed"}
      onClose={() => { }}
      modalClassName="text-white text-center w-full absolute -translate-1/2 top-1/2 left-1/2"
      backdropClassName="bg-black/60 cursor-pointer backdrop-blur-sm"
      onClick={() => restartGame()}
    >
      <h1 className={"sm:text-[5rem] text-[3.5rem] text-red-500/60 leading-none py-9 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_10%,rgba(0,0,0,0.7)_20%,rgba(0,0,0,0.7)_80%,rgba(0,0,0,0)_90%,rgba(0,0,0,0)_100%)] animate-[fadeIn_2s_ease-out_forwards] " + font.className}>YOU FAILED</h1>

      <p className="font-bold leading-relaxed text-xl text-white/70">
        Failed when paint is {dryProgress.toFixed(1)}% dry, wasted {timeElapsed} seconds.
      </p>

      <small className="text-white/50 text-sm">
        (Press anywhere to restart)
      </small>
    </Modal>
  )
}