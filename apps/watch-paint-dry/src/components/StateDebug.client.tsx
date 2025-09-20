"use client";

import { usePaintDry } from "./PaintDryContext.client";

export default function StateDebug() {
  const { 
    gameState, 
    dryProgress, 
    timeElapsed, 
    totalSeconds,
    setGameState // assuming you exposed this in context
  } = usePaintDry();

  const remaining = Math.max(0, totalSeconds - timeElapsed);

  return (
    <div className="fixed p-3 text-sm text-white shadow-lg bottom-6 right-6 z-100 bg-black/70 rounded-2xl space-y-1" draggable={true}>
      <p className="text-lg font-bold">DEBUG</p>
      
      <p className="px-2 bg-green-600 rounded-full">
        State: {gameState}
      </p>

      <p className="px-2 bg-yellow-600 rounded-full">
        Progress: {dryProgress}%
      </p>

      <p className="px-2 rounded-full bg-black/40">
        Time Elapsed: {timeElapsed}s
      </p>

      <p className="px-2 rounded-full bg-black/40">
        Remaining: {remaining}s
      </p>

      <p className="px-2 rounded-full bg-black/40">
        Total Seconds: {totalSeconds}
      </p>

      {/* Dev controls */}
      <div className="flex pt-2 space-x-2">
        <button 
          onClick={() => setGameState("notstarted")}
          className="px-2 py-1 text-xs bg-blue-600 rounded"
        >
          Reset
        </button>
        <button 
          onClick={() => setGameState("failed")}
          className="px-2 py-1 text-xs bg-red-600 rounded"
        >
          Fail
        </button>
        <button 
          onClick={() => setGameState("completed")}
          className="px-2 py-1 text-xs bg-green-600 rounded"
        >
          Complete
        </button>
      </div>
    </div>
  );
}
