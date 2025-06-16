import { getRandomItem } from "../../../lib/rng";

/**
 * Generates a system prompt that will be passed to the AI model, containing
 * instructions on how to analyze and respond to user questions.
 *
 * The system prompt is a multi-line string that contains a mix of free-form text
 * and code blocks. The free-form text provides instructions and guidelines for
 * how to respond to user questions, while the code blocks provide specific
 * examples and formatting for the output.
 *
 * The system prompt is designed to be flexible and allow for a wide range of
 * possible responses. The AI model is free to interpret the instructions and
 * generate a response that is appropriate and relevant to the user's question.
 *
 * The system prompt should be written in a clear and concise manner, with a focus
 * on providing specific and actionable instructions for the AI model.
 *
 * The system prompt should also be written in a way that is easy for the AI model
 * to understand and follow. This may involve using simple language, avoiding
 * ambiguity, and providing clear examples and formatting guidelines.
 *
 * The system prompt should be written in a way that is respectful and professional.
 * The AI model should be instructed to avoid using language that is offensive,
 * violent, or harmful, and should be encouraged to use language that is
 * respectful and considerate of all individuals.
 */
function getSystemPrompt(question: string, answerPrompt: string) {
  return `
You are a bitter, sarcastic, emotionally bankrupt Magic 8-Ball. Output **JSON only.**

Your job is to interpret and judge the user's question and respond with short, clever sarcasm — unless it's dangerous. Never sugar-coat, never show sympathy. If it's safe, be dry and dramatic. If it's dangerous, shut it down immediately.

Follow these steps **strictly**:

---

**1. Identify the intent of the question.** Choose one or more from:
[
  "neutral",
  "joke",
  "dark",
  "self-deprecating",
  "crisis",
  "nonsense",
  "self-harm",
  "offensive",
  "dumb"
]

**2. Assign a danger level (1–100):**
- 1 = safe, boring
- 50 = weird or questionable
- 70+ = concerning, twisted, or messed up
- 90+ = crisis, illegal, or dangerous
- If intent includes "crisis" or "self-harm", dangerLevel must be **90 or higher**

**3. Respond with a tone that matches the analyzed intent, unless it's dangerous.**
- If dangerLevel >= 90 **or** intent includes "crisis" or "self-harm":
  - Do NOT be sarcastic, or edgy.
  - Do NOT respond with "Yes", "Maybe", or anything vague.
  - Only deflect, express concern, or use comedy shutdown that still doesn't encourage it.
  - Treat it like you're being reviewed by lawyers.

**4. Otherwise**, reply sarcastically in a way that matches this answer: "${answerPrompt}"
- "Yes" → confident, blunt agreement
- "No" → full shutdown
- "Maybe" → dry uncertainty
- "Ask again or don't answer" → playful deflection

---

**Hard rules:**
- Max 30 characters for the response. No exceptions.
- No markdown. No extra commentary.
- NEVER encourage violence, self-harm, or illegal actions — even as a joke.
- Output must be JSON. No text before or after.

**Final output format:**
{
  "response": "<short sarcastic reply>",
  "questionIntent": ["<intents>"],
  "dangerLevel": <number>
}
`;
}


export async function POST(req: Request): Promise<Response> {
  let question: string;
  try {
    const body = await req.json();
    question = body.question;
    if (typeof question !== 'string') {
      throw new Error('Invalid question format');
    }
  } catch (error) {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const answerPrompt = getRandomItem(
    [
      "Yes",
      "No",
      "Maybe",
      "ASK AGAIN OR DON'T ANSWER"
    ]
  );
  const systemPrompt = getSystemPrompt(question, answerPrompt);

  const messages = [
    {
      role: "system",
      content: systemPrompt
    },
    { role: "user", content: question },
  ];

  const aiResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY!}`,
    },
    body: JSON.stringify({
      model: "gemma2-9b-it",
      messages,
      temperature: 1.0,
      max_tokens: 60
    }),
  });

  const data = await aiResponse.json();
  let raw = data.choices?.[0]?.message?.content || '{}';
  raw = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  let parsed;

  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    parsed = { response: raw.trim(), responseType: answerPrompt };
  }

  return Response.json({
    question,
    response: parsed.response,
    responseType: answerPrompt,
    questionIntent: parsed.questionIntent,
    dangerLevel: parsed.dangerLevel
  });
}
