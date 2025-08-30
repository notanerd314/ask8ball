"use client";

import { Modal } from "../Modal";
import { usePaintDry } from "./PaintDryContext.client";

export default function WinOverlay() {
  const { gameState } = usePaintDry();

  return (
    <Modal
      isOpen={gameState === "completed"}
      onClose={() => {}}
      modalClassName="max-w-2xl text-white text-center cursor-pointer"
      backdropClassName="bg-black/70 cursor-pointer"
    >
      <h1 className="text-5xl font-bold text-yellow-400">You win!</h1>

      <p className="mt-4 text-lg leading-relaxed">
        Congratulations! You have done ABSOLUTELY nothing!
      </p>

      <p className="mt-4 text-lg leading-relaxed">
        Share your achievement below
      </p>
    </Modal>
  )
}