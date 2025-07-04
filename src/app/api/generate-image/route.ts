
import { NextResponse } from 'next/server';
import { generateImageFromHint } from '@/ai/flows/generate-image-from-hint-flow';
import { logger } from 'firebase-functions';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const apiKey = authHeader?.split(' ')[1];

  if (!process.env.INTERNAL_API_KEY || apiKey !== process.env.INTERNAL_API_KEY) {
    logger.warn('API_AUTH_FAIL: Invalid or missing API key.', { path: '/api/generate-image' });
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { hint } = body;

    if (!hint || typeof hint !== 'string' || hint.trim() === '') {
      return NextResponse.json({ error: 'Invalid hint provided. Must be a non-empty string.' }, { status: 400 });
    }

    const result = await generateImageFromHint({ hint });

    if (!result || !result.imageDataUri) {
       return NextResponse.json({ error: 'AI generation failed to produce an image data URI.'}, { status: 500 });
    }

    return NextResponse.json(result, { status: 200 });

  } catch (error: any) {
    
    if (error instanceof SyntaxError) {
        logger.warn('API_INVALID_JSON: Failed to parse request body.', { path: '/api/generate-image' });
        return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    logger.error('API_GEN_IMG_UNHANDLED_EXCEPTION: Unhandled error in /api/generate-image endpoint.', {
      errorMessage: error.message,
      errorStack: error.stack,
    });
    
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
