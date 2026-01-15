import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const config = {
  apiKey: process.env.SCRAPECREATORS_API_KEY || "",
  baseUrl: "https://api.scrapecreators.com",
  country: process.env.COUNTRY || "ID",
};

export function validateConfig(): void {
  if (!config.apiKey) {
    throw new Error(
      "SCRAPECREATORS_API_KEY is not set in environment variables"
    );
  }
}
