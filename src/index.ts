import { ChannelService } from "./services/channel.service";
import { VideoService } from "./services/video.service";
import { SearchService } from "./services/search.service";
import { PlaylistService } from "./services/playlist.service";
import { CommunityService } from "./services/community.service";
import { BalanceService } from "./services/balance.service";
import { config, validateConfig } from "./config/config";

export * from "./models/api.model";
export * from "./models/channel.model";
export * from "./models/video.model";
export * from "./models/search.model";
export * from "./models/playlist.model";
export * from "./models/community.model";
export * from "./models/trending.model";
export * from "./models/balance.model";

export {
  ChannelService,
  VideoService,
  SearchService,
  PlaylistService,
  CommunityService,
  BalanceService,
  config,
  validateConfig,
};

// Main entry point for programmatic usage
export async function fetchChannelData(channelName: string): Promise<string> {
  validateConfig();
  const channelService = new ChannelService(config);
  return channelService.fetchAndSaveChannel(channelName);
}
