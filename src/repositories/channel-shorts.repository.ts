import { BaseRepository } from "./base.repository";
import {
  ChannelShortsResponse,
  ChannelQueryParams,
} from "../models/channel.model";

export class ChannelShortsRepository extends BaseRepository {
  async getChannelShorts(
    params: ChannelQueryParams
  ): Promise<ChannelShortsResponse> {
    return this.get<ChannelShortsResponse>(
      "/v1/youtube/channel/shorts",
      params
    );
  }
}
