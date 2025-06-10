
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
import { logger } from 'firebase-functions'; // For structured logging

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
    logger.info('AI_GEN_START: generateImageFromHintFlow invoked.', {
      hint: input.hint,
      genkitFlowName: 'generateImageFromHintFlow',
      projectId: process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT || 'N/A',
      functionRegion: process.env.FUNCTION_REGION || 'N/A',
    });

    if (!input.hint) {
      logger.warn('AI_GEN_VALIDATION_FAIL: Image generation hint cannot be empty.', { hint: input.hint });
      throw new Error('Image generation hint cannot be empty.');
    }

    try {
      const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', // Per Genkit docs for image generation
        prompt: `Generate an image based on the following hint: "${input.hint}". Focus on creating a visually appealing image relevant to the hint. Create a photorealistic image if possible, otherwise an artistic representation.`,
        config: {
          responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE
          // safetySettings can be added here if needed
        },
      });

      if (!media || !media.url) {
        logger.error('AI_GEN_EMPTY_RESPONSE: AI model did not return media or media.url.', {
          hint: input.hint,
          modelResponse: { media }, // Log the partial response if available
        });
        throw new Error(`Image generation failed for hint "${input.hint}": No media content returned from the AI model.`);
      }
      
      logger.info('AI_GEN_SUCCESS: Image generated successfully.', { hint: input.hint, returnedUrlLength: media.url.length });
      return { imageDataUri: media.url };

    } catch (error: any) {
      logger.error('AI_GEN_FAILURE: Error in generateImageFromHintFlow.', {
        hint: input.hint,
        errorMessage: error.message,
        errorStack: error.stack,
        errorDetails: error.details || error.cause, // Include additional error info if present
        environment: {
          NODE_ENV: process.env.NODE_ENV || 'N/A',
          FUNCTION_MEMORY_MB: process.env.FUNCTION_MEMORY_MB || 'N/A',
          PROJECT_ID: process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT || 'N/A',
        },
      });
      // Re-throw a more specific error or the original one
      throw new Error(`Failed to generate image from hint "${input.hint}": ${error.message || String(error)}`);
    }
  }
);
