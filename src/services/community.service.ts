import { CommunityRepository } from "../repositories/community.repository";
import { ApiConfig } from "../models/api.model";
import { CommunityPost } from "../models/community.model";

export class CommunityService {
  private communityRepo: CommunityRepository;

  constructor(config: ApiConfig) {
    this.communityRepo = new CommunityRepository(config);
  }

  async getPostDetail(url: string): Promise<CommunityPost> {
    return this.communityRepo.getPostDetail({ url });
  }
}
