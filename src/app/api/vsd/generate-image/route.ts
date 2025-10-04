
import { NextResponse } from 'next/server';
import { generateImageFromHint } from '@/ai/flows/generate-image-from-hint-flow';
import { logger } from 'firebase-functions';

// This is a new "bridge" API route that is called from the client-side.
// It securely calls the internal image generation API using the server-side API key.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hint } = body;

    if (!hint || typeof hint !== 'string' || hint.trim() === '') {
      return NextResponse.json({ error: 'Invalid hint provided.' }, { status: 400 });
    }

    // This is the URL of the internal API running on the same Next.js server.
    // In a real production environment, you might get this from an environment variable.
    const internalApiUrl = new URL('/api/generate-image', request.url).toString();

    // Call the internal API from the backend, passing the secret key securely.
    const internalApiResponse = await fetch(internalApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.INTERNAL_API_KEY}`,
      },
      body: JSON.stringify({ hint }),
    });

    if (!internalApiResponse.ok) {
      const errorBody = await internalApiResponse.text();
      logger.error('Internal API call failed', { status: internalApiResponse.status, error: errorBody });
      return NextResponse.json({ error: 'Image generation service failed.' }, { status: internalApiResponse.status });
    }

    const result = await internalApiResponse.json();

    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    logger.error('API Bridge Error: /api/vsd/generate-image', {
      errorMessage: error.message,
      errorStack: error.stack,
    });
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
