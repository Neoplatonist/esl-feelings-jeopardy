#!/usr/bin/env bash
#
# Docker Container Rebuild Script
# ------------------------------
# This script stops, removes, and rebuilds the Docker container for the Jeopardy game
#
# Author: Cult of Code Team
# Version: 1.0.0
#

echo "🔄 Stopping any running containers..."
docker-compose down

echo "🗑️ Removing old containers and images..."
docker-compose rm -f

echo "🔨 Rebuilding the Docker image..."
docker-compose build --no-cache

echo "▶️ Starting the container..."
docker-compose up -d

echo "✅ Container is now running on http://localhost:9081"
echo "📋 You can check logs with: docker-compose logs -f"
echo ""
echo "Press Ctrl+C when you want to stop the server"
echo "Or run 'docker-compose down' in another terminal"
