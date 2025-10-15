
'use server';

import { NextResponse } from 'next/server';
import { logger } from 'firebase-functions';
import { randomUUID } from 'crypto';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import axios from 'axios';

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

async function createAgileTask(title: string, description: string) {
    // This function will call our own app's API route, which then securely calls Agiled.
    // This is the "bridge" pattern.
    const internalApiUrl = process.env.NEXT_PUBLIC_APP_URL
        ? `${process.env.NEXT_PUBLIC_APP_URL}/api/agiled/create-task`
        : 'http://localhost:9002/api/agiled/create-task';
        
    try {
        await axios.post(internalApiUrl, {
            title,
            description,
        });
        logger.info('AGILED_TASK_CREATED: Successfully created a task for API failure.');
    } catch (error: any) {
        logger.error('AGILED_TASK_CREATION_FAILED: Could not create Agiled task.', {
            errorMessage: error.message,
            errorData: error.response?.data
        });
    }
}


async function logApiRequest(logData: Omit<any, 'id' | 'timestamp'>) {
    try {
        const logEntry = {
            ...logData,
            timestamp: new Date().toISOString(),
        };
        await db.collection('api_logs').add(logEntry);

        // If the status is 'Failure', trigger the autonomous task creation.
        if (logData.status === 'Failure') {
            const title = `API Auth Failure: ${logData.message}`;
            const description = `An API request failed at ${logEntry.timestamp} from an unknown source trying to access the endpoint: ${logData.endpoint}. Please investigate the source or potential misconfiguration.`;
            await createAgileTask(title, description);
        }
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
  const tenantsSnapshot = await db.collection('tenants').where('apiKey', '==', apiKey).limit(1).get();
  const tenantDoc = tenantsSnapshot.docs[0];
  const tenant = tenantDoc?.data();

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
      tenantId: tenantDoc.id,
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
