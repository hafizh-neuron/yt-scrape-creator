import { ChannelDetailRepository } from "../repositories/channel-detail.repository";
import { ChannelVideosRepository } from "../repositories/channel-videos.repository";
import { ChannelShortsRepository } from "../repositories/channel-shorts.repository";
import { ApiConfig } from "../models/api.model";
import { ChannelResult, ChannelQueryParams } from "../models/channel.model";
import * as fs from "fs";
import * as path from "path";

export class ChannelService {
  private channelDetailRepo: ChannelDetailRepository;
  private channelVideosRepo: ChannelVideosRepository;
  private channelShortsRepo: ChannelShortsRepository;

  constructor(config: ApiConfig) {
    this.channelDetailRepo = new ChannelDetailRepository(config);
    this.channelVideosRepo = new ChannelVideosRepository(config);
    this.channelShortsRepo = new ChannelShortsRepository(config);
  }

  async getChannelData(params: ChannelQueryParams): Promise<ChannelResult> {
    try {
      // Fetch channel detail, videos, and shorts in parallel
      const [channelDetail, channelVideos, channelShorts] = await Promise.all([
        this.channelDetailRepo.getChannelDetail(params),
        this.channelVideosRepo.getChannelVideos(params),
        this.channelShortsRepo.getChannelShorts(params),
      ]);

      return {
        channelDetail,
        channelVideos,
        channelShorts,
        fetchedAt: new Date().toISOString(),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch channel data: ${error.message}`);
      }
      throw error;
    }
  }

  async getChannelShorts(params: ChannelQueryParams) {
    try {
      return await this.channelShortsRepo.getChannelShorts(params);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch channel shorts: ${error.message}`);
      }
      throw error;
    }
  }

  async saveChannelData(
    channelName: string,
    data: ChannelResult
  ): Promise<string> {
    const resultsDir = path.join(process.cwd(), "src", "results", "channel");

    // Create directory if it doesn't exist
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }

    const fileName = `${channelName}-result.json`;
    const filePath = path.join(resultsDir, fileName);

    // Write JSON file with pretty formatting
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    return filePath;
  }

  async fetchAndSaveChannel(channelName: string): Promise<string> {
    const params: ChannelQueryParams = {
      handle: channelName,
      sort: "newest",
      includeExtras: "true",
    };

    const channelData = await this.getChannelData(params);
    const filePath = await this.saveChannelData(channelName, channelData);

    return filePath;
  }
}
