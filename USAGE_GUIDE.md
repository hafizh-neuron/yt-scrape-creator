# Step-by-Step Usage Guide

## Prerequisites

- Node.js installed (v16 or higher recommended)
- npm installed
- ScrapeCreators API key

## Step 1: Initial Setup

### Install Dependencies

```bash
cd /media/E/PROJECTS/cypress/yt-scrapper
npm install
```

Expected output:

```
added 62 packages...
```

## Step 2: Configure API Key

### Edit the .env file

```bash
nano .env
# or
vim .env
# or
code .env
```

Add your API key:

```
SCRAPECREATORS_API_KEY=your_actual_api_key_here
```

**⚠️ Important:** Replace `your_actual_api_key_here` with your real API key from ScrapeCreators.

## Step 3: Verify Setup

### Test the configuration

```bash
npm run build
```

Expected output:

```
> yt-scrapper@1.0.0 build
> tsc
```

No errors = setup successful! ✅

## Step 4: Run Your First Scrape

### Basic Usage

```bash
npm run youtube -- channel --name="ThePatMcAfeeShow"
```

**What happens:**

1. CLI validates your API key
2. Fetches channel details from ScrapeCreators API
3. Fetches channel videos from ScrapeCreators API
4. Combines the data
5. Prints the result to the console

### Expected Output

```
{
  channelDetail: {
    success: true,
    credits_remaining: 69,
    ...
  },
  channelVideos: { ... },
  fetchedAt: '2024-05-22T...'
}
```

### Save to File (JSON)

```bash
npm run youtube -- channel --name="ThePatMcAfeeShow" --json > result.json
```

## Step 5: View Results

### Check the saved file

```bash
cat result.json | jq .
# or without jq:
cat result.json
```

### Open in VS Code

```bash
code result.json
```

## Step 6: Scrape Other Channels

### Find a Channel Handle

1. Go to YouTube
2. Navigate to a channel
3. Look at the URL: `youtube.com/@ChannelHandle`
4. Use the part after `@`

### Examples

```bash
# MrBeast
npm run youtube -- channel --name="MrBeast"

# MKBHD (Marques Brownlee)
npm run youtube -- channel --name="mkbhd"

# Linus Tech Tips
npm run youtube -- channel --name="LinusTechTips"

# Any channel
npm run youtube -- channel --name="<handle>"
```

## Step 7: Batch Processing (Optional)

### Edit examples.sh

```bash
nano examples.sh
```

Add your channels:

```bash
CHANNELS=(
    "ThePatMcAfeeShow"
    "MrBeast"
    "mkbhd"
    "LinusTechTips"
)
```

### Run batch script

```bash
./examples.sh
```

## Step 8: Expanded CLI Capabilities

You can now use the CLI for more than just channel data.

### 1. Fetch Channel Shorts

```bash
npm run youtube -- channel-shorts --handle="MrBeast" --sort="popular"
```

### 2. Get Video Details & Transcript

```bash
npm run youtube -- video-details --url="https://www.youtube.com/watch?v=..." --getTranscript
```

### 3. Search Videos

```bash
npm run youtube -- search --query="Typescript tutorial" --sortBy="relevance"
```

### 4. Get Trending Shorts

```bash
npm run youtube -- trending-shorts
```

### 5. Check Balance

```bash
npm run youtube -- balance
```

### 6. Country Configuration

You can specify the country/region for API requests (default is "ID" - Indonesia).

```bash
# Search with US context
npm run youtube -- --country="US" search --query="Trending"

# Get trending shorts in Brazil
npm run youtube -- -c "BR" trending-shorts
```

### 7. File Output

You can automatically save the result to a JSON file in the `results/` directory using the `--output` (or `-o`) flag. The filename will be auto-generated in the format `<service>-<identifier>-<timestamp>.json`.

```bash
# Save channel data to file
npm run youtube -- channel --name="MrBeast" --output

# Result saved to: /path/to/results/channel-MrBeast-2024-05-22T10-30-00-000Z.json
```

