import { BaseRepository } from "./base.repository";
import {
  ChannelVideosResponse,
  ChannelQueryParams,
} from "../models/channel.model";

export class ChannelVideosRepository extends BaseRepository {
  private readonly endpoint = "/v1/youtube/channel-videos";

  async getChannelVideos(
    params: ChannelQueryParams
  ): Promise<ChannelVideosResponse> {
    const queryParams: Record<string, string> = {};

    if (params.channelId) queryParams.channelId = params.channelId;
    if (params.handle) queryParams.handle = params.handle;
    if (params.sort) queryParams.sort = params.sort;
    if (params.continuationToken)
      queryParams.continuationToken = params.continuationToken;
    if (params.includeExtras) queryParams.includeExtras = params.includeExtras;

    return this.get<ChannelVideosResponse>(this.endpoint, queryParams);
  }
}
