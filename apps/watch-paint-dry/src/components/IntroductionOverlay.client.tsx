"use client";

import { Modal } from "@notanerd/components";
import { useEffect } from "react";
import { usePaintDry } from "./PaintDryContext.client";

export default function IntroductionOverlay() {
  const { gameState, setGameState, totalSeconds } = usePaintDry();

  function startGame() {
    if (totalSeconds === 0) return;
    setGameState("inprogress");
  }

  useEffect(() => {
    if (gameState !== "notstarted") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        startGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  return (
    <Modal
      isOpen={gameState === "notstarted"}
      onClose={() => { }}
      modalClassName="max-w-2xl text-white text-center cursor-pointer px-5 absolute -translate-1/2 top-1/2 left-1/2"
      backdropClassName="bg-black/70 cursor-pointer"
      onClick={() => startGame()}
    >
      <img
        src="/favicon.png"
        alt="Logo"
        className="mx-auto w-40"
      />
      <h1 className="text-4xl font-bold">Watch Paint Dry</h1>

      <p className="mt-4 text-lg leading-relaxed">
        Your goal is to do nothing but wait until the paint is fully dry.
      </p>
      <p className="text-lg leading-relaxed text-red-300">
        <strong>
          Leaving the page or putting your device to sleep will result in failure.
        </strong>
      </p>
      <p className="text-2xl mt-5">
        <strong>Good luck.</strong>
      </p>

      <small className="text-white/50 text-sm">
        (Press anywhere or <kbd className="bg-white/30 p-0.5 rounded-md">Space</kbd> to start)
      </small>
    </Modal>
  )
}