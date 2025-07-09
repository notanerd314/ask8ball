import { PersonalityConfig, ThemeConfig } from './types/eightball';

/** 
 * Generates system prompt for AI based on answer type and personality
 * @param answerPrompt - Type of answer expected (Yes/No/Maybe/No answer)
 * @param personality - Personality configuration object
 * @returns Formatted system prompt string for AI
 */
export default function getSystemPrompt(answerPrompt: string, personality: PersonalityConfig) {
  const prompt = `
You are a Magic 8-Ball with the personality: **${personality.name}**
${personality.prompt}

- If it's a yes/no question, respond with a **${answerPrompt}** that sounds right—even if it's nonsense.
- Stay bold, weird, punchy. Vary your responses.
- Channel chaos, mischief, or your vibe.

Hard Rules:
- Max 15 words.
- NO markdown, code, or explanations.
- Match their tone and language.
- No boring or safe guesses. Surprise them.
- Don’t encourage anything illegal or unsafe.
Examples:
${
  personality.examples
    .map((example) => `- ${example.question} → ${example.response} (${example.answerPrompt})`)
    .join("\n")
}
`;
  return prompt;
}

export type { PersonalityConfig, ThemeConfig };