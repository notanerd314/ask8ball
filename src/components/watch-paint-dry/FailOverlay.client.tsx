"use client";

import { Modal } from "../Modal";
import { useEffect } from "react";
import { usePaintDry } from "./PaintDryContext.client";

import { Cinzel } from "next/font/google";

const font = Cinzel({ subsets: ["latin"], display: "swap", weight: "500" });

export default function FailOverlay() {
  const { gameState, dryProgress, timeElapsed, setGameState, randomizeTotalSeconds, setDryProgress } = usePaintDry();

  function restartGame() {
    randomizeTotalSeconds();
    setDryProgress(0);
    setGameState("notstarted");
  }

  useEffect(() => {
    if (gameState !== "failed") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        restartGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  return (
    <Modal
      isOpen={gameState === "failed"}
      onClose={() => { }}
      modalClassName="text-white text-center cursor-pointer w-full py-13 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_10%,rgba(0,0,0,0.7)_20%,rgba(0,0,0,0.7)_80%,rgba(0,0,0,0)_90%,rgba(0,0,0,0)_100%)] animate-[fadeIn_2s_ease-out_forwards]"
      backdropClassName="bg-black/60 cursor-pointer"
      onClick={() => restartGame()}
    >
      <h1 className={"text-[4.5rem] text-red-500/60 leading-none " + font.className}>YOU FAILED</h1>

      <p className="text-md leading-relaxed font-bold text-white/70">
        Failed when paint is {dryProgress.toFixed(1)}% dry, wasted {timeElapsed} seconds.
      </p>

      <small className="text-white/50">
        (Press anywhere or <kbd className="bg-white/30 p-0.5 rounded-md">Space</kbd> to restart)
      </small>
    </Modal>
  )
}