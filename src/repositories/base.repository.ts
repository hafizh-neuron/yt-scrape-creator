import axios, { AxiosInstance } from "axios";
import { ApiConfig } from "../models/api.model";

export abstract class BaseRepository {
  protected axiosInstance: AxiosInstance;
  protected apiKey: string;
  protected country: string;

  constructor(config: ApiConfig) {
    this.apiKey = config.apiKey;
    this.country = config.country || "ID";
    this.axiosInstance = axios.create({
      baseURL: config.baseUrl,
      headers: {
        "x-api-key": config.apiKey,
      },
    });
  }

  protected async get<T>(
    endpoint: string,
    params?: Record<string, any>,
    retries = 3,
    delayMs = 1000
  ): Promise<T> {
    let lastError: any;

    for (let attempt = 1; attempt <= retries + 1; attempt++) {
      try {
        const requestParams = {
          gl: this.country,
          ...params,
        };
        const response = await this.axiosInstance.get<T>(endpoint, {
          params: requestParams,
        });
        return response.data;
      } catch (error) {
        lastError = error;
        const isAxiosError = axios.isAxiosError(error);
        const status = isAxiosError ? error.response?.status : 0;

        // Retry only on 5xx server errors or network errors (no response)
        const shouldRetry =
          attempt <= retries &&
          ((status && status >= 500) || (isAxiosError && !error.response));

        if (!shouldRetry) {
          break;
        }

        console.warn(
          `⚠️ Request failed (Attempt ${attempt}/${
            retries + 1
          }). Retrying in ${delayMs}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        delayMs *= 2; // Exponential backoff
      }
    }

    if (axios.isAxiosError(lastError)) {
      throw new Error(
        `API Error: ${lastError.response?.status} - ${
          lastError.response?.data?.message || lastError.message
        }`
      );
    }
    throw lastError;
  }
}
