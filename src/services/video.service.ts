import { VideoDetailRepository } from "../repositories/video-detail.repository";
import { VideoTranscriptRepository } from "../repositories/video-transcript.repository";
import { VideoCommentsRepository } from "../repositories/video-comments.repository";
import { ApiConfig } from "../models/api.model";
import {
  VideoDetail,
  TranscriptResponse,
  VideoCommentsResponse,
  VideoQueryParams,
} from "../models/video.model";

export class VideoService {
  private detailRepo: VideoDetailRepository;
  private transcriptRepo: VideoTranscriptRepository;
  private commentsRepo: VideoCommentsRepository;

  constructor(config: ApiConfig) {
    this.detailRepo = new VideoDetailRepository(config);
    this.transcriptRepo = new VideoTranscriptRepository(config);
    this.commentsRepo = new VideoCommentsRepository(config);
  }

  async getVideoDetails(
    url: string,
    getTranscript: boolean = false
  ): Promise<VideoDetail> {
    return this.detailRepo.getVideoDetail({
      url,
      get_transcript: getTranscript,
    });
  }

  async getTranscript(url: string): Promise<TranscriptResponse> {
    return this.transcriptRepo.getTranscript({ url });
  }

  async getComments(
    url: string,
    order?: "top" | "newest",
    continuationToken?: string
  ): Promise<VideoCommentsResponse> {
    return this.commentsRepo.getComments({ url, order, continuationToken });
  }
}
