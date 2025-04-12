// app/api/generateHtml/route.ts
import { BlogInput, createBlogPrompt } from "@/lib/constants";
import { OpenAI } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API handler for dashboard
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Handle GET request logic here
    res.status(200).json({ message: "Welcome to the dashboard!" });
  } else if (req.method === "POST") {
    try {
      // Parse the request body to get the BlogInput
      const input: BlogInput = req.body;

      // Generate HTML based on input
      const htmlContent = await generateHTML(input);

      // Respond with the generated HTML content
      res.status(200).json({ htmlContent });
    } catch (error) {
      console.error("Error generating HTML:", error);
      res.status(500).json({ error: "Error generating HTML" });
    }
  } else {
    // Return method not allowed for any other HTTP method
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

// Function to generate HTML content using OpenAI API
async function generateHTML(input: BlogInput): Promise<string> {
  try {
    const prompt = createBlogPrompt(input); // Assuming this function returns the prompt string
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant for creating SEO optimized blog posts.",
        },
        { role: "user", content: prompt },
      ],
    });

    // Extract HTML content from the OpenAI API response
    const htmlContent = response.choices[0].message.content;
    return htmlContent ?? "Error generating HTML";
  } catch (error) {
    console.error("Error generating HTML:", error);
    throw new Error("Error generating HTML");
  }
}
