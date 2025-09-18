// backend/src/config/cerebrasConfig.js
/**
 * Cerebras API configuration
 * Loads endpoint URL and API key from environment variables
 * Ensures no hardcoded credentials in code
 */

import dotenv from "dotenv";

// Load .env file
dotenv.config();

// Validate required environment variables
if (!process.env.CEREBRAS_API_KEY) {
  throw new Error(
    "CEREBRAS_API_KEY is missing in .env. Please add your Cerebras API key."
  );
}

if (!process.env.CEREBRAS_API_URL) {
  throw new Error(
    "CEREBRAS_API_URL is missing in .env. Please add the Cerebras API endpoint URL."
  );
}

// Export config object
const cerebrasConfig = {
  apiKey: process.env.CEREBRAS_API_KEY,
  apiUrl: process.env.CEREBRAS_API_URL,
};

export default cerebrasConfig;
