#!/usr/bin/env fish

# Clean up any existing containers
echo "Cleaning up any existing containers..."
docker compose down

# Remove any cached images to ensure a clean build
echo "Removing cached images..."
docker compose rm -f

# Force rebuild the container
echo "Building the container..."
docker compose build --no-cache

# Run the container
echo "Starting the container..."
docker compose up -d

# Check if container started successfully
if test $status -eq 0
    # Try to get the local IP address
    set LOCAL_IP (ifconfig | grep "inet " | grep -v 127.0.0.1 | head -n 1 | awk '{print $2}')
    
    echo "Container started successfully!"
    echo "Access the game at: http://localhost:9081"
    
    # If we could determine the local IP, show that too for network access
    if test -n "$LOCAL_IP"
        echo "From other devices on your network: http://$LOCAL_IP:9081"
    else
        echo "For network access, use your computer's IP address with port 9081"
    end
    
    echo ""
    echo "To stop the container, run: docker compose down"
else
    echo "Error starting container. Please check the Docker logs:"
    docker compose logs
end
