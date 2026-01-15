export interface TranscriptItem {
  text: string;
  startMs: string;
  endMs: string;
  startTimeText: string;
  [key: string]: any;
}

export interface VideoDetail {
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
    [key: string]: any;
  };
  [key: string]: any;
}

export interface TranscriptResponse {
  videoId: string;
  url: string;
  transcript: TranscriptItem[];
  transcript_only_text?: string;
  language?: string;
  [key: string]: any;
}

export interface CommentAuthor {
  name: string;
  channelId: string;
  avatar?: string;
  [key: string]: any;
}

export interface CommentEngagement {
  likes: number;
  replies: number;
  [key: string]: any;
}

export interface Comment {
  id: string;
  content: string;
  author: CommentAuthor;
  engagement: CommentEngagement;
  [key: string]: any;
}

export interface VideoCommentsResponse {
  comments: Comment[];
  continuationToken?: string;
  [key: string]: any;
}

export interface VideoQueryParams {
  url?: string;
  get_transcript?: boolean;
  order?: "top" | "newest";
  continuationToken?: string;
}
