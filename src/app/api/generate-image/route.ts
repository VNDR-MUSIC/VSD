
'use server';

import { NextResponse } from 'next/server';
import { generateImageFromHint } from '@/ai/flows/generate-image-from-hint-flow';

export async function POST(request: Request) {
  // This API route is protected by the global API key check in middleware or can be added here.
  // For simplicity, we'll assume a central check exists. If not, the check from `/api/transactions` should be replicated.
  
  try {
    const body = await request.json();
    const { hint } = body;

    if (!hint || typeof hint !== 'string' || hint.trim() === '') {
      console.warn('GENERATE_IMAGE_API_VALIDATION_FAIL: Hint is missing or invalid.');
      return NextResponse.json({ error: 'A valid "hint" is required.' }, { status: 400 });
    }
    
    // Call the Genkit flow from the backend
    const result = await generateImageFromHint({ hint });
    
    if (!result || !result.imageDataUri) {
        console.error('GENERATE_IMAGE_API_EMPTY_RESPONSE: Genkit flow did not return image data.', { hint });
        return NextResponse.json({ error: 'Image generation failed on the server.' }, { status: 500 });
    }

    // Return the successful response from the flow
    return NextResponse.json(result);

  } catch (error: any) {
    if (error instanceof SyntaxError) {
        console.warn('GENERATE_IMAGE_API_INVALID_JSON: Failed to parse request body.');
        return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    console.error('GENERATE_IMAGE_API_UNHANDLED_EXCEPTION: An unhandled error occurred.', {
      errorMessage: error.message,
      errorStack: error.stack,
    });
    
    // Return a generic server error to the client
    return NextResponse.json({ error: 'An internal server error occurred during image generation.' }, { status: 500 });
  }
}
