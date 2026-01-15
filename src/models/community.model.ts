export interface CommunityPost {
  success?: boolean;
  id: string;
  content: string;
  likeCount?: number;
  publishedTime?: string;
  images?: string[];
  [key: string]: any;
}

export interface CommunityQueryParams {
  url: string;
}
