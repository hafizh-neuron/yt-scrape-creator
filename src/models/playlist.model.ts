import { Video } from "./channel.model";

export interface PlaylistOwner {
  name: string;
  handle?: string;
  [key: string]: any;
}

export interface PlaylistResult {
  success: boolean;
  title: string;
  owner?: PlaylistOwner;
  totalVideos?: number;
  videos: Video[];
  [key: string]: any;
}

export interface PlaylistQueryParams {
  playlist_id: string;
}
