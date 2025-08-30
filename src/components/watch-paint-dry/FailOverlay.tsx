"use client";

import { Modal } from "../Modal";
import { usePaintDry } from "./PaintDryContext.client";

export default function FailOverlay() {
  const { gameState } = usePaintDry();

  return (
    <Modal
      isOpen={gameState === "failed"}
      onClose={() => {}}
      modalClassName="max-w-2xl text-white text-center cursor-pointer"
      backdropClassName="bg-black/70 cursor-pointer"
      onClick={() => window.location.reload()}
    >
      <h1 className="text-5xl font-bold text-red-400">You lost!</h1>

      <p className="mt-4 text-lg leading-relaxed">
        You put your device to sleep or left the page.
      </p>

      <small className="text-white/50">
        (Press anywhere to restart)
      </small>
    </Modal>
  )
}