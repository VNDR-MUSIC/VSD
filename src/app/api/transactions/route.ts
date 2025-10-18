
'use server';

import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { initializeApp, getApps, App, getApp } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// --- Memoized Firebase Admin SDK Initialization ---
let adminApp: App | undefined;
let db: Firestore | undefined;

function getDb(): Firestore {
  if (!db) {
    if (getApps().length === 0) {
      // In a deployed Firebase App Hosting environment, initializeApp() with no arguments
      // automatically uses the project's service account credentials. In local dev, it may
      // use application default credentials if available.
      adminApp = initializeApp();
    } else {
      adminApp = getApp();
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
        await firestore.collection('api_logs').add(logEntry);
    } catch (error) {
        console.error('API_LOGGING_FAILED: Could not write to api_logs collection.', {
            error,
            logData,
        });
    }
}

// Helper function to handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow all origins
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}


export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const apiKey = authHeader?.split(' ')[1];
  const requestUrl = new URL(request.url);
  const endpoint = requestUrl.pathname;
  let tenantDoc;
  let tenant;

  // --- CORS Headers for the actual POST response ---
  const responseHeaders = {
    'Access-Control-Allow-Origin': '*', // Allow all origins
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (!apiKey) {
    await logApiRequest({
        status: 'Failure',
        endpoint,
        message: 'Authentication error: Missing API key.',
    });
    return NextResponse.json({ error: 'Unauthorized: API key is required.' }, { status: 401, headers: responseHeaders });
  }

  try {
    const firestore = getDb();
    const tenantsSnapshot = await firestore.collection('tenants').where('apiKey', '==', apiKey).limit(1).get();
    
    if (tenantsSnapshot.empty) {
        await logApiRequest({
            status: 'Failure',
            endpoint,
            message: 'Authentication error: Invalid API key provided.',
        });
        return NextResponse.json({ error: 'Unauthorized: Invalid API key.' }, { status: 401, headers: responseHeaders });
    }

    tenantDoc = tenantsSnapshot.docs[0];
    tenant = tenantDoc?.data();

  } catch (dbError: any) {
      console.error('FIRESTORE_CONNECTION_ERROR: Failed to connect to Firestore to validate API key.', {
          errorMessage: dbError.message,
          endpoint,
      });
      return NextResponse.json({ error: 'Internal Server Error: Could not verify credentials.' }, { status: 500, headers: responseHeaders });
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
      return NextResponse.json({ error: 'Invalid transaction details provided.' }, { status: 400, headers: responseHeaders });
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

    console.log('API_TRANSACTION_SUCCESS: A transaction was processed.', { transaction: transaction, tenant: tenant.name });

    return NextResponse.json(transaction, { status: 201, headers: responseHeaders });

  } catch (error: any) {
    if (error instanceof SyntaxError) {
        console.warn('API_INVALID_JSON: Failed to parse request body.', { path: endpoint, tenant: tenant.name });
        return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400, headers: responseHeaders });
    }

    console.error('API_TRANSACTION_UNHANDLED_EXCEPTION: Unhandled error in endpoint.', {
      path: endpoint,
      tenant: tenant.name,
      errorMessage: error.message,
      errorStack: error.stack,
    });
    
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500, headers: responseHeaders });
  }
}
