import { PersonalityConfig, EightBallState, APIResponse } from '@/utils/eightball/types';
import { createContext, useContext, useState, ReactNode } from 'react';

interface EightBallContextType {
  currentPersonality: PersonalityConfig;
  setCurrentPersonality: (personality: PersonalityConfig) => void;
  currentBallState: EightBallState;
  setCurrentBallState: (state: EightBallState) => void;
  currentResponse: APIResponse;
  setCurrentResponse: (response: APIResponse) => void;
  question: string;
  setQuestion: (question: string) => void;
  diceStyle: React.CSSProperties;
  setDiceStyle: (style: React.CSSProperties) => void;
}

interface EightBallProviderProps {
  children: ReactNode;
  personality: PersonalityConfig;
}

const EightBallContext = createContext<EightBallContextType | undefined>(undefined);

export const EightBallProvider = ({ children, personality }: EightBallProviderProps) => {
  const [currentPersonality, setCurrentPersonality] = useState<PersonalityConfig>(personality);
  const [currentBallState, setCurrentBallState] = useState<EightBallState>(EightBallState.Idle);
  const [currentResponse, setCurrentResponse] = useState<APIResponse>({
    question: "",
    answer: "",
    answerType: "",
    personality: ""
  });
  const [question, setQuestion] = useState("[No question]");
  const [diceStyle, setDiceStyle] = useState<React.CSSProperties>({ opacity: 0, transition: "none" });

  return (
    <EightBallContext.Provider value={{ currentPersonality, setCurrentPersonality, currentBallState, setCurrentBallState, currentResponse, setCurrentResponse, question, setQuestion, diceStyle, setDiceStyle }}>
      {children}
    </EightBallContext.Provider>
  );
};


export const useEightBall = (): EightBallContextType => {
  const context = useContext(EightBallContext);
  if (!context) throw new Error('useEightBall must be used within an EightBallProvider');
  return context;
};