"use client";

import { PersonalityConfig, EightBallState, APIResponse, AnswerPrompt } from '@/utils/eightball/types';
import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import useSound from 'use-sound';

interface EightBallContextType {
  currentPersonality: PersonalityConfig;
  currentBallState: EightBallState;
  setCurrentBallState: (state: EightBallState) => void;
  currentResponse: APIResponse;
  setCurrentResponse: (response: APIResponse) => void;
  question: string;
  setQuestion: (question: string) => void;
  shakeEightBall: () => Promise<void>;
}

interface EightBallProviderProps {
  children: ReactNode;
  personality: PersonalityConfig;
}


const EightBallContext = createContext<EightBallContextType | undefined>(undefined);

export const EightBallProvider = ({ children, personality }: EightBallProviderProps) => {
  const currentPersonality = personality;
  const [currentBallState, setCurrentBallState] = useState<EightBallState>(EightBallState.Idle);
  const [currentResponse, setCurrentResponse] = useState<APIResponse>({
    question: "",
    answer: "",
    answerType: "",
    personality: ""
  });
  const [question, setQuestion] = useState("[No question]");

  const [playShakeSound] = useSound("/eightball/shake.mp3", { volume: 1, interrupt: true });

  const shakeEightBall = async () => {
    setCurrentBallState(EightBallState.Shaking);

    try {
      const response = await fetch("/eightball/api/ask", {
        method: "POST",
        body: JSON.stringify({
          question: question,
          personality: currentPersonality.linkname,
        }),
        headers: {
          "Content-Type": "application/json",
        }
      });

      // ❗ Check for non-2xx responses
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      let answerData: APIResponse;

      try {
        answerData = await response.json();
      } catch (jsonError) {
        throw new Error("Failed to parse API response.");
      }

      setCurrentResponse(answerData);
      playShakeSound();

      setTimeout(() => {
        setCurrentBallState(EightBallState.Result);
      }, 2200);

    } catch (error) {
      // Show fallback response to user
      setCurrentResponse({
        question: question,
        answer: "An error occurred. Please try again later.",
        answerType: AnswerPrompt.NoAnswer,
        personality: currentPersonality.linkname
      });

      setCurrentBallState(EightBallState.Result);
    }
  };

  const contextValue = useMemo(() => ({
    currentPersonality,
    currentBallState,
    setCurrentBallState,
    currentResponse,
    setCurrentResponse,
    question,
    setQuestion,
    shakeEightBall
  }), [
    currentBallState,
    currentResponse,
    question
  ]);

  return (
    <EightBallContext.Provider value={contextValue}>
      {children}
    </EightBallContext.Provider>
  );
};


export const useEightBall = (): EightBallContextType => {
  const context = useContext(EightBallContext);
  if (!context) throw new Error('useEightBall must be used within an EightBallProvider');
  return context;
};