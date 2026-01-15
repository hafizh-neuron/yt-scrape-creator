import {
  ChannelService,
  VideoService,
  SearchService,
  PlaylistService,
  CommunityService,
  BalanceService,
  config,
} from "./index";

async function runTests() {
  console.log("Starting YouTube Services Verification...");

  // Initialize Services
  const channelService = new ChannelService(config);
  const videoService = new VideoService(config);
  const searchService = new SearchService(config);
  const playlistService = new PlaylistService(config);
  const communityService = new CommunityService(config);
  const balanceService = new BalanceService(config);

  const TEST_CHANNEL_HANDLE = "@MrBeast";
  const TEST_VIDEO_URL = "https://www.youtube.com/watch?v=0e3GPea1Tyg"; // MrBeast Video

  try {
    // 0. Test Balance
    console.log("\n--- Testing Balance ---");
    const balance = await balanceService.getBalance();
    console.log("Current Credit Balance:", balance.creditCount);

    // 1. Test Channel Shorts
    console.log("\n--- Testing Channel Shorts ---");
    const shorts = await channelService.getChannelData({
      handle: TEST_CHANNEL_HANDLE,
    });
    console.log(
      "Channel Shorts fetched:",
      shorts.channelShorts?.shorts?.length || 0
    );

    // 2. Test Video Details
    console.log("\n--- Testing Video Details ---");
    const videoDetail = await videoService.getVideoDetails(
      TEST_VIDEO_URL,
      true
    );
    console.log("Video Title:", videoDetail.title);
    console.log("Transcript available:", !!videoDetail.transcript);

    // 3. Test Search
    console.log("\n--- Testing Search ---");
    const searchRes = await searchService.search({
      query: "MrBeast",
      sortBy: "relevance",
    });
    console.log("Search Results (Videos):", searchRes.videos?.length);

    // 4. Test Trending Shorts
    console.log("\n--- Testing Trending Shorts ---");
    const trending = await searchService.getTrendingShorts();
    console.log("Trending Shorts count:", trending.shorts?.length);

    // 5. Test Playlist
    console.log("\n--- Testing Playlist ---");
    try {
      const searchPlaylist = await searchService.search({
        query: "MrBeast Gaming playlist",
      });
      const validPlaylist = searchPlaylist.playlists?.[0];
      if (validPlaylist) {
        const playlistRes = await playlistService.getPlaylist(
          validPlaylist.playlistId
        );
        console.log("Playlist Title:", playlistRes.title);
      } else {
        console.log(
          "Skipping Playlist Test (No public playlist found in search)"
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Playlist Test Failed:", error.message);
      } else {
        console.log("Playlist Test Failed: Unknown error");
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Verification Failed:", error.message);
    } else {
      console.error("Verification Failed: Unknown error");
    }
  }
}

runTests();
