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

  const [playClockTick] = useSound("/watch-paint-dry/clockticking.mp3", { volume: 0.3, interrupt: false });
  const [playFail] = useSound("/watch-paint-dry/fail.mp3", { volume: 0.3, interrupt: false });
  const [playWin] = useSound("/watch-paint-dry/win.mp3", { volume: 1, interrupt: false });

  useEffect(() => {
    if (gameState !== "inprogress" || totalSeconds <= 0) return;

    const totalMs = totalSeconds * 1000;
    const start = performance.now();

    const id = setInterval(() => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, (elapsed / totalMs) * 100);
      setDryProgress(pct);

      if (pct >= 100) {
        clearInterval(id);
        console.log("Paint dry");
        setGameState("completed");
      }
    }, 1000); // update every second, since you don’t care about smoothness

    return () => clearInterval(id);
  }, [gameState, totalSeconds]);


  useEffect(() => {
    if (gameState === "failed") {
      playFail();
      return;
    } else if (gameState === "completed") {
      playWin();
      return;
    } else if (gameState !== "inprogress") return;
    if (totalSeconds === 0) return;

    const interval = setInterval(() => {
      setTimeElapsed((p) => p + 1);
      playClockTick();
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, totalSeconds]);

  useEffect(() => {
    function handleFailure() {
      setGameState((prev) => (prev === "inprogress" ? "failed" : prev));
    }

    setTotalSeconds(getRandomInt(60 * 30, 60 * 50));

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