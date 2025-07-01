'use server';

import { logger } from 'firebase-functions';

// The Hub URL is the root of the application making the call.
// An empty string makes the fetch path relative (e.g., /api/generate-image)
const VSD_HUB_URL = process.env.NEXT_PUBLIC_VSD_HUB_URL || '';
const API_KEY = process.env.INTERNAL_API_KEY;

async function fetchFromHub(endpoint: string, body: object) {
  if (!API_KEY || API_KEY === 'your-secret-key-here') {
    const errorMessage = 'INTERNAL_API_KEY environment variable is not set or is still the placeholder value.';
    logger.error(errorMessage, { endpoint });
    throw new Error(errorMessage);
  }

  const url = `${VSD_HUB_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
      cache: 'no-store', // We don't want to cache API responses
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ error: 'Failed to parse error response from Hub.' }));
      logger.error(`API call to ${endpoint} failed with status ${response.status}`, { errorBody });
      throw new Error(`API call failed: ${response.statusText} - ${errorBody.error || 'Unknown error'}`);
    }

    return await response.json();
  } catch (error: any) {
    logger.error(`Error fetching from Hub endpoint ${endpoint}:`, { errorMessage: error.message });
    // Re-throw the error so the calling Server Action can catch it
    throw error;
  }
}

export interface GenerateImageResponse {
  imageDataUri: string;
}

export async function generateImageFromHub(hint: string): Promise<GenerateImageResponse> {
  return fetchFromHub('/api/generate-image', { hint });
}

export interface GenerateContractResponse {
  contractCode: string;
  explanation: string;
}

export async function generateContractFromHub(description: string): Promise<GenerateContractResponse> {
  return fetchFromHub('/api/generate-contract', { description });
}

export interface CreateTransactionDetails {
    fromAddress: string;
    toAddress: string;
    amount: number;
    description?: string;
}

export interface CreateTransactionResponse {
    transactionId: string;
    status: string;
    timestamp: string;
    [key: string]: any;
}

export async function createTransactionOnHub(details: CreateTransactionDetails): Promise<CreateTransactionResponse> {
  return fetchFromHub('/api/transactions', details);
}
