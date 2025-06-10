
'use server';
/**
 * @fileOverview An AI flow for generating images from text hints.
 *
 * - generateImageFromHint - A function that generates an image based on a textual hint.
 * - GenerateImageInput - The input type for the generateImageFromHint function.
 * - GenerateImageOutput - The return type for the generateImageFromHint function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateImageInputSchema = z.object({
  hint: z.string().describe('A textual hint to guide the image generation process.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI (e.g., 'data:image/png;base64,...')."),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImageFromHint(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFromHintFlow(input);
}

const generateImageFromHintFlow = ai.defineFlow(
  {
    name: 'generateImageFromHintFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    if (!input.hint) {
      throw new Error('Image generation hint cannot be empty.');
    }

    try {
      const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', // IMPORTANT: Only this model supports image generation as per docs
        prompt: `Generate an image based on the following hint: "${input.hint}". Focus on creating a visually appealing image relevant to the hint.`,
        config: {
          responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE
          // Optional: Add safety settings if needed, though default should be reasonable for general hints
          // safetySettings: [
          //   { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
          // ],
        },
      });

      if (!media || !media.url) {
        throw new Error('Image generation failed: No media content returned from the AI model.');
      }
      
      // The media.url is already expected to be a data URI string
      return { imageDataUri: media.url };

    } catch (error) {
      console.error('Error in generateImageFromHintFlow:', error);
      // It's often better to let errors propagate to be handled by the caller,
      // but if specific fallback logic were needed within the flow, it would go here.
      // For now, re-throw or ensure the error is descriptive.
      throw new Error(`Failed to generate image from hint "${input.hint}": ${error instanceof Error ? error.message : String(error)}`);
    }
  }
);
