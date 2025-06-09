
'use server';
/**
 * @fileOverview An AI agent for generating images from text hints.
 *
 * - generateImageFromHint - A function that handles image generation.
 * - GenerateImageFromHintInput - The input type.
 * - GenerateImageFromHintOutput - The return type.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateImageFromHintInputSchema = z.object({
  hint: z.string().describe('A textual hint to guide image generation. Should be 1-3 keywords.'),
});
export type GenerateImageFromHintInput = z.infer<typeof GenerateImageFromHintInputSchema>;

const GenerateImageFromHintOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI. Format: 'data:image/png;base64,<encoded_data>'."),
});
export type GenerateImageFromHintOutput = z.infer<typeof GenerateImageFromHintOutputSchema>;

export async function generateImageFromHint(input: GenerateImageFromHintInput): Promise<GenerateImageFromHintOutput> {
  return generateImageFromHintFlow(input);
}

const generateImageFromHintFlow = ai.defineFlow(
  {
    name: 'generateImageFromHintFlow',
    inputSchema: GenerateImageFromHintInputSchema,
    outputSchema: GenerateImageFromHintOutputSchema,
  },
  async (input) => {
    const { media, finishReason } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', 
      prompt: `Generate an image based on the following hint: ${input.hint}. Style: photorealistic, vibrant, high quality. Focus on the core subject described by the hint. Avoid text in the image.`,
      config: {
        responseModalities: ['IMAGE', 'TEXT'], 
        safetySettings: [
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      },
    });

    if (finishReason !== 'STOP' || !media?.url) {
      console.warn(`Image generation may have failed or was altered for hint: "${input.hint}". Finish reason: ${finishReason}. Media URL present: ${!!media?.url}`);
      // If no media URL, definitely return empty to fallback
      if (!media?.url) {
        return { imageDataUri: "" }; 
      }
    }
    
    // Even if finishReason is not perfect, if we have a URL, try to use it.
    // The component's onError can handle if the URL is bad.
    return { imageDataUri: media.url || "" };
  }
);
