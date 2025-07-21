export enum AnswerPrompt {
  Yes = "Yes",
  No = "No",
  Maybe = "Maybe",
  NoAnswer = "No answer"
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