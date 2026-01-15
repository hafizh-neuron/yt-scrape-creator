export interface Video {
  videoId: string;
  title: string;
  publishedAt?: string;
  viewCount?: string;
  duration?: string;
  thumbnail?: string;
  [key: string]: any;
}

export interface ChannelDetail {
  channelId: string;
  title: string;
  handle?: string;
  description?: string;
  subscriberCount?: string;
  videoCount?: string;
  viewCount?: string;
  avatar?: string;
  banner?: string;
  [key: string]: any;
}

export interface ChannelVideosResponse {
  videos: Video[];
  continuationToken?: string;
  [key: string]: any;
}

export interface ChannelDetailResponse {
  channel: ChannelDetail;
  continuationToken?: string;
  [key: string]: any;
}

export interface ChannelQueryParams {
  channelId?: string;
  handle?: string;
  url?: string;
  sort?: "newest" | "popular";
  continuationToken?: string;
  includeExtras?: string;
}

export interface ChannelShortsResponse {
  shorts: Video[];
  continuationToken?: string;
  [key: string]: any;
}

export interface ChannelResult {
  channelDetail: ChannelDetailResponse;
  channelVideos: ChannelVideosResponse;
  channelShorts?: ChannelShortsResponse;
  fetchedAt: string;
}
