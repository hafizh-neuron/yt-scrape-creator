# YouTube Scraper Context

## API Documentation

Base URL: `https://youtube-v2.scrapecreators.com` (To be confirmed with BaseRepository)

### 1. Channel Shorts

- **Endpoint**: `GET /v1/youtube/channel/shorts`
- **Description**: Get the shorts from a channel.
- **Params**:
  - `handle` (string, optional)
  - `channelId` (string, optional)
  - `sort` (string, optional): `newest` or `popular`
  - `continuationToken` (string, optional)
- **Response**:

```json
{
  "success": true,
  "shorts": [
    {
      "type": "short",
      "id": "Rdr8357wIRA",
      "url": "https://www.youtube.com/watch?v=Rdr8357wIRA",
      "title": "My app failed...",
      "viewCountInt": 8035
    }
  ],
  "continuationToken": "..."
}
```

### 2. Video/Shorts Details

- **Endpoint**: `GET /v1/youtube/video`
- **Description**: Get complete information about a video or short including transcript.
- **Params**:
  - `url` (string, required)
  - `get_transcript` (boolean, optional)
- **Response**:

```json
{
  "id": "Y2Ah_DFr8cw",
  "type": "video",
  "title": "Inside the NBA...",
  "viewCountInt": 358277,
  "transcript": [...],
  "transcript_only_text": "..."
}
```

### 3. Transcript

- **Endpoint**: `GET /v1/youtube/video/transcript`
- **Description**: Get transcript of a video or short.
- **Params**:
  - `url` (string, required)
- **Response**:

```json
{
  "videoId": "bjVIDXPP7Uk",
  "transcript": [...],
  "transcript_only_text": "...",
  "language": "English"
}
```

### 4. Search

- **Endpoint**: `GET /v1/youtube/search`
- **Description**: Search YouTube.
- **Params**:
  - `query` (string, required)
  - `uploadDate` (string, optional): `last_hour`, `today`, `this_week`, `this_month`, `this_year`
  - `sortBy` (string, optional): `relevance`, `upload_date`
  - `filter` (string, optional): `shorts`, etc.
  - `continuationToken` (string, optional)
  - `includeExtras` (string, optional)
- **Response**:

```json
{
  "videos": [...],
  "shorts": [...],
  "continuationToken": "..."
}
```

### 5. Search by Hashtag

- **Endpoint**: `GET /v1/youtube/search/hashtag`
- **Description**: Search by hashtag.
- **Params**:
  - `hashtag` (string, required)
  - `continuationToken` (string, optional)
  - `type` (string, optional): `all` or `shorts`
- **Response**:

```json
{
  "videos": [...],
  "continuationToken": "..."
}
```

### 6. Comments

- **Endpoint**: `GET /v1/youtube/video/comments`
- **Description**: Get comments from a video.
- **Params**:
  - `url` (string, required)
  - `continuationToken` (string, optional)
  - `order` (string, optional): `top` or `newest`
- **Response**:

```json
{
  "comments": [
    {
      "id": "...",
      "content": "...",
      "author": {...}
    }
  ],
  "continuationToken": "..."
}
```

### 7. Trending Shorts

- **Endpoint**: `GET /v1/youtube/shorts/trending`
- **Description**: Get trending shorts.
- **Params**: None
- **Response**:

```json
{
  "success": true,
  "shorts": [...]
}
```

### 8. Playlist

- **Endpoint**: `GET /v1/youtube/playlist`
- **Description**: Get videos of a playlist.
- **Params**:
  - `playlist_id` (string, required)
- **Response**:

```json
{
  "success": true,
  "title": "...",
  "videos": [...]
}
```

### 9. Community Post Detail

- **Endpoint**: `GET /v1/youtube/community-post`
- **Description**: Get details of a community post.
- **Params**:
  - `url` (string, required)
- **Response**:

```json
{
  "success": true,
  "id": "...",
  "content": "...",
  "likeCount": 759
}
```

## Implementation Plan

- **Services to Create/Update**:
  - `ChannelService` (existing): Add `getChannelShorts`
  - `VideoService` (new): `getVideoDetails`, `getTranscript`, `getComments`
  - `SearchService` (new): `search`, `searchHashtag`, `getTrendingShorts` (or separate)
  - `PlaylistService` (new): `getPlaylist`
  - `CommunityService` (new): `getPostDetail`

## CLI Usage

You can use the CLI to interact with the YouTube services.

### Commands

- **Channel Details & Videos**: `npm run youtube -- channel --name="<handle>"`
- **Channel Shorts**: `npm run youtube -- channel-shorts --handle="<handle>"`
- **Video Details**: `npm run youtube -- video-details --url="<video_url>"`
- **Video Transcript**: `npm run youtube -- transcript --url="<video_url>"`
- **Search**: `npm run youtube -- search --query="<query>"`
- **Search Hashtag**: `npm run youtube -- search-hashtag --hashtag="<hashtag>"`
- **Video Comments**: `npm run youtube -- comments --url="<video_url>"`
- **Trending Shorts**: `npm run youtube -- trending-shorts`
- **Playlist**: `npm run youtube -- playlist --playlistId="<id>"`
- **Community Post**: `npm run youtube -- community-post --url="<post_url>"`
- **Balance**: `npm run youtube -- balance`

### Global Options

- `--json`: Output result as JSON string.
- `--output` (`-o`): Save result to a file in `results/` directory (filename auto-generated).
- `--country` (`-c`): Set country code for API requests (default: "ID").

### Resilience

The application includes automatic retry logic (3 attempts with exponential backoff) for handling transient API errors (500-599) or network timeouts.
