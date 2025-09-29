"use client";

import { Modal } from "@notanerd/components";
import { usePaintDry } from "./PaintDryContext.client";
import Image from "next/image";

export default function IntroductionModal() {
  const { gameState, setGameState, randomizeTotalSeconds } = usePaintDry();

  function startGame() {
    randomizeTotalSeconds(60 * 20, 60 * 60);
    setGameState("inprogress");
  }

  return (
    <Modal
      isOpen={gameState === "notstarted"}
      onClose={() => {}}
      modalClassName={`
        max-w-4xl z-50 w-full text-white text-center px-5 absolute -translate-1/2 top-1/2 left-1/2
      `}
      backdropClassName="bg-black/70 backdrop-blur-sm"
    >
      <Image src="/logo.webp" alt="Logo" className="mx-auto w-220" width={1734} height={372} />
      
      <h2 className="font-bold text-3xl">Rules:</h2>
      <p className="mt-4 text-xl leading-relaxed">
        Your goal is to do nothing but wait until the paint is fully dry.
      </p>
      <p className="text-red-300 text-xl leading-relaxed">
        <strong>
          Leaving the page or putting your device to sleep will result in failure.
        </strong>
      </p>

      <button
        className="bg-green-500 mt-12 px-16 py-4 border-3 border-green-600 rounded-2xl font-bold text-5xl hover:rotate-3 active:-rotate-2 hover:scale-110 active:scale-95 transition-all cursor-pointer"
        type="button"
        disabled={gameState !== "notstarted"}
        style={{
          textShadow: "3px 3px 0px #000000",
        }}
        onClick={startGame}
      >
        START!
      </button>
    </Modal>
  );
}
