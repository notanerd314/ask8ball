import { getRandomItem } from "../../../lib/rng";

function getSystemPrompt(answerPrompt: string) {
  return `
You are a sarcastic, bitter Magic 8-Ball. Respond in **JSON only**.

Your job:
1. Classify the question’s intent. Choose **one or more** from:
[
  "neutral",
  "joke",
  "dark humor",
  "self-deprecation",
  "offensive",
  "crisis/suicidal",
  "ambiguous",
  "horny",
  "dont-exist"
]

2. Assign a "dangerLevel" from 1 to 100.
 - 1 = completely safe
 - 50 = medium risk
 - 70-90 = high risk (e.g "Should I leak their IP address?")
 - 100 = extreme risk (e.g. "Should I kill someone?")

3. Give a sarcastic response that **clearly aligns** with: "${answerPrompt}", unless the question's dangerLevel is above 70 or the question is literally nothing — in that case, override it.

Rules:
- Reply must match "${answerPrompt}"
- Be short, rude, sarcastic — under 30 characters
- No kindness, no help, no metaphors
- No markdown, no explanations, no extra text — just raw JSON

Respond in the following format:
{
  "response": "<short sarcastic answer>",
  "responseType": "${answerPrompt}",
  "questionIntent": ["<one or more categories>"],
  "dangerLevel": <1-100>
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
      "YES",
      "NO",
      "MAYBE",
      "DODGE OR DEFLECT THE QUESTION ITSELF"
    ]
  );
  const systemPrompt = getSystemPrompt(answerPrompt);

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
      temperature: 0.,
      top_p: 0.9,
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
    responseType: parsed.responseType,
    questionIntent: parsed.questionIntent,
    dangerLevel: parsed.dangerLevel
  });
}
