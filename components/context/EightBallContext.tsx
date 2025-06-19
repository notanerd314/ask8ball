"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

const EightBallContext = createContext<{
  answer: string;
  setAnswer: (answer: string) => void;
  ballCurrentState: BallStateType;
  setBallCurrentState: (state: BallStateType) => void;
  question: string;
  setQuestion: (question: string) => void;
  diceStyle: React.CSSProperties;
  setDiceStyle: (style: React.CSSProperties) => void;
}>({
  answer: '',
  setAnswer: () => {},
  ballCurrentState: 'normal',
  setBallCurrentState: () => {},
  question: '',
  setQuestion: () => {},
  diceStyle: { opacity: "0", transition: "none" },
  setDiceStyle: () => {},
});

export type BallStateType = "normal" | "shaking" | "result" | "error";

type GlobalProviderProps = {
  children: ReactNode;
};

export const EightBallProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [answer, setAnswer] = useState("[No answer]");
  const [question, setQuestion] = useState("[No question]");
  const [ballCurrentState, setBallCurrentState] = useState<BallStateType>("normal");
  const [diceStyle, setDiceStyle] = useState<React.CSSProperties>({ opacity: "0", transition: "none" });
  
  return (
    <EightBallContext.Provider value={{ ballCurrentState, setBallCurrentState, question, setQuestion, answer, setAnswer, diceStyle, setDiceStyle }}>
      {children}
    </EightBallContext.Provider>
  );
};

export const useEightBall = () => useContext(EightBallContext);
