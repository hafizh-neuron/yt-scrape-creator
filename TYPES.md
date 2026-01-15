# Type Definitions Reference

## Core Types

### Channel & Video Scraper Models

#### ChannelQueryParams

Parameters for channel API queries.

```typescript
interface ChannelQueryParams {
  channelId?: string;
  handle?: string;
  url?: string;
  sort?: "latest" | "popular";
  continuationToken?: string;
  includeExtras?: string;
}
```

#### VideoDetail

Structure for detailed video information including transcripts.

```typescript
interface VideoDetail {
  id: string;
  type: string;
  title: string;
  viewCountInt?: number;
  transcript?: TranscriptItem[];
  transcript_only_text?: string;
  publishedDate?: string;
  description?: string;
  channel?: {
    id: string;
    name: string;
    handle: string;
  };
}
```

#### SearchQueryParams

Parameters for search and hashtag queries.

```typescript
interface SearchQueryParams {
  query?: string;
  hashtag?: string;
  uploadDate?: "last_hour" | "today" | "this_week" | "this_month" | "this_year";
  sortBy?: "relevance" | "upload_date";
  filter?: string;
  type?: "all" | "shorts";
  continuationToken?: string;
}
```

#### SearchResult

Response structure for search queries.

```typescript
interface SearchResult {
  videos?: Video[];
  shorts?: Video[];
  channels?: any[];
  playlists?: any[];
  continuationToken?: string;
}
```

#### PlaylistResult

Structure for playlist metadata and videos.

```typescript
interface PlaylistResult {
  success: boolean;
  title: string;
  owner?: { name: string; handle?: string };
  totalVideos?: number;
  videos: Video[];
}
```

#### CommunityPost

Structure for community post details.

```typescript
interface CommunityPost {
  success?: boolean;
  id: string;
  content: string;
  likeCount?: number;
  publishedTime?: string;
  images?: string[];
}
```

#### TrendingShortsResponse

Response for trending shorts.

```typescript
interface TrendingShortsResponse {
  success: boolean;
  shorts: Video[];
}
```

#### BalanceResponse

Response for credit balance check.

```typescript
interface BalanceResponse {
  creditCount: number;
}
```

## Configuration Types

### ApiConfig

API configuration object.

```typescript
interface ApiConfig {
  apiKey: string; // ScrapeCreators API key
  baseUrl: string; // API base URL
}
```
