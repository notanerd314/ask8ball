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
    <div className="fixed bottom-6 right-6 z-100 bg-black/70 p-3 rounded-2xl text-sm space-y-1 text-white shadow-lg" draggable={true}>
      <p className="text-lg font-bold">DEBUG</p>
      
      <p className="px-2 rounded-full bg-green-600">
        State: {gameState}
      </p>

      <p className="px-2 rounded-full bg-yellow-600">
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
      <div className="flex space-x-2 pt-2">
        <button 
          onClick={() => setGameState("notstarted")}
          className="bg-blue-600 px-2 py-1 rounded text-xs"
        >
          Reset
        </button>
        <button 
          onClick={() => setGameState("failed")}
          className="bg-red-600 px-2 py-1 rounded text-xs"
        >
          Fail
        </button>
        <button 
          onClick={() => setGameState("completed")}
          className="bg-green-600 px-2 py-1 rounded text-xs"
        >
          Complete
        </button>
      </div>
    </div>
  );
}
