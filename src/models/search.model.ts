import { Video } from "./channel.model";

export interface SearchResult {
  videos?: Video[];
  shorts?: Video[];
  channels?: any[];
  playlists?: any[];
  continuationToken?: string;
  [key: string]: any;
}

export interface HashtagResult {
  videos?: Video[];
  continuationToken?: string;
  [key: string]: any;
}

export interface SearchQueryParams {
  query?: string;
  hashtag?: string;
  uploadDate?: "last_hour" | "today" | "this_week" | "this_month" | "this_year";
  sortBy?: "relevance" | "upload_date";
  filter?: string;
  type?: "all" | "shorts";
  continuationToken?: string;
  includeExtras?: string;
}
