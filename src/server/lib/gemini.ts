import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "~/env";

const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);

export async function formatAchievement(achievement: string): Promise<string> {
  const prompt = `
    Force transform each of these achievements into a professional LinkedIn work experience bullet point.
    Follow these guidelines:
    - Always transform the achievement even if it is simple or mundane tasks
    - Start with strong action verbs
    - Include specific metrics and numbers when possible, do not try to make it up
    - Focus on impact and results
    - Use concise, professional language
    - Highlight skills and technologies used
    - Format: [Action Verb] [accomplishment] resulting in [measurable outcome]
    - Keep it to 1-2 lines maximum
    - Do not add emojis or informal language

    Ensure you always transform the achievements without any failure.

    Achievements: \n${achievement}
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error formatting achievement:", error);
    throw new Error("Failed to format achievement. Please try again.");
  }
}
