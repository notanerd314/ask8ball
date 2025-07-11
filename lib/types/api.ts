export type APIResponse = {
  question: string;
  response: string;
  responseType: string;
  isSafe: boolean;
  violatedCategories: string[];
  personality: string;
  shareSig: string;
};

export type APIError = {
  error: string;
  code?: string;
};

export type GuardResponse = {
  isSafe: boolean;
  categories: string[];
};