"use client";
import { getRandomInt } from '@/rng';
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useSound } from 'use-sound';

type GameState = "notstarted" | "inprogress" | "failed" | "completed";

const PaintDryContext = createContext({
  gameState: "notstarted" as GameState,
  setGameState: (value: GameState) => { },
  dryProgress: 0,
  setDryProgress: (value: number) => { },
  totalSeconds: 0,
  setTotalSeconds: (value: number) => { },
  timeElapsed: 0,
  setTimeElapsed: (value: number) => { },
});

export const PaintDryProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameState, setGameState] = useState<GameState>("notstarted");
  const [dryProgress, setDryProgress] = useState(0);

  const [playClockTick] = useSound("/watch-paint-dry/clockticking.mp3", { volume: 1, interrupt: false });

  useEffect(() => {
    if (gameState !== "inprogress") return;
    if (totalSeconds === 0) return;

    const intervalMs = (totalSeconds * 1000) / 1000;

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
    if (gameState !== "inprogress") return;
    if (totalSeconds === 0) return;

    const interval = setInterval(() => {
      setTimeElapsed((p) => p + 1);
      playClockTick();
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    function handleFailure() {
      setGameState((prev) => (prev === "inprogress" ? "failed" : prev));
    }
    
    setTotalSeconds(getRandomInt(60 * 30, 60 * 45));

    window.addEventListener("blur", handleFailure);
    window.addEventListener("visibilitychange", handleFailure);

    return () => {
      window.removeEventListener("blur", handleFailure);
      window.removeEventListener("visibilitychange", handleFailure);
    };
  }, []);

  return (
    <PaintDryContext.Provider value={{ gameState, setGameState, dryProgress, setDryProgress, totalSeconds, setTotalSeconds, timeElapsed, setTimeElapsed }}>
      {children}
    </PaintDryContext.Provider>
  );
}

export const usePaintDry = () => useContext(PaintDryContext);