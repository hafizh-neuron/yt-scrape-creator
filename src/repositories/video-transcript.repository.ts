import { BaseRepository } from "./base.repository";
import { TranscriptResponse, VideoQueryParams } from "../models/video.model";

export class VideoTranscriptRepository extends BaseRepository {
  async getTranscript(params: VideoQueryParams): Promise<TranscriptResponse> {
    return this.get<TranscriptResponse>("/v1/youtube/video/transcript", params);
  }
}
