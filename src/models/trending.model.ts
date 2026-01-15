import { Video } from "./channel.model";

export interface TrendingShortsResponse {
  success: boolean;
  shorts: Video[];
  [key: string]: any;
}
