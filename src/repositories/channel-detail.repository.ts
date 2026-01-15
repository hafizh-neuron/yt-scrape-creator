import { BaseRepository } from "./base.repository";
import {
  ChannelDetailResponse,
  ChannelQueryParams,
} from "../models/channel.model";

export class ChannelDetailRepository extends BaseRepository {
  private readonly endpoint = "/v1/youtube/channel";

  async getChannelDetail(
    params: ChannelQueryParams
  ): Promise<ChannelDetailResponse> {
    const queryParams: Record<string, string> = {};

    if (params.channelId) queryParams.channelId = params.channelId;
    if (params.handle) queryParams.handle = params.handle;
    if (params.url) queryParams.url = params.url;
    if (params.sort) queryParams.sort = params.sort;
    if (params.continuationToken)
      queryParams.continuationToken = params.continuationToken;
    if (params.includeExtras) queryParams.includeExtras = params.includeExtras;

    return this.get<ChannelDetailResponse>(this.endpoint, queryParams);
  }
}
