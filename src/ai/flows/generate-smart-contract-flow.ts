
'use server';
/**
 * @fileOverview An AI agent for generating smart contracts.
 *
 * - generateSmartContract - A function that handles the smart contract generation process.
 * - GenerateSmartContractInput - The input type for the generateSmartContract function.
 * - GenerateSmartContractOutput - The return type for the generateSmartContract function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSmartContractInputSchema = z.object({
  projectName: z.string().describe("The name of the project or business."),
  businessType: z.string().describe("The type of business or project (e.g., E-commerce, SaaS, DeFi)."),
  contractObjective: z.string().describe("The main goal or purpose of the smart contract."),
  keyFunctionalities: z.array(z.string()).describe("A list of key features or actions the contract should perform."),
  tokenStandard: z.enum(['ERC20', 'ERC721', 'ERC1155', 'None']).optional().default('None').describe("The token standard if applicable (e.g., ERC20, ERC721). Default to 'None' if not specified."),
  platform: z.string().optional().default('Ethereum').describe("The target blockchain platform (e.g., Ethereum, Polygon). Default to 'Ethereum' if not specified."),
});
export type GenerateSmartContractInput = z.infer<typeof GenerateSmartContractInputSchema>;

export const GenerateSmartContractOutputSchema = z.object({
  solidityCode: z.string().describe("The generated Solidity smart contract code."),
  warnings: z.string().optional().describe("Any important warnings or considerations about the generated code, especially regarding security or complexity. If no specific warnings, this can be omitted or state 'No specific warnings at this complexity level.'"),
  suggestions: z.string().optional().describe("Suggestions for improvement, next steps, or features that might be considered. If no specific suggestions, this can be omitted or state 'The contract is a basic implementation. Consider adding more robust error handling and specific business logic.'"),
});
export type GenerateSmartContractOutput = z.infer<typeof GenerateSmartContractOutputSchema>;

export async function generateSmartContract(input: GenerateSmartContractInput): Promise<GenerateSmartContractOutput> {
  return generateSmartContractFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSmartContractPrompt',
  input: {schema: GenerateSmartContractInputSchema},
  output: {schema: GenerateSmartContractOutputSchema},
  prompt: `You are an expert Solidity smart contract developer. Your task is to generate a basic, functional Solidity smart contract based on the user's requirements.

Project Name: {{{projectName}}}
Business Type: {{{businessType}}}
Contract Objective: {{{contractObjective}}}
Key Functionalities:
{{#each keyFunctionalities}}
- {{{this}}}
{{/each}}
Token Standard: {{#if tokenStandard}}{{{tokenStandard}}}{{else}}None{{/if}}
Platform: {{#if platform}}{{{platform}}}{{else}}Ethereum{{/if}}

Please generate the Solidity code.
The contract should be written for Solidity version ^0.8.20.
Include basic error handling (require statements for checks, simple custom errors if appropriate for clarity) and comments where appropriate for clarity.
The contract should include a license identifier, e.g., SPDX-License-Identifier: MIT.
Do not include deployment scripts or complex UI interaction logic. Focus on the core contract.
If a token standard (ERC20, ERC721, ERC1155) is specified and not 'None', implement the basic functions for that standard. For example, for ERC20, include name, symbol, decimals, totalSupply, balanceOf, transfer, approve, allowance, transferFrom. For ERC721, include name, symbol, tokenURI, balanceOf, ownerOf, approve, transferFrom, safeTransferFrom. For ERC1155, include uri, balanceOf, balanceOfBatch, setApprovalForAll, isApprovedForAll, safeTransferFrom, safeBatchTransferFrom. Use OpenZeppelin contracts as a base if it simplifies implementation and is common practice, but generate the code directly.

Provide your output in the specified JSON format.
Specifically, ensure you populate the 'solidityCode' field with the contract.
If there are any important warnings (e.g., "This is a basic template, ensure thorough auditing before production use for complex logic."), include them in the 'warnings' field.
If you have suggestions for next steps or improvements (e.g., "Consider adding specific access control mechanisms like Ownable from OpenZeppelin."), include them in the 'suggestions' field.
If no specific warnings or suggestions, you can state something like "No specific warnings for this basic structure." or "Further refinements can be added based on detailed specifications."
`,
});

const generateSmartContractFlow = ai.defineFlow(
  {
    name: 'generateSmartContractFlow',
    inputSchema: GenerateSmartContractInputSchema,
    outputSchema: GenerateSmartContractOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("AI failed to generate a response.");
    }
    return output;
  }
);
