export type BallStateType = "normal" | "shaking" | "result" | "error";

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
  examples: Record<string, string>[];
  theme: ThemeConfig;
  temperature?: number;
  tag?: string;
  customResponseScript?: (question: string) => string;
}

export type ThemeConfig = {
  icon: string;
  accentColor: string;
  cssBackground: string;
  tailwindHoverClass: string;
}

export type APIResponse = {
  question: string,
  response: string,
  responseType: string,
  isSafe: boolean,
  violatedCategories: string[],
  personality: string,
  imageLink: string,
}