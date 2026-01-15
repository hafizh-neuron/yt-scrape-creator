#!/bin/bash

# Example Usage Script for YouTube Channel Scraper
# This demonstrates how to use the CLI

echo "========================================="
echo "YouTube Channel Scraper - Example Usage"
echo "========================================="
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "Please create .env file and add your API key:"
    echo "SCRAPECREATORS_API_KEY=your_api_key_here"
    exit 1
fi

# Check if API key is set
if ! grep -q "SCRAPECREATORS_API_KEY=." .env; then
    echo "⚠️  API key not set in .env file!"
    echo "Please add your API key to .env:"
    echo "SCRAPECREATORS_API_KEY=your_api_key_here"
    exit 1
fi

echo "✅ Configuration validated"
echo ""

# Example channels to scrape
CHANNELS=(
    "ThePatMcAfeeShow"
    # Add more channels here
    # "MrBeast"
    # "mkbhd"
)

echo "📺 Scraping ${#CHANNELS[@]} channel(s)..."
echo ""

for channel in "${CHANNELS[@]}"; do
    echo "-----------------------------------"
    echo "Fetching: $channel"
    echo "-----------------------------------"
    
    # Create results directory if not exists
    mkdir -p src/results/channel

    npm run youtube -- channel --name="$channel" --json > "src/results/channel/$channel-result.json"
    
    echo ""
    
    # Optional: Add delay between requests to avoid rate limiting
    # sleep 2
done

echo "========================================="
echo "✅ All channels scraped successfully!"
echo "📁 Results saved in: src/results/channel/"
echo "========================================="
