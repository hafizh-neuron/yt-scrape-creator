# Architecture Documentation

## Overview

This project follows a **Model-Service-Repository** architecture pattern for clean separation of concerns.

```
┌─────────────┐
│     CLI     │ (User Interface)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Services   │ (Business Logic)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Repositories│ (Data Access)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  API/Data   │ (External APIs)
└─────────────┘
```

## Directory Structure

```
src/
├── cli.ts                          # Command-line interface entry point
├── index.ts                        # Main programmatic entry point
├── config/
│   └── config.ts                   # Configuration management
├── models/
│   ├── api.model.ts               # API-related type definitions
│   └── channel.model.ts           # Channel & video type definitions
├── repositories/
│   ├── base.repository.ts         # Base repository with common HTTP logic
│   ├── channel-detail.repository.ts
│   └── channel-videos.repository.ts
├── services/
│   └── channel.service.ts         # Business logic for channel operations
└── results/
    └── channel/                   # Stored JSON results
```

## Layer Responsibilities

### 1. Models (`src/models/`)

- Define TypeScript interfaces and types
- Provide type safety across the application
- Document data structures

**Files:**

- `api.model.ts`: API configuration and response types
- `channel.model.ts`: Channel, video, and query parameter types

### 2. Repositories (`src/repositories/`)

- Handle all HTTP communication with external APIs
- Manage request/response transformations
- Handle API errors gracefully

**Files:**

- `base.repository.ts`: Shared HTTP client setup and error handling
- `channel-detail.repository.ts`: Fetches channel metadata
- `channel-videos.repository.ts`: Fetches channel videos

**Key Features:**

- Centralized axios instance configuration
- Automatic API key injection via headers
- Type-safe request/response handling

### 3. Services (`src/services/`)

- Implement business logic
- Orchestrate multiple repository calls
- Handle data persistence (file system operations)
- Transform data for specific use cases

**Files:**

- `channel.service.ts`: Coordinates channel data fetching and storage

**Key Responsibilities:**

- Fetch channel details and videos in parallel
- Save results to JSON files
- Provide high-level API for CLI and programmatic usage

### 4. CLI (`src/cli.ts`)

- Command-line interface using `yargs`
- User-facing commands and argument parsing
- Error handling and user feedback

**Usage:**

```bash
npm run youtube -- channel --name="ThePatMcAfeeShow"
```

### 5. Configuration (`src/config/`)

- Environment variable management
- API configuration
- Validation of required settings

## API Endpoints

### Channel Detail

- **URL:** `https://api.scrapecreators.com/v1/youtube/channel`
- **Headers:** `x-api-key`
- **Query Params:**
  - `channelId` (string): YouTube channel ID
  - `handle` (string): Channel handle (e.g., ThePatMcAfeeShow)
  - `url` (string): Channel URL
  - `sort` (string): 'latest' or 'popular'
  - `continuationToken` (string): For pagination
  - `includeExtras` (string): 'true' for additional data

### Channel Videos

- **URL:** `https://api.scrapecreators.com/v1/youtube/channel-videos`
- **Headers:** `x-api-key`
- **Query Params:**
  - `channelId` (string): YouTube channel ID
  - `handle` (string): Channel handle
  - `sort` (string): 'latest'
  - `continuationToken` (string): For pagination
  - `includeExtras` (string): 'true' for additional data

## Data Flow Example

When running: `npm run youtube -- channel --name="ThePatMcAfeeShow"`

1. **CLI Layer** (`cli.ts`)

   - Parses command-line arguments
   - Validates `--name` parameter
   - Creates `ChannelService` instance

2. **Service Layer** (`channel.service.ts`)

   - Calls `fetchAndSaveChannel("ThePatMcAfeeShow")`
   - Creates query parameters with handle: "ThePatMcAfeeShow"
   - Calls repositories in parallel

3. **Repository Layer**

   - `ChannelDetailRepository.getChannelDetail(params)`
   - `ChannelVideosRepository.getChannelVideos(params)`
   - Both make HTTP GET requests to respective endpoints

4. **Data Processing**

   - Service receives both responses
   - Combines data into `ChannelResult` object
   - Adds timestamp

5. **Persistence**

   - Creates `src/results/channel/` directory if needed
   - Writes `ThePatMcAfeeShow-result.json`
   - Returns file path to CLI

6. **User Feedback**
   - CLI displays success message
   - Shows file location

## Error Handling

- **Configuration Errors**: Validates API key presence before execution
- **API Errors**: Caught in base repository, includes status codes and messages
- **File System Errors**: Handled in service layer during save operations
- **CLI Errors**: Graceful error messages displayed to user

## Extension Points

### Adding New Endpoints

1. Create a new model in `src/models/`
2. Create a new repository extending `BaseRepository`
3. Create a service to coordinate repository calls
4. Add CLI command in `cli.ts`

### Adding New Commands

```typescript
// In cli.ts
.command('new-command', 'Description', (yargs) => {
  return yargs.option('param', { ... });
})
```

## Testing (Future)

Recommended test structure:

```
tests/
├── unit/
│   ├── services/
│   ├── repositories/
│   └── models/
└── integration/
    └── cli/
```

## Environment Variables

Required:

- `SCRAPECREATORS_API_KEY`: Your ScrapeCreators API key

Optional:

- None currently, but could add custom base URLs, timeouts, etc.
