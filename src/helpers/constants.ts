import { AnswerPrompt } from "./types";

export const QUESTION_MAX_LENGTH = 70;
export const AI_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";
export const ALL_RESPONSES_TYPES = [
  AnswerPrompt.Yes,
  AnswerPrompt.No,
  AnswerPrompt.Maybe,
  AnswerPrompt.NoAnswer
]