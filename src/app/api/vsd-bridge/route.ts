
'use server';

import { NextResponse } from 'next/server';
import axios from 'axios';

// This is the secure backend bridge. It receives a request from our own app's
// frontend (like the Audio Exchange demo), attaches the SECRET API key, 
// and forwards it to the main VSD Transaction API.

export async function POST(request: Request) {
  // Determine the target URL. Use the environment variable if available, otherwise default to localhost.
  // This allows the bridge to work in both production and local development.
  const VSD_API_URL = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/transactions`
    : 'http://localhost:9002/api/transactions';

  const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;

  if (!INTERNAL_API_KEY) {
    console.error('VSD_BRIDGE_ERROR: INTERNAL_API_KEY is not set in environment variables.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    const body = await request.json();

    // Forward the request to the actual VSD Transaction API, including the secret key.
    const vsdApiResponse = await axios.post(VSD_API_URL, body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${INTERNAL_API_KEY}`,
      },
    });

    // Return the response from the VSD API directly to the client that called the bridge.
    return NextResponse.json(vsdApiResponse.data, { status: vsdApiResponse.status });

  } catch (error: any) {
    console.error('VSD_BRIDGE_AXIOS_ERROR: Error forwarding request to VSD API.', {
      errorMessage: error.message,
      errorData: error.response?.data,
    });
    
    // If the downstream API returned an error, forward that error response.
    if (error.response) {
      return NextResponse.json(error.response.data, { status: error.response.status });
    }

    // Otherwise, return a generic gateway error.
    return NextResponse.json({ error: 'Failed to process transaction via VSD bridge.' }, { status: 502 });
  }
}
