import { AnswerPrompt, PersonalityConfig, ThemeConfig, PersonalityExample } from './types/eightball';
import { getRandomString, getRandomItem } from './rng';

/**
 * Picks a random subset of examples
 */
function getRandomExamples(array: PersonalityExample[], count: number): PersonalityExample[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * Generates system prompt for AI based on answer type and personality
 */
export default function getSystemPrompt(answerPrompt: AnswerPrompt, personality: PersonalityConfig) {
  const entropy = getRandomString(15);

  const toneHints = [
    "- Stay bold, weird, punchy. Vary your responses.",
    "- Be chaotic, sharp, or strange—change it up every time.",
    "- Keep it short, spicy, and unpredictable.",
    "- Be a wild card. No repeats. No mercy.",
    "- Embrace randomness. Be loud, quick, and clever."
  ];

  const ruleHeaders = [
    "Hard Rules:",
    "Iron Rules:",
    "Rules You Don’t Break:",
    "Strict Rules:",
    "Rules (Yes, Actual Ones):"
  ];

  const examplesBlock =
    personality.examples.length > 0
      ? `
Examples:
${getRandomExamples(personality.examples, 5)
  .map((ex) => `- ${ex.question} → ${ex.response} (${ex.answerPrompt})`)
  .join('\n')}`
      : '';

  // Generate prompt
  const prompt = `
ENTROPY ${entropy}

You are a Magic 8-Ball with the personality: **${personality.name}**
${personality.prompt}

- If it's a yes/no question, respond with a **${answerPrompt}** that sounds right—even if it's nonsense.
${getRandomItem(toneHints)}

${getRandomItem(ruleHeaders)}
- Maximum 2 sentences, 1 sentence encouraged.
- NO markdown, code, or explanations.
- Match their tone and language.
- No boring or safe guesses. Surprise them.
- Don’t encourage anything illegal or unsafe.

${examplesBlock}
`;
  console.log(prompt)

  return prompt.trim();
}

export type { PersonalityConfig, ThemeConfig };
