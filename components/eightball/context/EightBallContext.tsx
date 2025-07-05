"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { PersonalityConfig } from '../../../lib/prompts';
import { BallStateType, EightBallContextType } from '../types';
import { INITIAL_DICE_STYLE } from '../constants';

const EightBallContext = createContext<EightBallContextType>({
  answer: '',
  setAnswer: () => { },
  ballCurrentState: 'normal',
  setBallCurrentState: () => { },
  question: '',
  setQuestion: () => { },
  diceStyle: INITIAL_DICE_STYLE,
  setDiceStyle: () => { },
  currentPersonality: {
    linkname: "default",
    name: "Default",
    prompt: "",
    description: "",
    examples: [],
    theme: { icon: "", accentColor: "", cssBackground: "", tailwindHoverClass: "" }
  },
  setCurrentPersonality: () => { },
});

type EightBallProviderProps = {
  children: ReactNode;
  personalityData: PersonalityConfig;
};

export const EightBallProvider: React.FC<EightBallProviderProps> = ({ 
  children, 
  personalityData 
}) => {
  const [answer, setAnswer] = useState("[No answer]");
  const [question, setQuestion] = useState("[No question]");
  const [ballCurrentState, setBallCurrentState] = useState<BallStateType>("normal");
  const [diceStyle, setDiceStyle] = useState<React.CSSProperties>(INITIAL_DICE_STYLE);
  const [currentPersonality, setCurrentPersonality] = useState(personalityData);

  const contextValue: EightBallContextType = {
    ballCurrentState,
    setBallCurrentState,
    question,
    setQuestion,
    answer,
    setAnswer,
    diceStyle,
    setDiceStyle,
    currentPersonality,
    setCurrentPersonality
  };

  return (
    <EightBallContext.Provider value={contextValue}>
      {children}
    </EightBallContext.Provider>
  );
};

export const useEightBall = () => {
  const context = useContext(EightBallContext);
  if (!context) {
    throw new Error('useEightBall must be used within an EightBallProvider');
  }
  return context;
};