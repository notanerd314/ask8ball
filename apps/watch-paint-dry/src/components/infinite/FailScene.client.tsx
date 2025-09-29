"use client";

import { Modal } from "@notanerd/components";
import { useInfinitePaintDry } from "./InfinitePaintDryContext.client";

import { Cinzel } from "next/font/google";

const font = Cinzel({ subsets: ["latin"], display: "swap", weight: "500" });

export default function FailScene() {
  const { gameState, timeElapsed, setTimeElapsed, setGameState } = useInfinitePaintDry();

  function restartGame() {
    setTimeElapsed(0);
    setGameState("notstarted");
  }

  return (
    <Modal
      isOpen={gameState === "failed"}
      onClose={() => { }}
      modalClassName="text-white z-50 text-center w-full absolute -translate-1/2 top-1/2 left-1/2"
      backdropClassName="bg-black/60 cursor-pointer backdrop-blur-sm"
      onClick={() => restartGame()}
    >
      <h1 className={"sm:text-[5rem] text-[3.5rem] text-red-500/60 leading-none py-9 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_10%,rgba(0,0,0,0.7)_20%,rgba(0,0,0,0.7)_80%,rgba(0,0,0,0)_90%,rgba(0,0,0,0)_100%)] animate-[fadeIn_2s_ease-out_forwards] " + font.className}>THAT SUCKS</h1>

      <p className="font-bold leading-relaxed text-xl text-white/70">
        You survive for {timeElapsed} seconds.
      </p>

      <small className="text-white/50 text-sm">
        (Press anywhere to restart)
      </small>
    </Modal>
  )
}