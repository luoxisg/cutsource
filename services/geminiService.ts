import { GoogleGenAI } from "@google/genai";

// IMPORTANT: Do NOT expose your API key in client-side code.
// This implementation assumes the API key is set in an environment variable
// during the build process (e.g., using Vite, Webpack, etc.).
// For local development, you can create a .env file.
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.warn("API_KEY environment variable not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const summarizeText = async (text: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is not configured. Please set the API_KEY environment variable.");
  }
  
  try {
    const prompt = `
      You are an expert technical writer and systems engineer. Your task is to summarize a section of a technical specification document for a senior engineer.
      The original document is in Chinese. Provide your summary in Chinese.

      **Instructions:**
      1.  **Summarize Concisely:** Distill the key information into clear, concise bullet points or a short paragraph.
      2.  **Focus on Key Specs:** Highlight critical requirements, performance metrics, component options, and technical constraints.
      3.  **Maintain Technical Accuracy:** Do not alter the meaning or values of the specifications.
      4.  **Formatting:** Use Markdown for formatting. Use bold for key terms and bullet points for lists.

      **Original Text Section to Summarize:**
      ---
      ${text}
      ---

      **Your Summary (in Chinese):**
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Provide a more user-friendly error message
    if (error instanceof Error && error.message.includes('API key not valid')) {
        throw new Error('The provided API key is not valid. Please check your configuration.');
    }
    throw new Error("An error occurred while communicating with the AI service.");
  }
};