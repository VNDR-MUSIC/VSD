
'use server';
/**
 * @fileOverview An AI flow for generating Solidity smart contracts from descriptions.
 *
 * - generateSmartContract - A function that generates Solidity code based on a description.
 * - GenerateSmartContractInput - The input type for the generateSmartContract function.
 * - GenerateSmartContractOutput - The return type for the generateSmartContract function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateSmartContractInputSchema = z.object({
  description: z.string().describe('A detailed description of the smart contract requirements, features, and desired functionality.'),
});
export type GenerateSmartContractInput = z.infer<typeof GenerateSmartContractInputSchema>;

const GenerateSmartContractOutputSchema = z.object({
  contractCode: z.string().describe('The generated Solidity smart contract code.'),
  explanation: z.string().describe('A brief explanation of the generated smart contract code.'),
});
export type GenerateSmartContractOutput = z.infer<typeof GenerateSmartContractOutputSchema>;

export async function generateSmartContract(input: GenerateSmartContractInput): Promise<GenerateSmartContractOutput> {
  return generateSmartContractFlow(input);
}

const smartContractPrompt = ai.definePrompt({
  name: 'generateSmartContractPrompt',
  input: { schema: GenerateSmartContractInputSchema },
  output: { schema: GenerateSmartContractOutputSchema },
  prompt: `You are an expert Solidity smart contract developer specializing in ERC20 tokens, DAOs, and DeFi protocols for stablecoins.
Generate a secure and well-documented Solidity smart contract based on the following description.
The contract should follow best practices.
Provide the Solidity code in the 'contractCode' field.
Provide a brief explanation of the generated code, its main functions, and any important considerations in the 'explanation' field.

Contract Description:
{{{description}}}

Example of expected output format (JSON):
{
  "contractCode": "pragma solidity ^0.8.20;\\n\\ncontract MyToken {\\n  // ... contract code ...\\n}",
  "explanation": "This contract implements a basic ERC20 token with..."
}
Ensure your output is a valid JSON object matching this structure.
`,
  // Optional: Configure model and safety settings if needed
  // model: 'gemini-pro', // Example, Genkit will use a default if not specified
  // config: {
  //   safetySettings: [
  //     { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
  //   ],
  // },
});

const generateSmartContractFlow = ai.defineFlow(
  {
    name: 'generateSmartContractFlow',
    inputSchema: GenerateSmartContractInputSchema,
    outputSchema: GenerateSmartContractOutputSchema,
  },
  async (input) => {
    if (!input.description) {
      throw new Error('Smart contract description cannot be empty.');
    }

    const { output } = await smartContractPrompt(input);

    if (!output) {
      throw new Error('Failed to generate smart contract: No output from AI model.');
    }
    if (!output.contractCode || typeof output.contractCode !== 'string') {
      console.error("Invalid output from smartContractPrompt, missing contractCode:", output);
      throw new Error('Failed to generate smart contract: Invalid contract code returned.');
    }
     if (!output.explanation || typeof output.explanation !== 'string') {
      console.error("Invalid output from smartContractPrompt, missing explanation:", output);
      // fallback if explanation is missing but code is present
      output.explanation = "No explanation provided by the model.";
    }


    return output;
  }
);
