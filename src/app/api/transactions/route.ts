
'use server';

import { NextResponse } from 'next/server';
import { logger } from 'firebase-functions';
import { randomUUID } from 'crypto';

// This is a MOCK API endpoint.
// In a real application, this would interact with a database (like Firestore)
// and a smart contract or ledger system to process transactions.
// For demonstration, it simulates a transaction and returns a mock response.

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const apiKey = authHeader?.split(' ')[1];

  if (!process.env.INTERNAL_API_KEY || apiKey !== process.env.INTERNAL_API_KEY) {
    logger.warn('API_AUTH_FAIL: Invalid or missing API key.', { path: '/api/transactions' });
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { fromAddress, toAddress, amount, description } = body;

    // Basic validation
    if (!fromAddress || !toAddress || !amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: 'Invalid transaction details provided.' }, { status: 400 });
    }

    // Simulate successful transaction processing
    const mockTransaction = {
      transactionId: `txn_${randomUUID()}`,
      status: 'completed',
      timestamp: new Date().toISOString(),
      fromAddress,
      toAddress,
      amount,
      currency: 'VSD',
      description: description || 'VSD Transfer',
      mock: true // Clearly indicate this is a mock response
    };

    logger.info('API_MOCK_TRANSACTION_SUCCESS: A mock transaction was processed.', { transaction: mockTransaction });

    return NextResponse.json(mockTransaction, { status: 201 }); // 201 Created

  } catch (error: any) {
    if (error instanceof SyntaxError) {
        logger.warn('API_INVALID_JSON: Failed to parse request body.', { path: '/api/transactions' });
        return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    logger.error('API_TRANSACTION_UNHANDLED_EXCEPTION: Unhandled error in /api/transactions endpoint.', {
      errorMessage: error.message,
      errorStack: error.stack,
    });
    
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
