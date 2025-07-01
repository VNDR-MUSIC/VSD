
'use server';

import { NextResponse } from 'next/server';
import { generateSmartContract } from '@/ai/flows/generate-smart-contract-flow';
import { logger } from 'firebase-functions';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const apiKey = authHeader?.split(' ')[1];

  if (!process.env.INTERNAL_API_KEY || apiKey !== process.env.INTERNAL_API_KEY) {
    logger.warn('API_AUTH_FAIL: Invalid or missing API key.', { path: '/api/generate-contract' });
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { description } = body;

    if (!description || typeof description !== 'string' || description.trim() === '') {
      return NextResponse.json({ error: 'Invalid description provided. Must be a non-empty string.' }, { status: 400 });
    }

    const result = await generateSmartContract({ description });

    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    if (error instanceof SyntaxError) {
        logger.warn('API_INVALID_JSON: Failed to parse request body.', { path: '/api/generate-contract' });
        return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    logger.error('API_GEN_CONTRACT_UNHANDLED_EXCEPTION: Unhandled error in /api/generate-contract endpoint.', {
      errorMessage: error.message,
      errorStack: error.stack,
    });
    
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
