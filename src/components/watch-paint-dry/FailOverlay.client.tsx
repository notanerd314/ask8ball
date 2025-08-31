"use client";

import { Modal } from "../Modal";
import { usePaintDry } from "./PaintDryContext.client";

export default function FailOverlay() {
  const { gameState, dryProgress, timeElapsed } = usePaintDry();

  return (
    <Modal
      isOpen={gameState === "failed"}
      onClose={() => { }}
      modalClassName="max-w-2xl text-white text-center cursor-pointer"
      backdropClassName="bg-black/70 cursor-pointer"
      onClick={() => window.location.reload()}
    >
      <img
        src="/images/watch-paint-dry/taketheL.png"
        alt="Logo"
        className="mx-auto w-40 mb-5"
      />
      <h1 className="text-5xl font-bold text-red-400">You had ONE job.</h1>

      <p className="mt-4 text-lg leading-relaxed">
        You put your device to sleep or left the page.
      </p>

      <p className="text-lg leading-relaxed font-bold">
        Failed when paint is {dryProgress.toFixed(0)}% dry, wasted {timeElapsed} seconds.
      </p>

      <small className="text-white/50">
        (Press anywhere to restart)
      </small>
    </Modal>
  )
}