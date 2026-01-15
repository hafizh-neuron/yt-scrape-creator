import { BaseRepository } from "./base.repository";
import { VideoDetail, VideoQueryParams } from "../models/video.model";

export class VideoDetailRepository extends BaseRepository {
  async getVideoDetail(params: VideoQueryParams): Promise<VideoDetail> {
    return this.get<VideoDetail>("/v1/youtube/video", params);
  }
}
