
'use server';

import { NextResponse } from 'next/server';
import { logger } from 'firebase-functions';
import { randomUUID } from 'crypto';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// --- Initialize Firebase Admin SDK ---
// This ensures we can securely write logs to Firestore from the server.
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : undefined;

if (getApps().length === 0) {
  initializeApp({
    credential: serviceAccount ? cert(serviceAccount) : undefined,
  });
}
const db = getFirestore();
// --- End Firebase Admin SDK Initialization ---

async function logApiRequest(logData: Omit<any, 'id' | 'timestamp'>) {
    try {
        const logEntry = {
            ...logData,
            timestamp: new Date().toISOString(),
        };
        // Use addDoc for auto-generated IDs. This is a non-blocking operation on the server.
        await db.collection('api_logs').add(logEntry);
    } catch (error) {
        logger.error('API_LOGGING_FAILED: Could not write to api_logs collection.', {
            error,
            logData,
        });
    }
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const apiKey = authHeader?.split(' ')[1];
  const requestUrl = new URL(request.url);
  const endpoint = requestUrl.pathname;

  if (!apiKey) {
    await logApiRequest({
        status: 'Failure',
        endpoint,
        message: 'Authentication error: Missing API key.',
    });
    return NextResponse.json({ error: 'Unauthorized: API key is required.' }, { status: 401 });
  }

  // --- Find Tenant by API Key ---
  // In a real app, this would be a single, efficient query.
  const tenantsSnapshot = await db.collection('tenants').get();
  const tenant = tenantsSnapshot.docs.find(doc => doc.data().apiKey === apiKey)?.data();

  if (!tenant) {
     await logApiRequest({
        status: 'Failure',
        endpoint,
        message: 'Authentication error: Invalid API key provided.',
    });
    return NextResponse.json({ error: 'Unauthorized: Invalid API key.' }, { status: 401 });
  }

  // At this point, the key is valid. Log the successful authentication.
  await logApiRequest({
      status: 'Success',
      tenantId: tenant.id,
      tenantName: tenant.name,
      endpoint,
      message: `Request from ${tenant.name} to ${endpoint}`,
  });
  
  // --- Original Transaction Logic ---
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
      mock: true
    };

    logger.info('API_MOCK_TRANSACTION_SUCCESS: A mock transaction was processed.', { transaction: mockTransaction, tenant: tenant.name });

    return NextResponse.json(mockTransaction, { status: 201 });

  } catch (error: any) {
    if (error instanceof SyntaxError) {
        logger.warn('API_INVALID_JSON: Failed to parse request body.', { path: endpoint, tenant: tenant.name });
        return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    logger.error('API_TRANSACTION_UNHANDLED_EXCEPTION: Unhandled error in endpoint.', {
      path: endpoint,
      tenant: tenant.name,
      errorMessage: error.message,
      errorStack: error.stack,
    });
    
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
