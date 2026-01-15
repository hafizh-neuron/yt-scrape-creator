import { BaseRepository } from "./base.repository";
import { CommunityPost, CommunityQueryParams } from "../models/community.model";

export class CommunityRepository extends BaseRepository {
  async getPostDetail(params: CommunityQueryParams): Promise<CommunityPost> {
    return this.get<CommunityPost>("/v1/youtube/community-post", params);
  }
}
