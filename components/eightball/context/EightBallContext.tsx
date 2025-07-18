"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { PersonalityConfig } from '../../../lib/prompts';
import { BallStateType, EightBallContextType, APIResponse } from '../../../lib/types/eightball';
import { INITIAL_DICE_STYLE } from '../../../lib/constants/eightball';

const EightBallContext = createContext<EightBallContextType>({
  currentResponse: {
    question: "",
    response: "",
    responseType: "",
    isSafe: false,
    violatedCategories: [],
    personality: "",
    createdAt: new Date()
  },
  setCurrentResponse: () => { },
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
    theme: { icon: "", accentColor: "", cssBackground: "" }
  },
  setCurrentPersonality: () => { },
  shareImageLink: '',
  setShareImageLink: () => { }
});

type EightBallProviderProps = {
  children: ReactNode;
  personalityData: PersonalityConfig;
};

/** 
 * Context provider for eight ball state management
 * @param children - Child components
 * @param personalityData - Initial personality configuration
 * @returns JSX element providing eight ball context
 */
export const EightBallProvider: React.FC<EightBallProviderProps> = ({ 
  children, 
  personalityData 
}) => {
  const [question, setQuestion] = useState("[No question]");
  const [currentResponse, setCurrentResponse] = useState<APIResponse>({
    question: "",
    response: "",
    responseType: "",
    isSafe: false,
    violatedCategories: [],
    personality: "",
    createdAt: new Date()
  });
  const [ballCurrentState, setBallCurrentState] = useState<BallStateType>("normal");
  const [diceStyle, setDiceStyle] = useState<React.CSSProperties>(INITIAL_DICE_STYLE);
  const [currentPersonality, setCurrentPersonality] = useState(personalityData);
  const [shareImageLink, setShareImageLink] = useState<string>("");

  const contextValue: EightBallContextType = {
    ballCurrentState,
    setBallCurrentState,
    question,
    setQuestion,
    currentResponse,
    setCurrentResponse,
    diceStyle,
    setDiceStyle,
    currentPersonality,
    setCurrentPersonality,
    shareImageLink,
    setShareImageLink
  };

  return (
    <EightBallContext.Provider value={contextValue}>
      {children}
    </EightBallContext.Provider>
  );
};

/** 
 * Hook to access eight ball context
 * @returns Eight ball context value with state and setters
 * @throws Error if used outside EightBallProvider
 */
export const useEightBall = () => {
  const context = useContext(EightBallContext);
  if (!context) {
    throw new Error('useEightBall must be used within an EightBallProvider');
  }
  return context;
};