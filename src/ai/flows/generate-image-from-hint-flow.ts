
'use server';
/**
 * @fileOverview An AI flow to generate an image based on a text hint.
 *
 * - generateImageFromHint - A function that invokes the image generation flow.
 * - GenerateImageFromHintInput - The input type for the flow.
 * - GenerateImageFromHintOutput - The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit/zod';

export const GenerateImageFromHintInputSchema = z.object({
  hint: z.string().describe('A textual hint or keywords to guide image generation.'),
  width: z.number().optional().describe('Desired width of the image.'), // Though Gemini might not always respect this for generation.
  height: z.number().optional().describe('Desired height of the image.'),
});
export type GenerateImageFromHintInput = z.infer<typeof GenerateImageFromHintInputSchema>;

export const GenerateImageFromHintOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI. Expected format: 'data:image/png;base64,<encoded_data>'."),
  revisedPrompt: z.string().optional().describe("The prompt that was actually used by the model, if revised."),
});
export type GenerateImageFromHintOutput = z.infer<typeof GenerateImageFromHintOutputSchema>;

export async function generateImageFromHint(input: GenerateImageFromHintInput): Promise<GenerateImageFromHintOutput> {
  return generateImageFromHintFlow(input);
}

// Note: Gemini 2.0 Flash Experimental might not strictly adhere to size parameters in the prompt.
// The primary guidance comes from the text prompt itself.
const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFromHintFlow',
    inputSchema: GenerateImageFromHintInputSchema,
    outputSchema: GenerateImageFromHintOutputSchema,
  },
  async ({ hint }) => {
    const { media, revisedPrompt } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp',
      prompt: `Generate a visually appealing, modern, and professional image suitable for a tech/finance platform called VSD Network.
The image should represent the concept: '${hint}'.
Avoid text in the image. Ensure the style is consistent with a dark-themed, futuristic application with a deep red primary accent.
The image should evoke themes of technology, security, and innovation.
Target aspect ratio should be suitable for web display, generally landscape or square. If the hint implies a certain orientation, prioritize that.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // Must provide both TEXT and IMAGE
        temperature: 0.7, // Allow for some creativity
      },
    });

    if (!media || !media.url) {
      console.error('AI failed to generate image. Media or URL is missing.', {hint, media, revisedPrompt});
      throw new Error('AI failed to generate image. Media or URL is missing.');
    }
    
    return {
      imageDataUri: media.url,
      revisedPrompt: revisedPrompt
    };
  }
);
