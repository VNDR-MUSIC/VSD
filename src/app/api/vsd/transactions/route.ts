
import { NextResponse } from 'next/server';
import { logger } from 'firebase-functions';

// This is a new "bridge" API route that is called from the client-side.
// It securely calls the internal mock transaction API using the server-side API key.
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // This is the URL of the internal API running on the same Next.js server.
    const internalApiUrl = new URL('/api/transactions', request.url).toString();

    // Call the internal API from the backend, passing the secret key securely.
    const internalApiResponse = await fetch(internalApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.INTERNAL_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!internalApiResponse.ok) {
      const errorBody = await internalApiResponse.text();
      logger.error('Internal Transaction API call failed', { status: internalApiResponse.status, error: errorBody });
      return NextResponse.json({ error: 'Transaction service failed.' }, { status: internalApiResponse.status });
    }

    const result = await internalApiResponse.json();

    return NextResponse.json(result, { status: 201 });

  } catch (error: any) {
    logger.error('API Bridge Error: /api/vsd/transactions', {
      errorMessage: error.message,
      errorStack: error.stack,
    });
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
