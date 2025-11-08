// src/config/apiConfig.ts

// Define a type for our project names for type safety
export type ApiProject = 'finTrustAI' | 'imageClassifier' | 'textGenerator';

// Create a mapping from our project name to its full API endpoint URL
// This is the single source of truth for all backend URLs.
export const apiBaseUrls: Record<ApiProject, string> = {
  finTrustAI: process.env.NEXT_PUBLIC_API_FINTRUSTAI_URL!,
  imageClassifier: process.env.NEXT_PUBLIC_API_IMAGECLASSIFY_URL!,
  textGenerator: process.env.NEXT_PUBLIC_API_TEXTGEN_URL!,
};

// The '!' tells TypeScript that we are sure these environment variables will exist.
// In a production app, you might add checks to ensure they are defined.