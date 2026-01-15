import { BaseRepository } from "./base.repository";
import { HashtagResult, SearchQueryParams } from "../models/search.model";

export class HashtagRepository extends BaseRepository {
  async searchHashtag(params: SearchQueryParams): Promise<HashtagResult> {
    return this.get<HashtagResult>("/v1/youtube/search/hashtag", params);
  }
}
