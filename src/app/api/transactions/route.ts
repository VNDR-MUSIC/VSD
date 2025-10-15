
'use server';

import { NextResponse } from 'next/server';
import { logger } from 'firebase-functions';
import { randomUUID } from 'crypto';
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// --- Memoized Firebase Admin SDK Initialization ---
// This ensures we initialize only once per serverless function instance.
let adminApp: App | undefined;
let db: Firestore | undefined;

function getDb(): Firestore {
    if (!db) {
        // Safely parse the service account key
        let serviceAccount;
        try {
            if (process.env.FIREBASE_SERVICE_ACCOUNT) {
                serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
            }
        } catch (e) {
            logger.error('FIREBASE_SERVICE_ACCOUNT_PARSE_ERROR: Could not parse the service account JSON.', { error: e });
            serviceAccount = undefined;
        }

        if (getApps().length === 0) {
            adminApp = initializeApp({
                credential: serviceAccount ? cert(serviceAccount) : undefined,
            });
        } else {
            adminApp = getApps()[0];
        }
        db = getFirestore(adminApp);
    }
    return db;
}
// --- End Firebase Admin SDK Initialization ---


async function logApiRequest(logData: Omit<any, 'id' | 'timestamp'>) {
    try {
        const firestore = getDb();
        const logEntry = {
            ...logData,
            timestamp: new Date().toISOString(),
        };
        // Use addDocumentNonBlocking to avoid waiting and improve resilience
        await firestore.collection('api_logs').add(logEntry);
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
  let tenantDoc;
  let tenant;

  try {
    const firestore = getDb();
    const tenantsSnapshot = await firestore.collection('tenants').where('apiKey', '==', apiKey).limit(1).get();
    tenantDoc = tenantsSnapshot.docs[0];
    tenant = tenantDoc?.data();
  } catch (dbError: any) {
      logger.error('FIRESTORE_CONNECTION_ERROR: Failed to connect to Firestore to validate API key.', {
          errorMessage: dbError.message,
          endpoint,
      });
      return NextResponse.json({ error: 'Internal Server Error: Could not verify credentials.' }, { status: 500 });
  }


  if (!apiKey) {
    await logApiRequest({
        status: 'Failure',
        endpoint,
        message: 'Authentication error: Missing API key.',
    });
    return NextResponse.json({ error: 'Unauthorized: API key is required.' }, { status: 401 });
  }

  if (!tenant) {
     await logApiRequest({
        status: 'Failure',
        endpoint,
        message: 'Authentication error: Invalid API key provided.',
    });
    return NextResponse.json({ error: 'Unauthorized: Invalid API key.' }, { status: 401 });
  }

  await logApiRequest({
      status: 'Success',
      tenantId: tenantDoc.id,
      tenantName: tenant.name,
      endpoint,
      message: `Request from ${tenant.name} to ${endpoint}`,
  });
  
  try {
    const body = await request.json();
    const { fromAddress, toAddress, amount, description } = body;

    if (!fromAddress || !toAddress || !amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: 'Invalid transaction details provided.' }, { status: 400 });
    }

    const transaction = {
      transactionId: `txn_${randomUUID()}`,
      status: 'completed',
      timestamp: new Date().toISOString(),
      fromAddress,
      toAddress,
      amount,
      currency: 'VSD',
      description: description || 'VSD Transfer',
    };

    logger.info('API_TRANSACTION_SUCCESS: A transaction was processed.', { transaction: transaction, tenant: tenant.name });

    return NextResponse.json(transaction, { status: 201 });

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
