
'use server';

/**
 * @fileOverview An AI-powered documentation search agent for the VSD Network.
 *
 * - documentationSearch - A function that handles searching the VSD documentation.
 * - DocumentationSearchInput - The input type for the documentationSearch function.
 * - DocumentationSearchOutput - The return type for the documentationSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DocumentationSearchInputSchema = z.object({
  query: z.string().describe('The search query for the VSD documentation.'),
});
export type DocumentationSearchInput = z.infer<typeof DocumentationSearchInputSchema>;

const DocumentationSearchOutputSchema = z.object({
  answer: z.string().describe('The answer to the query, extracted from the VSD documentation.'),
  relevantSection: z.string().describe('The title of the most relevant section in the documentation.'),
});
export type DocumentationSearchOutput = z.infer<typeof DocumentationSearchOutputSchema>;

export async function documentationSearch(input: DocumentationSearchInput): Promise<DocumentationSearchOutput> {
  return documentationSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'documentationSearchPrompt',
  input: {schema: DocumentationSearchInputSchema},
  output: {schema: DocumentationSearchOutputSchema},
  prompt: `You are an AI assistant that searches the VSD documentation to answer user queries.

  Your task is to provide a concise and accurate answer to the user's query, using only the information available in the VSD documentation.
  Also provide which section in the documentation that you found the answer.

  Query: {{{query}}}

  Answer:
  `, // TODO: Add documentation content
});

const documentationSearchFlow = ai.defineFlow(
  {
    name: 'documentationSearchFlow',
    inputSchema: DocumentationSearchInputSchema,
    outputSchema: DocumentationSearchOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) {
        console.warn('Documentation search returned no output from AI for query:', input.query);
        return {
          answer: "I encountered an issue searching the documentation. The AI did not provide a response. Please try again later.",
          relevantSection: "Error"
        };
      }
      return output;
    } catch (error) {
      console.error(`Error in documentationSearchFlow for query "${input.query}":`, error);
      return {
        answer: "I encountered an internal error while searching the documentation. Please check server logs and ensure AI services are correctly configured.",
        relevantSection: "Error - AI Service Failure"
      };
    }
  }
);

