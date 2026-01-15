# YouTube Scraper

A TypeScript-based YouTube channel scraper using the ScrapeCreators API.

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

- **Node.js**: Version 18 or higher is recommended.
- **npm**: Comes with Node.js.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/yt-scrapper.git
    cd yt-scrapper
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Configuration

1.  **Environment Setup:**

    Copy the example environment file to create your local configuration:

    ```bash
    cp .env.example .env
    ```

2.  **API Key:**

    Open the `.env` file and add your ScrapeCreators API key:

    ```env
    SCRAPECREATORS_API_KEY=your_actual_api_key_here
    ```

    > **Note:** If you don't have a key, sign up at [ScrapeCreators](https://scrapecreators.com).

3.  **Database:**

    This project utilizes the ScrapeCreators API and **does not require a local database**. No `init db` or migration steps are needed.

## Usage

### Get Channel Information

```bash
npm run youtube -- channel --name="ThePatMcAfeeShow"
```

This will fetch both channel details and videos and output them to the console.

To get the output as JSON:

```bash
npm run youtube -- channel --name="ThePatMcAfeeShow" --json
```

npm run youtube -- channel --name="ThePatMcAfeeShow" --json > channel-result.json

````

Or let the CLI handle file saving automatically:

```bash
npm run youtube -- channel --name="ThePatMcAfeeShow" --output
````

### Country Configuration

Set the country context for API requests (default: ID).

```bash
npm run youtube -- --country="US" search --query="Trending"
```

### Available Commands

- **channel**: `npm run youtube -- channel --name="<handle>"`
- **channel-shorts**: `npm run youtube -- channel-shorts --handle="<handle>"`
- **video-details**: `npm run youtube -- video-details --url="<url>"`
- **transcript**: `npm run youtube -- transcript --url="<url>"`
- **search**: `npm run youtube -- search --query="<query>"`
- **search-hashtag**: `npm run youtube -- search-hashtag --hashtag="<tag>"`
- **trending-shorts**: `npm run youtube -- trending-shorts`
- **comments**: `npm run youtube -- comments --url="<url>"`
- **playlist**: `npm run youtube -- playlist --playlistId="<id>"`
- **community-post**: `npm run youtube -- community-post --url="<url>"`
- **balance**: `npm run youtube -- balance`

Add `--json` to output as JSON.
See `USAGE_GUIDE.md` for more details.

## Architecture

- **Models**: Data structures for channel, video, search, playlist, and community info
- **Repositories**: API communication layer for all endpoints
- **Services**: Business logic including Channel, Video, Search, Playlist, Community, and Balance services
- **CLI**: Command-line interface
# yt-scrape-creator
