import { BaseRepository } from "./base.repository";
import { SearchResult, SearchQueryParams } from "../models/search.model";

export class SearchRepository extends BaseRepository {
  async search(params: SearchQueryParams): Promise<SearchResult> {
    return this.get<SearchResult>("/v1/youtube/search", params);
  }
}
