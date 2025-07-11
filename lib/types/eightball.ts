export type BallStateType = "normal" | "shaking" | "result" | "error";

export enum AnswerPrompt {
  Yes = "Yes",
  No = "No",
  Maybe = "Maybe",
  NoAnswer = "No answer"
}

export type DiceSize = {
  width: number;
  height: number;
}

export type EightBallContextType = {
  currentResponse: APIResponse;
  setCurrentResponse: (response: APIResponse) => void;
  ballCurrentState: BallStateType;
  setBallCurrentState: (state: BallStateType) => void;
  question: string;
  setQuestion: (question: string) => void;
  diceStyle: React.CSSProperties;
  setDiceStyle: (style: React.CSSProperties) => void;
  currentPersonality: PersonalityConfig;
  setCurrentPersonality: (personality: PersonalityConfig) => void;
  shareImageLink: string;
  setShareImageLink: (link: string) => void;
}

export type PersonalityConfig = {
  linkname: string;
  name: string;
  description: string;
  prompt: string;
  examples: PersonalityExample[];
  theme: ThemeConfig;
  temperature?: number;
  tag?: string;
  customResponseScript?: (question: string) => string;
}

export type PersonalityExample = {
  question: string;
  response: string;
  answerPrompt: AnswerPrompt;
}

export type ThemeConfig = {
  icon: string;
  accentColor: string;
  cssBackground: string;
  tailwindHoverClass: string;
}

export type { APIResponse, APIError } from './api';