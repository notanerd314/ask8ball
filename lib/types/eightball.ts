export type BallStateType = "normal" | "shaking" | "result" | "error";

export interface DiceSize {
  width: number;
  height: number;
}

export interface EightBallContextType {
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
  shareImageLink: string;
  setShareImageLink: (link: string) => void;
}

export interface PersonalityConfig {
  linkname: string;
  name: string;
  description: string;
  prompt: string;
  examples: Record<string, string>[];
  theme: ThemeConfig;
  temperature?: number;
  tag?: string;
  customResponseScript?: (question: string) => string;
}

export interface ThemeConfig {
  icon: string;
  accentColor: string;
  cssBackground: string;
  tailwindHoverClass: string;
}