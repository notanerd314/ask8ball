"use client";

import { useEffect } from "react";
import { Modal } from "../Modal";
import { usePaintDry } from "./PaintDryContext.client";
import { confetti } from "@tsparticles/confetti";
import { getRandomInt } from "../../rng";

function generateShareableText(timeElapsed: number) {
  return `I beat the Paint Drying Challenge by doing NOTHING for ${(timeElapsed / 60).toFixed(0)} minutes. Test your patience here: https://example.com`;
}

export default function WinOverlay() {
  const { gameState, timeElapsed } = usePaintDry();

  function copyToClipboard() {
    const text = generateShareableText(timeElapsed);
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  }

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
      modalClassName="max-w-2xl text-white text-center"
      backdropClassName="bg-black/70"
    >
      <img
        src="/watch-paint-dry/trophy.png"
        alt="Trophy"
        className="mx-auto w-40 mb-4"
      />

      <h1 className="text-5xl font-extrabold text-yellow-400 drop-shadow-lg animate-pulse">
        You win!
      </h1>

      <p className="mt-4 text-lg leading-relaxed">
        Congratulations! You have done{" "}
        <strong className="text-yellow-300">ABSOLUTELY</strong> nothing!
      </p>

      <p className="mt-4 text-lg leading-relaxed italic text-white/80">
        You sat for {timeElapsed} seconds.
      </p>

      <div className="flex gap-3 mt-4 justify-center">
        <button onClick={copyToClipboard} className="bg-yellow-400 rounded-2xl px-3 py-2 cursor-pointer font-bold transition-all hover:bg-yellow-500 hover:scale-105">
          Copy and share!
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(generateShareableText(timeElapsed))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-400 rounded-2xl px-3 py-2 cursor-pointer font-bold transition-all hover:bg-blue-500 hover:scale-105"
        >
          Tweet it out!
        </a>
      </div>

    </Modal>
  );
}
