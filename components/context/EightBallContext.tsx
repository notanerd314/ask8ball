"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { PersonalityConfig } from '../../lib/prompts';

const EightBallContext = createContext<{
  answer: string;
  setAnswer: (answer: string) => void;
  ballCurrentState: BallStateType;
  setBallCurrentState: (state: BallStateType) => void;
  question: string;
  setQuestion: (question: string) => void;
  diceStyle: React.CSSProperties;
  setDiceStyle: (style: React.CSSProperties) => void;
  currentPersonality: PersonalityConfig;
  setCurrentPersonality: (personality: PersonalityConfig) => void;
}>({
  answer: '',
  setAnswer: () => { },
  ballCurrentState: 'normal',
  setBallCurrentState: () => { },
  question: '',
  setQuestion: () => { },
  diceStyle: { opacity: "0", transition: "none" },
  setDiceStyle: () => { },
  currentPersonality: {
    linkname: "default",
    name: "Default",
    prompt: "",
    description: "",
    examples: [],
    theme: { icon: "", background: "", hoverBackground: "" }
  },
  setCurrentPersonality: () => { },
});

export type BallStateType = "normal" | "shaking" | "result" | "error";

type GlobalProviderProps = {
  children: ReactNode;
  personalityData: PersonalityConfig;
};

export const EightBallProvider: React.FC<GlobalProviderProps> = ({ children, personalityData }) => {
  const [answer, setAnswer] = useState("[No answer]");
  const [question, setQuestion] = useState("[No question]");
  const [ballCurrentState, setBallCurrentState] = useState<BallStateType>("normal");
  const [diceStyle, setDiceStyle] = useState<React.CSSProperties>({ opacity: "0", transition: "none" });
  const [currentPersonality, setCurrentPersonality] = useState(personalityData);

  return (
    <EightBallContext.Provider value={{ ballCurrentState, setBallCurrentState, question, setQuestion, answer, setAnswer, diceStyle, setDiceStyle, currentPersonality, setCurrentPersonality }}>
      {children}
    </EightBallContext.Provider>
  );
};

export const useEightBall = () => useContext(EightBallContext);
