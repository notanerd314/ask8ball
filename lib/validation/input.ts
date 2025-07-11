import { QUESTION_MAX_LENGTH } from '../constants/eightball';

export class ValidationError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateQuestion(question: unknown): string {
  if (typeof question !== "string") {
    throw new ValidationError("Question must be a string", "INVALID_TYPE");
  }

  if (question.length > QUESTION_MAX_LENGTH) {
    throw new ValidationError("Question too long", "QUESTION_TOO_LONG");
  }

  return question.trim();
}

export function validatePersonality(personality: unknown): string {
  if (typeof personality !== "string") {
    throw new ValidationError("Personality must be a string", "INVALID_TYPE");
  }

  if (!personality.trim()) {
    throw new ValidationError("Personality cannot be empty", "EMPTY_PERSONALITY");
  }

  return personality.trim();
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim();
}