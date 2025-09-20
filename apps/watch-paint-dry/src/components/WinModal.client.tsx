"use client";

import { useEffect } from "react";
import { Modal } from "@notanerd/components";
import { usePaintDry } from "./PaintDryContext.client";
import { confetti } from "@tsparticles/confetti";
import { getRandomInt } from "@notanerd/rng";


export default function WinModal() {
  const { gameState, timeElapsed } = usePaintDry();

  useEffect(() => {
    if (gameState !== "completed") return;

    confetti({
      particleCount: getRandomInt(600, 700),
      startVelocity: getRandomInt(50, 60),
      spread: 360,
      origin: {
        x: 0.5,
        y: 0.5,
      },
    });
  }, [gameState]);

  return (
    <Modal
      isOpen={gameState === "completed"}
      onClose={() => { }}
      modalClassName="max-w-2xl text-white text-center absolute -translate-1/2 top-1/2 left-1/2"
      backdropClassName="bg-black/70"
    >
      <img
        src="/trophy.png"
        alt="Trophy"
        className="w-40 mx-auto mb-4"
      />

      <h1 className="text-6xl font-extrabold text-yellow-400 drop-shadow-lg animate-pulse">
        You win!
      </h1>

      <p className="mt-4 text-2xl leading-relaxed">
        Congratulations! You have done{" "}
        <strong className="text-yellow-300">ABSOLUTELY</strong> nothing!
      </p>

      <p className="mt-4 text-lg italic leading-relaxed text-white/80">
        You sat for {timeElapsed} seconds.
      </p>
    </Modal>
  );
}
