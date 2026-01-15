export interface ApiConfig {
  apiKey: string;
  baseUrl: string;
  country?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  success: boolean;
  error?: string;
}