## Step 9: Programmatic Usage (Advanced)

### Create a custom script

```typescript
// my-script.ts
import {
  ChannelService,
  VideoService,
  SearchService,
  BalanceService,
} from "./src";
import { config, validateConfig } from "./src/config/config";

async function scrapeChannels() {
  validateConfig();

  const channelService = new ChannelService(config);
  const channels = ["ThePatMcAfeeShow", "MrBeast", "mkbhd"];

  for (const channel of channels) {
    console.log(`Scraping ${channel}...`);
    await channelService.fetchAndSaveChannel(channel);
  }
}

async function otherServicesExample() {
  validateConfig();

  // 1. Video Details
  const videoService = new VideoService(config);
  const details = await videoService.getVideoDetails(
    "https://youtube.com/watch?v=...",
    true
  );
  console.log("Transcript:", details.transcript);

  // 2. Search
  const searchService = new SearchService(config);
  const results = await searchService.search({ query: "Typescript tutorial" });
  console.log("Search Results:", results.videos);

  // 3. Balance
  const balanceService = new BalanceService(config);
  const balance = await balanceService.getBalance();
  console.log("Credits:", balance.creditCount);
}

scrapeChannels();
```

### Run it

```bash
ts-node my-script.ts
```

## Common Use Cases

### 1. Get Latest Videos

Default behavior - fetches latest videos:

```bash
npm run youtube -- channel --name="ChannelName"
```

### 2. Check Multiple Channels Daily

Create a cron job:

```bash
# Edit crontab
crontab -e

# Add this line (runs daily at 9 AM):
0 9 * * * cd /media/E/PROJECTS/cypress/yt-scrapper && ./examples.sh
```

### 3. Compare Channel Data

```bash
# Scrape today
npm run youtube -- channel --name="MrBeast"
# File: MrBeast-result.json

# Scrape tomorrow
npm run youtube -- channel --name="MrBeast"
# File overwrites - manually backup if needed
```

## Troubleshooting

### Error: "SCRAPECREATORS_API_KEY is not set"

**Solution:**

```bash
# Check .env file exists
ls -la .env

# Check it has content
cat .env

# Should show:
SCRAPECREATORS_API_KEY=your_key_here
```

### Error: "Cannot find module"

**Solution:**

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Error: "API Error: 401"

**Reason:** Invalid API key

**Solution:**

- Verify your API key on ScrapeCreators dashboard
- Check for extra spaces in .env file
- Regenerate API key if needed

### Error: "API Error: 404"

**Reason:** Channel not found

**Solution:**

- Double-check the channel handle
- Try using the exact handle from YouTube URL
- Some channels may not be accessible via handle

### Error: "ENOENT: no such file or directory"

**Reason:** Results directory doesn't exist

**Solution:**
The app creates it automatically, but if needed:

```bash
mkdir -p src/results/channel
```

## Tips & Best Practices

### 1. Rate Limiting

Add delays between requests:

```bash
# In examples.sh, uncomment:
sleep 2
```

### 2. Backup Results

```bash
# Create backups folder
mkdir -p backups

# Backup results
cp -r src/results/channel backups/channel-$(date +%Y%m%d)
```

### 3. Check API Usage

Monitor your API quota on ScrapeCreators dashboard.

### 4. Version Control

```bash
# Never commit .env file
git add .
git commit -m "Add channel scraping results"
git push
```

### 5. Automation

Create a systemd service or use PM2 for scheduled scraping:

```bash
# Using PM2
npm install -g pm2
pm2 start examples.sh --cron "0 9 * * *"
```

## Next Steps

1. ✅ Scrape your first channel
2. ✅ Examine the JSON output
3. ✅ Try multiple channels
4. 📊 Analyze the data
5. 🚀 Build something cool!

## Need Help?

- Check `ARCHITECTURE.md` for technical details
- Review `TYPES.md` for data structures
- Read `PROJECT_SUMMARY.md` for overview
- Examine source code in `src/`

Happy scraping! 🎉
