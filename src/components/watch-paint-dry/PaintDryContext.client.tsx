"use client";
import { getRandomInt } from '@/rng';
import { createContext, useContext, useState, useEffect } from 'react';

type GameState = "notstarted" | "inprogress" | "failed" | "completed";

const PaintDryContext = createContext({
  gameState: "notstarted" as GameState,
  setGameState: (value: GameState) => { },
  dryProgress: 0,
  setDryProgress: (value: number) => { },
  totalSeconds: 0,
  setTotalSeconds: (value: number) => { }
});

export const PaintDryProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [gameState, setGameState] = useState<GameState>("notstarted");
  const [dryProgress, setDryProgress] = useState(0);

  useEffect(() => {
    setTotalSeconds(getRandomInt(5, 10));
  }, []);

  useEffect(() => {
    if (gameState !== "inprogress") return;
    if (totalSeconds === 0) return;

    const intervalMs = (totalSeconds * 1000) / 1000;
    console.log(intervalMs);

    const interval = setInterval(() => {
      setDryProgress((p) => {
        if (p >= 100) {
          console.log("Paint dry");
          clearInterval(interval);
          setGameState("completed");

          return p;
        }
        return p + 0.1;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    function handleFailure() {
      if (gameState === "inprogress") setGameState("failed");
    }

    window.addEventListener("blur", handleFailure);
    window.addEventListener("visibilitychange", handleFailure);

    return () => {
      window.removeEventListener("blur", handleFailure);
      window.removeEventListener("visibilitychange", handleFailure);
    };
  }, [gameState]);

  return (
    <PaintDryContext.Provider value={{ gameState, setGameState, dryProgress, setDryProgress, totalSeconds, setTotalSeconds }}>
      {children}
    </PaintDryContext.Provider>
  );
}

export const usePaintDry = () => useContext(PaintDryContext);