// src/ai/genkit.ts
import {genkit} from 'genkit';
import {googleAI} from 'genkit/googleai';

// Ensure GOOGLE_API_KEY or GEMINI_API_KEY is set in your .env file
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  logLevel: 'info', // Or 'debug' for more verbosity in development
  enableTracingAndMetrics: true, // Good for development and debugging
});
