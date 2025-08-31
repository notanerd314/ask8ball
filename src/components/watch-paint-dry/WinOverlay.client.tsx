"use client";

import { Modal } from "../Modal";
import { usePaintDry } from "./PaintDryContext.client";

export default function WinOverlay() {
  const { gameState, timeElapsed } = usePaintDry();

  return (
    <Modal
      isOpen={gameState === "completed"}
      onClose={() => {}}
      modalClassName="max-w-2xl text-white text-center cursor-pointer"
      backdropClassName="bg-black/70 cursor-pointer"
    >
      <img
        src="/watch-paint-dry/trophy.png"
        alt="Logo"
        className="mx-auto w-40 mb-4"
      />

      <h1 className="text-5xl font-bold text-yellow-400">You win!</h1>

      <p className="mt-4 text-lg leading-relaxed">
        Congratulations! You have done <strong>ABSOLUTELY</strong> nothing!
      </p>

      <p className="mt-4 text-lg leading-relaxed">
        You sat for {timeElapsed} seconds.
      </p>
    </Modal>
  )
}