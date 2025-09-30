"use client";

import { createContext, useCallback, useContext, useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '@notanerd/hooks';
import useSound from 'use-sound';
import { useVolume } from '../VolumeContext';

/**
 * Possible states of the game.
 */
type GameState = "notstarted" | "inprogress" | "failed";

/**
 * The context for the game state.
 */
const InfinitePaintDryContext = createContext<{
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
   * The number of seconds that have elapsed since the game started.
   */
  timeElapsed: number;
  /**
   * Sets the number of seconds that have elapsed since the game started.
   */
  setTimeElapsed: (value: number) => void;
  /**
   * The current highscore of the game.
   */
  highscore: number | undefined;
  /**
   * Sets the current highscore of the game.
   * @param value The new highscore of the game.
   */
  setHighscore: (value: number) => void;
}>({
  gameState: "notstarted",
  setGameState: () => { },
  timeElapsed: 0,
  setTimeElapsed: () => { },
  highscore: 0,
  setHighscore: () => { },
});

/**
 * The provider for the game state context.
 * @param children The children to render.
 */
export const InfinitePaintDryProvider = ({ children }: { children: React.ReactNode }) => {
  const { volume } = useVolume();
  const [gameState, setGameState] = useState<GameState>("notstarted");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [highscore, setHighscore] = useLocalStorage("highscore", 0);
  const intervalRef = useRef<number | null>(null);

  const safeVolume = typeof volume === "number" && isFinite(volume) ? volume : 1;

  const [playClockTick] = useSound("/clockticking.mp3", { volume: 0.3 * safeVolume, interrupt: false });
  const [playFail] = useSound("/fail.mp3", { volume: 0.3 * safeVolume, interrupt: true });


  /**
   * Clears the progress interval.
   */
  const clearProgressInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * Handles the game state change effect: clears the progress interval.
   */
  useEffect(() => {
    clearProgressInterval();
    if (gameState !== "inprogress") return;

    intervalRef.current = window.setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
      playClockTick();
    }, 1000);

    return clearProgressInterval;
  }, [gameState]);

  /**
   * Handles the game state change effect: plays sound effects.
   */
  useEffect(() => {
    if (gameState === "failed") {
      playFail();
      clearProgressInterval();

      if (timeElapsed > highscore!) {
        setHighscore(timeElapsed);
      }
    }
  }, [gameState]);

  /**
   * Handles the game failure event: blurring the window or changing tabs.
   */
  useEffect(() => {
    function handleFailure() {
      setGameState((prev) => (prev === "inprogress" ? "failed" : prev));
    }

    window.addEventListener("blur", handleFailure);
    window.addEventListener("visibilitychange", handleFailure);

    return () => {
      window.removeEventListener("blur", handleFailure);
      window.removeEventListener("visibilitychange", handleFailure);
    };
  }, []);

  useEffect(() => {
    if (gameState === "failed") {
      document.title = `You failed at ${timeElapsed} seconds!`;
    } else {
      document.title = "[INFINITE] Watch Paint Dry"
    }
  }, [gameState]);

  return (
    <InfinitePaintDryContext.Provider
      value={{
        gameState,
        setGameState,
        timeElapsed,
        setTimeElapsed,
        highscore,
        setHighscore
      }}
    >
      {children}
    </InfinitePaintDryContext.Provider>
  );
};

/**
 * Hook to get the current game state.
 */
export const useInfinitePaintDry = () => useContext(InfinitePaintDryContext);

