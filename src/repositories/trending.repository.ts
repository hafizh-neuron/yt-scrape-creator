import { BaseRepository } from "./base.repository";
import { TrendingShortsResponse } from "../models/trending.model";

export class TrendingRepository extends BaseRepository {
  async getTrendingShorts(): Promise<TrendingShortsResponse> {
    return this.get<TrendingShortsResponse>("/v1/youtube/shorts/trending");
  }
}
