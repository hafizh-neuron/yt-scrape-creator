import { PlaylistRepository } from "../repositories/playlist.repository";
import { ApiConfig } from "../models/api.model";
import { PlaylistResult } from "../models/playlist.model";

export class PlaylistService {
  private playlistRepo: PlaylistRepository;

  constructor(config: ApiConfig) {
    this.playlistRepo = new PlaylistRepository(config);
  }

  async getPlaylist(playlistId: string): Promise<PlaylistResult> {
    return this.playlistRepo.getPlaylist({ playlist_id: playlistId });
  }
}
