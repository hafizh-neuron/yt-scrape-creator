#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as fs from "fs";
import * as path from "path";
import { ChannelService } from "./services/channel.service";
import { VideoService } from "./services/video.service";
import { SearchService } from "./services/search.service";
import { PlaylistService } from "./services/playlist.service";
import { CommunityService } from "./services/community.service";
import { BalanceService } from "./services/balance.service";
import { config, validateConfig } from "./config/config";

interface CommonArgs {
  json?: boolean;
}

// Helper to print result
// Helper to handle result (print or save)
const handleResult = (
  data: any,
  argv: any,
  context: { service: string; identifier?: string }
) => {
  if (argv.output) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    let safeId = "general";
    if (context.identifier) {
      safeId = context.identifier
        .replace(/[^a-zA-Z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      if (!safeId) safeId = "item";
    }
    const filename = `${context.service}-${safeId}-${timestamp}.json`;
    const resultsDir = path.join(process.cwd(), "results");

    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }

    const filePath = path.join(resultsDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Result saved to: ${filePath}`);
  } else {
    // Default behavior: print to console
    if (argv.json) {
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.dir(data, { depth: null, colors: true });
    }
  }
};

async function main() {
  try {
    // Validate configuration
    validateConfig();

    await yargs(hideBin(process.argv))
      .option("country", {
        alias: "c",
        type: "string",
        description: "Country code for API requests (e.g., ID, US)",
        default: config.country,
      })
      .option("output", {
        alias: "o",
        type: "boolean",
        description: "Save result to file in results/ directory",
        default: false,
      })
      .middleware((argv) => {
        if (argv.country) {
          config.country = argv.country as string;
        }
      })
      .command(
        "channel",
        "Fetch YouTube channel details and videos",
        (yargs) => {
          return yargs
            .option("name", {
              alias: "n",
              type: "string",
              description: "Channel handle or name",
              demandOption: true,
            })
            .option("json", { type: "boolean", description: "Output as JSON" });
        },
        async (argv) => {
          const channelService = new ChannelService(config);
          const result = await channelService.getChannelData({
            handle: argv.name as string,
            sort: "newest", // Default sort
            includeExtras: "true",
          });
          handleResult(result, argv, {
            service: "channel",
            identifier: argv.name as string,
          });
        }
      )
      .command(
        "channel-shorts",
        "Fetch shorts from a channel",
        (yargs) => {
          return yargs
            .option("handle", { type: "string", description: "Channel handle" })
            .option("channelId", { type: "string", description: "Channel ID" })
            .option("sort", {
              type: "string",
              choices: ["newest", "popular"],
              default: "newest",
            })
            .option("continuationToken", { type: "string" })
            .option("json", { type: "boolean", description: "Output as JSON" })
            .check((argv) => {
              if (!argv.handle && !argv.channelId) {
                throw new Error(
                  "Either --handle or --channelId must be provided"
                );
              }
              return true;
            });
        },
        async (argv) => {
          const channelService = new ChannelService(config);
          const result = await channelService.getChannelShorts({
            handle: argv.handle as string,
            channelId: argv.channelId as string,
            sort: argv.sort as "newest" | "popular", // Ensure type match
            continuationToken: argv.continuationToken as string,
          });
          handleResult(result, argv, {
            service: "channel-shorts",
            identifier: (argv.handle || argv.channelId) as string,
          });
        }
      )
      .command(
        "video-details",
        "Get video details",
        (yargs) => {
          return yargs
            .option("url", {
              type: "string",
              demandOption: true,
              description: "Video URL",
            })
            .option("getTranscript", { type: "boolean", default: false })
            .option("json", { type: "boolean", description: "Output as JSON" });
        },
        async (argv) => {
          const videoService = new VideoService(config);
          const result = await videoService.getVideoDetails(
            argv.url as string,
            argv.getTranscript as boolean
          );
          handleResult(result, argv, {
            service: "video-details",
            identifier: argv.url as string,
          });
        }
      )
      .command(
        "transcript",
        "Get video transcript",
        (yargs) => {
          return yargs
            .option("url", {
              type: "string",
              demandOption: true,
              description: "Video URL",
            })
            .option("json", { type: "boolean", description: "Output as JSON" });
        },
        async (argv) => {
          const videoService = new VideoService(config);
          const result = await videoService.getTranscript(argv.url as string);
          handleResult(result, argv, {
            service: "transcript",
            identifier: argv.url as string,
          });
        }
      )
      .command(
        "search",
        "Search YouTube",
        (yargs) => {
          return yargs
            .option("query", {
              type: "string",
              demandOption: true,
              description: "Search query",
            })
            .option("uploadDate", {
              type: "string",
              choices: [
                "last_hour",
                "today",
                "this_week",
                "this_month",
                "this_year",
              ],
            })
            .option("sortBy", {
              type: "string",
              choices: ["relevance", "upload_date"],
            })
            .option("filter", { type: "string" })
            .option("continuationToken", { type: "string" })
            .option("json", { type: "boolean", description: "Output as JSON" });
        },
        async (argv) => {
          const searchService = new SearchService(config);
          const result = await searchService.search({
            query: argv.query as string,
            uploadDate: argv.uploadDate as any,
            sortBy: argv.sortBy as any,
            filter: argv.filter as string,
            continuationToken: argv.continuationToken as string,
          });
          handleResult(result, argv, {
            service: "search",
            identifier: argv.query as string,
          });
        }
      )
      .command(
        "search-hashtag",
        "Search by hashtag",
        (yargs) => {
          return yargs
            .option("hashtag", {
              type: "string",
              demandOption: true,
              description: "Hashtag",
            })
            .option("type", { type: "string", choices: ["all", "shorts"] })
            .option("continuationToken", { type: "string" })
            .option("json", { type: "boolean", description: "Output as JSON" });
        },
        async (argv) => {
          const searchService = new SearchService(config);
          const result = await searchService.searchHashtag(
            argv.hashtag as string,
            argv.type as "all" | "shorts",
            argv.continuationToken as string
          );
          handleResult(result, argv, {
            service: "search-hashtag",
            identifier: argv.hashtag as string,
          });
        }
      )
      .command(
        "comments",
        "Get video comments",
        (yargs) => {
          return yargs
            .option("url", {
              type: "string",
              demandOption: true,
              description: "Video URL",
            })
            .option("order", { type: "string", choices: ["top", "newest"] })
            .option("continuationToken", { type: "string" })
            .option("json", { type: "boolean", description: "Output as JSON" });
        },
        async (argv) => {
          const videoService = new VideoService(config);
          const result = await videoService.getComments(
            argv.url as string,
            argv.order as "top" | "newest",
            argv.continuationToken as string
          );
          handleResult(result, argv, {
            service: "comments",
            identifier: argv.url as string,
          });
        }
      )
      .command(
        "trending-shorts",
        "Get trending shorts",
        (yargs) => {
          return yargs.option("json", {
            type: "boolean",
            description: "Output as JSON",
          });
        },
        async (argv) => {
          const searchService = new SearchService(config);
          const result = await searchService.getTrendingShorts();
          handleResult(result, argv, {
            service: "trending-shorts",
          });
        }
      )
      .command(
        "playlist",
        "Get playlist videos",
        (yargs) => {
          return yargs
            .option("playlistId", {
              type: "string",
              demandOption: true,
              description: "Playlist ID",
            })
            .option("json", { type: "boolean", description: "Output as JSON" });
        },
        async (argv) => {
          const playlistService = new PlaylistService(config);
          const result = await playlistService.getPlaylist(
            argv.playlistId as string
          );
          handleResult(result, argv, {
            service: "playlist",
            identifier: argv.playlistId as string,
          });
        }
      )
      .command(
        "community-post",
        "Get community post details",
        (yargs) => {
          return yargs
            .option("url", {
              type: "string",
              demandOption: true,
              description: "Post URL",
            })
            .option("json", { type: "boolean", description: "Output as JSON" });
        },
        async (argv) => {
          const communityService = new CommunityService(config);
          const result = await communityService.getPostDetail(
            argv.url as string
          );
          handleResult(result, argv, {
            service: "community-post",
            identifier: argv.url as string,
          });
        }
      )
      .command(
        "balance",
        "Get account balance",
        (yargs) => {
          return yargs.option("json", {
            type: "boolean",
            description: "Output as JSON",
          });
        },
        async (argv) => {
          const balanceService = new BalanceService(config);
          const result = await balanceService.getBalance();
          handleResult(result, argv, {
            service: "balance",
          });
        }
      )
      .demandCommand(1, "You need at least one command before moving on")
      .help()
      .alias("help", "h")
      .strict()
      .parse();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ Error: ${error.message}`);
    } else {
      console.error("❌ An unknown error occurred");
    }
    process.exit(1);
  }
}

main();
