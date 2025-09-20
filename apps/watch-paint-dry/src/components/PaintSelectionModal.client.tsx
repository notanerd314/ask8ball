"use client";

import { Modal } from "@notanerd/components";
import { usePaintDry } from "./PaintDryContext.client";
import { PaintTypes } from "./PaintDryContext.client";

export function PaintTypeOption({ paintType }: { paintType: string }) {
  const { setPaintType, setGameState, randomizeTotalSeconds } = usePaintDry();
  const paintTypeData = PaintTypes[paintType];

  function startGame() {
    setPaintType(paintType);
    randomizeTotalSeconds(paintTypeData.minDuration, paintTypeData.maxDuration);
    setGameState("inprogress");
  }

  return (
    <button
      onClick={startGame}
      className={`
        group flex-1 relative min-w-20 h-52 shadow-xl rounded-3xl overflow-hidden
        transform-gpu transition-all duration-300
        hover:scale-105 hover:rotate-1 hover:shadow-2xl
        active:scale-95 active:-rotate-1
        bg-center bg-cover cursor-pointer
      `}
      style={{ backgroundImage: `url(${paintTypeData.imageUrl})` }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* text */}
      <div className="relative flex flex-col items-center justify-center h-full text-white">
        <h2
          className="text-5xl font-bold"
        >
          {paintTypeData.name}
        </h2>
      </div>
    </button>
  );
}

export default function PaintSelectionModal() {
  const { gameState } = usePaintDry();

  return (
    <Modal
      isOpen={gameState === "paintselection"}
      onClose={() => {}}
      modalClassName={`
        text-white text-center px-5 absolute -translate-1/2 top-1/2 left-1/2 max-w-5xl w-full
        transition-all duration-500 ease-out 
      `}
      backdropClassName="bg-black/70"
    >
      <p className="mb-2 text-6xl font-bold">Choose your paint wisely.</p>
      <p className="mb-8 text-lg opacity-80 italic">
        i won't tell you the details because screw you :)))
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {Object.keys(PaintTypes).map((paintType) => (
          <PaintTypeOption key={paintType} paintType={paintType} />
        ))}
      </div>
    </Modal>
  );
}
