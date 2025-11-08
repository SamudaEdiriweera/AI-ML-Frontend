// src/services/apiService.ts

import { apiBaseUrls, ApiProject } from '@/config/apiConfig';

// Define a more structured options object for flexibility
interface ApiOptions {
  endpoint: string; // e.g., '/predict' or '/status'
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any; // The data to send, for POST/PUT requests
}

/**
 * A generic and reusable function to call any of our AI/ML service endpoints.
 * @param project The name of the project/model to call (e.g., 'finTrustAI').
 * @param options An object containing the endpoint, method, and body.
 * @returns The JSON response from the API.
 */
export async function callApi(project: ApiProject, options: ApiOptions) {
  // Get the base URL for the requested project
  const baseUrl = apiBaseUrls[project];
  
  if (!baseUrl) {
    throw new Error(`API base URL for project "${project}" is not defined.`);
  }

  // Combine the base URL and the specific endpoint path
  const fullUrl = `${baseUrl}${options.endpoint}`;

  // Set up the request configuration
  const config: RequestInit = {
    method: options.method || 'POST', // Default to POST if not specified
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Only add a body to the request if one was provided
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(fullUrl, config);

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    // Handle responses that might not have a JSON body (like a 204 No Content)
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json();
    }
    return; // Return undefined for non-JSON responses

  } catch (error) {
    console.error(`Failed to call API for ${project} at ${options.endpoint}:`, error);
    throw error;
  }
}