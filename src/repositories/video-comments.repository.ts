import { BaseRepository } from "./base.repository";
import { VideoCommentsResponse, VideoQueryParams } from "../models/video.model";

export class VideoCommentsRepository extends BaseRepository {
  async getComments(params: VideoQueryParams): Promise<VideoCommentsResponse> {
    return this.get<VideoCommentsResponse>(
      "/v1/youtube/video/comments",
      params
    );
  }
}
