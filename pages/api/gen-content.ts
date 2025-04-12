import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

// Khởi tạo OpenAI client (nhớ set OPENAI_API_KEY trong env)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Invalid input text" });
  }

  try {
    const prompt = `
You are a professional blog writer.
Continue the following blog paragraph in the same tone and context, adding more useful and engaging content.

Text so far:
"""${text}"""

Continue writing:
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4", // or "gpt-3.5-turbo"
      messages: [
        {
          role: "system",
          content: "You are a helpful and creative writing assistant.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const moreContent = completion.choices[0]?.message.content?.trim();

    if (!moreContent) {
      return res.status(500).json({ error: "Failed to generate content" });
    }

    res.status(200).json({ moreContent });
  } catch (error: any) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
