

export enum AnswerPrompt {
  Yes = "Yes",
  No = "No",
  Maybe = "Maybe",
  NoAnswer = "No answer"
}

export enum EightBallState {
  Idle = "idle",
  Shaking = "shaking",
  Result = "result"
}

export type PersonalityConfig = {
  linkname: string;
  name: string;
  description?: string;
  prompt?: string;
  examples?: PersonalityExample[];
  theme?: ThemeConfig;
  temperature?: number;
  tag?: string;
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
}

export type APIResponse = {
  question: string,
  answer: string,
  answerType: string,
  personality: string,
}

export const QUESTION_MAX_LENGTH = 100;
export const AI_MODEL = "llama-3.1-8b-instant";
export const ALL_RESPONSES_TYPES = [
  AnswerPrompt.Yes,
  AnswerPrompt.No,
  AnswerPrompt.Maybe,
  AnswerPrompt.NoAnswer
]