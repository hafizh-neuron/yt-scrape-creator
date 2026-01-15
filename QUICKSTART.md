# Quick Start Guide

## 1. Installation

```bash
# Install dependencies
npm install
```

## 2. Configuration

Add your API key to `.env`:

```bash
SCRAPECREATORS_API_KEY=your_actual_api_key_here
```

## 3. Usage

### Fetch Channel Data

```bash
npm run youtube -- channel --name="ThePatMcAfeeShow"
```

This will:

- Fetch channel details (metadata, subscriber count, etc.)
- Fetch channel videos (latest videos)
- Save everything to `src/results/channel/ThePatMcAfeeShow-result.json`

### Example with Different Channels

```bash
# MrBeast
npm run youtube -- channel --name="MrBeast"

# MKBHD
npm run youtube -- channel --name="mkbhd"

# Any channel handle
npm run youtube -- channel --name="<channel-handle>"
```

## 4. Output

Results are saved in JSON format:

**Location:** `src/results/channel/<channel-name>-result.json`

**Structure:**

```json
{
  "channelDetail": {
    "channel": {
      "channelId": "...",
      "title": "...",
      "handle": "...",
      "subscriberCount": "...",
      ...
    },
    "continuationToken": "..."
  },
  "channelVideos": {
    "videos": [
      {
        "videoId": "...",
        "title": "...",
        "publishedAt": "...",
        "viewCount": "...",
        ...
      }
    ],
    "continuationToken": "..."
  },
  "fetchedAt": "2025-12-04T..."
}
```

## 5. Programmatic Usage

You can also use this as a library:

```typescript
import { fetchChannelData } from "./src/index";

const filePath = await fetchChannelData("ThePatMcAfeeShow");
console.log(`Data saved to: ${filePath}`);
```

## 6. Building for Production

```bash
# Compile TypeScript
npm run build

# Run compiled version
npm start
```

## Troubleshooting

### "SCRAPECREATORS_API_KEY is not set"

- Make sure you created `.env` file
- Verify the API key is set correctly

### "API Error: 401"

- Your API key is invalid or expired
- Check your ScrapeCreators account

### "API Error: 404"

- Channel handle not found
- Try using the exact handle from YouTube URL
- Example: youtube.com/@ThePatMcAfeeShow → use "ThePatMcAfeeShow"

## Advanced Options

To modify query parameters, edit `src/services/channel.service.ts`:

```typescript
const params: ChannelQueryParams = {
  handle: channelName,
  sort: "latest", // Change to 'popular'
  includeExtras: "true", // Set to 'false' for less data
};
```
