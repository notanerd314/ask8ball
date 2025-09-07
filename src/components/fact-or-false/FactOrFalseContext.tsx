"use client";
import { createContext, useContext, useState, useEffect } from 'react';

interface Fact {
  statement: string;
  isTrue: boolean;
}

type GameState = "loading" | "playing" | "wrong" | "correct";

const FactOrFalseContext = createContext<{
  fact: Fact | null;
  setFact: (fact: Fact) => void;
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
  switchToNextFact: () => Promise<void>;
  checkAnswer: (isTrue: boolean) => void;
}>({
  fact: null,
  setFact: () => {},
  gameState: "loading",
  setGameState: () => {},
  switchToNextFact: async () => {},
  checkAnswer: () => {}
})

export const FactOrFalseProvider = ({ children }: { children: React.ReactNode }) => {
  const [fact, setFact] = useState<Fact | null>(null);
  const [gameState, setGameState] = useState<GameState>("loading");

  async function switchToNextFact() {
    setFact(null);
    setGameState("loading");
    
    const response = await fetch('/fact-or-false/api/get-fact');
    const data = await response.json();
  
    setFact(data);
    setGameState("playing");
  }

  function checkAnswer(isTrue: boolean) {
    if (isTrue === fact?.isTrue) {
      setGameState("correct");
    } else {
      setGameState("wrong");
    }
  }

  useEffect(() => {
    switchToNextFact();
  }, [])

  return (
    <FactOrFalseContext.Provider value={{ fact, setFact, gameState, setGameState, switchToNextFact, checkAnswer }}>
      {children}
    </FactOrFalseContext.Provider>
  )
}

export const useFactOrFalse = () => {
  return useContext(FactOrFalseContext);
}