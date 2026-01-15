import { BaseRepository } from "./base.repository";
import { PlaylistResult, PlaylistQueryParams } from "../models/playlist.model";

export class PlaylistRepository extends BaseRepository {
  async getPlaylist(params: PlaylistQueryParams): Promise<PlaylistResult> {
    return this.get<PlaylistResult>("/v1/youtube/playlist", params);
  }
}
