"use client";
import { getRandomInt } from '@/rng';
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useSound } from 'use-sound';

/**
 * Possible states of the game.
 */
type GameState = "notstarted" | "inprogress" | "failed" | "completed";

/**
 * The context for the game state.
 */
const PaintDryContext = createContext<{
  /**
   * The current state of the game.
   */
  gameState: GameState;
  /**
   * Sets the current state of the game.
   * @param value The new state of the game.
   */
  setGameState: (value: GameState) => void;
  /**
   * The current progress of the paint drying.
   */
  dryProgress: number;
  /**
   * Sets the current progress of the paint drying.
   * @param value The new progress of the paint drying.
   */
  setDryProgress: (value: number) => void;
  /**
   * The total number of seconds the paint should take to dry.
   */
  totalSeconds: number;
  /**
   * Sets the total number of seconds the paint should take to dry.
   * @param value The new total number of seconds the paint should take to dry.
   */
  setTotalSeconds: (value: number) => void;
  /**
   * The number of seconds that have elapsed since the game started.
   */
  timeElapsed: number;
  /**
   * Randomizes the total number of seconds the paint should take to dry.
   */
  randomizeTotalSeconds: () => void;
}>({
  gameState: "notstarted",
  setGameState: () => { },
  dryProgress: 0,
  setDryProgress: () => { },
  totalSeconds: 0,
  setTotalSeconds: () => { },
  timeElapsed: 0,
  randomizeTotalSeconds: () => { },
});

/**
 * The provider for the game state context.
 * @param children The children to render.
 */
export const PaintDryProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [gameState, setGameState] = useState<GameState>("notstarted");
  const [dryProgress, setDryProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const [playClockTick] = useSound("/watch-paint-dry/clockticking.mp3", { volume: 0.3, interrupt: false });
  const [playFail] = useSound("/watch-paint-dry/fail.mp3", { volume: 0.3, interrupt: false });
  const [playWin] = useSound("/watch-paint-dry/win.mp3", { volume: 1, interrupt: false });

  /**
   * Randomizes the total number of seconds the paint should take to dry.
   */
  function randomizeTotalSeconds() {
    setTotalSeconds(getRandomInt(60 * 30, 60 * 50));
  }

  const timeElapsed = Math.floor((dryProgress / 100) * totalSeconds);

  /**
   * Clears the progress interval.
   */
  const clearProgressInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  /**
   * Handles the game state change effect: clears the progress interval.
   */
  useEffect(() => {
    clearProgressInterval();

    if (gameState !== "inprogress" || totalSeconds <= 0) return;

    const start = performance.now();
    intervalRef.current = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, (elapsed / (totalSeconds * 1000)) * 100);
      setDryProgress(pct);
      playClockTick();

      if (pct >= 100) {
        clearProgressInterval();
        setGameState("completed");
      }
    }, 1000);

    return clearProgressInterval;
  }, [gameState, totalSeconds]);

  /**
   * Handles the game state change effect: plays sound effects.
   */
  useEffect(() => {
    if (gameState === "failed") {
      playFail();
      clearProgressInterval();
    } else if (gameState === "completed") {
      playWin();
    }
  }, [gameState]);

  /**
   * Handles the game failure event: blurring the window or changing tabs.
   */
  useEffect(() => {
    function handleFailure() {
      setGameState((prev) => (prev === "inprogress" ? "failed" : prev));
    }

    randomizeTotalSeconds();

    window.addEventListener("blur", handleFailure);
    window.addEventListener("visibilitychange", handleFailure);

    return () => {
      window.removeEventListener("blur", handleFailure);
      window.removeEventListener("visibilitychange", handleFailure);
    };
  }, []);

  useEffect(() => {
    if (gameState === "failed") {
      document.title = `You failed! - ${dryProgress.toFixed(1)}%`
    } else if (gameState === "completed") {
      document.title = "You won!"
    } else if (gameState === "inprogress") {
      document.title = `Watch Paint Dry - ${dryProgress.toFixed(1)}%`
    } else {
      document.title = "Watch Paint Dry"
    }
  }, [gameState, dryProgress.toFixed(1)]);

  return (
    <PaintDryContext.Provider
      value={{
        gameState,
        setGameState,
        dryProgress,
        setDryProgress,
        totalSeconds,
        setTotalSeconds,
        timeElapsed,
        randomizeTotalSeconds,
      }}
    >
      {children}
    </PaintDryContext.Provider>
  );
};

/**
 * Hook to get the current game state.
 */
export const usePaintDry = () => useContext(PaintDryContext);

