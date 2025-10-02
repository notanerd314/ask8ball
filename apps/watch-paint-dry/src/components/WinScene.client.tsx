"use client";

import { useEffect } from "react";
import { Modal } from "@notanerd/components";
import { usePaintDry } from "./PaintDryContext.client";
import { confetti } from "@tsparticles/confetti";
import { getRandomInt } from "@notanerd/rng";


export default function WinScene() {
  const { gameState, timeElapsed, restartGame } = usePaintDry();

  useEffect(() => {
    if (gameState !== "completed") return;
 
  }, [gameState]);

  return (
    <Modal
      isOpen={gameState === "completed"}
      onClose={() => { }}
      modalClassName="max-w-4xl w-full px-5 text-white cursor-pointer text-center absolute -translate-1/2 top-1/2 left-1/2"
      backdropClassName="bg-black/70 backdrop-blur-sm cursor-pointer"
      onClick={restartGame}
    >
      <img
        src="/trophy.webp"
        alt="Trophy"
        className="mx-auto mb-4 w-40"
      />

      <h1 className="drop-shadow-lg font-extrabold text-yellow-400 text-6xl animate-pulse">
        You win!
      </h1>

      <p className="mt-4 text-2xl leading-relaxed">
        Congratulations! you've reached peak productivity of <strong>ABSOLUTELY</strong> nothing!
      </p>

      <p className="mt-4 font-bold text-white/80 text-2xl italic leading-relaxed rainbow-text">
        You completed the challenge in {timeElapsed} seconds.
      </p>
      
      <small className="text-white/50 text-lg">
        (Press anywhere to play again)
      </small>
    </Modal>
  );
}
