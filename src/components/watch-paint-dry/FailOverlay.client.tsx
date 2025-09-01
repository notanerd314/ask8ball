"use client";

import { Modal } from "../Modal";
import { useEffect } from "react";
import { usePaintDry } from "./PaintDryContext.client";

import { Cinzel } from "next/font/google";

const font = Cinzel({ subsets: ["latin"], display: "swap", weight: "500" });

function generateShareableText(timeElapsed: number) {
  return `I lost the Paint Drying Challenge and wasted ${timeElapsed} seconds. Can YOUR patience win this? Try it out: https://example.com`;
}

export default function FailOverlay() {
  const { gameState, dryProgress, timeElapsed, setGameState, randomizeTotalSeconds, setDryProgress } = usePaintDry();

  function restartGame() {
    randomizeTotalSeconds();
    setDryProgress(0);
    setGameState("notstarted");
  }

  function copyToClipboard() {
    const text = generateShareableText(timeElapsed);
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
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
      modalClassName="text-white text-center w-full py-16 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_10%,rgba(0,0,0,0.7)_20%,rgba(0,0,0,0.7)_80%,rgba(0,0,0,0)_90%,rgba(0,0,0,0)_100%)] animate-[fadeIn_2s_ease-out_forwards]"
      backdropClassName="bg-black/60 cursor-pointer"
      onClick={() => restartGame()}
    >
      <h1 className={"text-[4rem] text-red-500/60 leading-none " + font.className}>YOU FAILED</h1>

      <p className="text-md leading-relaxed font-bold text-white/70">
        Failed when paint is {dryProgress.toFixed(1)}% dry, wasted {timeElapsed} seconds.
      </p>

      <div className="flex gap-3 mt-4 justify-center text-md">
        <button onClick={copyToClipboard} className="bg-yellow-400 rounded-2xl px-3 py-2 cursor-pointer font-bold transition-all hover:bg-yellow-500 hover:scale-105">
          Copy and share!
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(generateShareableText(timeElapsed))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-400 rounded-2xl px-3 py-2 cursor-pointer font-bold transition-all hover:bg-blue-500 hover:scale-105"
        >
          Tweet your failure!
        </a>
      </div>

      <small className="text-white/50">
        (Press anywhere or <kbd className="bg-white/30 p-0.5 rounded-md">Space</kbd> to restart)
      </small>
    </Modal>
  )
}