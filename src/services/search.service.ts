import { SearchRepository } from "../repositories/search.repository";
import { HashtagRepository } from "../repositories/hashtag.repository";
import { TrendingRepository } from "../repositories/trending.repository";
import { ApiConfig } from "../models/api.model";
import {
  SearchResult,
  HashtagResult,
  SearchQueryParams,
} from "../models/search.model";
import { TrendingShortsResponse } from "../models/trending.model";

export class SearchService {
  private searchRepo: SearchRepository;
  private hashtagRepo: HashtagRepository;
  private trendingRepo: TrendingRepository;

  constructor(config: ApiConfig) {
    this.searchRepo = new SearchRepository(config);
    this.hashtagRepo = new HashtagRepository(config);
    this.trendingRepo = new TrendingRepository(config);
  }

  async search(params: SearchQueryParams): Promise<SearchResult> {
    return this.searchRepo.search(params);
  }

  async searchHashtag(
    hashtag: string,
    type?: "all" | "shorts",
    continuationToken?: string
  ): Promise<HashtagResult> {
    return this.hashtagRepo.searchHashtag({ hashtag, type, continuationToken });
  }

  async getTrendingShorts(): Promise<TrendingShortsResponse> {
    return this.trendingRepo.getTrendingShorts();
  }
}
