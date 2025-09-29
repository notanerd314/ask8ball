"use client";

import { Modal } from "@notanerd/components";
import { useInfinitePaintDry } from "./InfinitePaintDryContext.client";
import Image from "next/image";

export default function IntroductionScene() {
  const { gameState, setGameState } = useInfinitePaintDry();


  function startGame() {
    setGameState("inprogress");
  };

  return (
    <Modal
      isOpen={gameState === "notstarted"}
      onClose={() => { }}
      modalClassName={`
        max-w-4xl z-50 w-full text-white text-center cursor-pointer px-5 absolute -translate-1/2 top-1/2 left-1/2
      `}
      backdropClassName="bg-black/70 cursor-pointer backdrop-blur-sm"
      onClick={startGame}
    >
      <Image src="/favicon.png" alt="Logo" className="mx-auto w-50" width={500} height={500} />
      <h1 className="text-5xl font-bold">Watch Paint Dry</h1>

      <p className="mt-4 text-xl leading-relaxed">
        Your goal is to do nothing but wait until the paint is fully dry.
      </p>
      <p className="text-xl leading-relaxed text-red-300">
        <strong>
          Leaving the page or putting your device to sleep will result in failure.
        </strong>
      </p>

      <small className="text-white/50 text-md">
        (Click anywhere to continue)
      </small>
    </Modal>
  );
}
