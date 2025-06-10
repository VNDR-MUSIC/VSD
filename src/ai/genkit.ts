// src/ai/genkit.ts
import {genkit, configureGenkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Ensure GOOGLE_API_KEY or GEMINI_API_KEY is set in your .env file

// Initialize Genkit core with plugins and get the ai object
export const ai = genkit({
  plugins: [
    googleAI(), // GOOGLE_API_KEY or GEMINI_API_KEY should be in .env
  ],
});

// Configure logging and tracing separately
configureGenkit({
  logLevel: 'info', // Or 'debug' for more verbosity in development
  enableTracingAndMetrics: true, // Good for development and debugging
});
