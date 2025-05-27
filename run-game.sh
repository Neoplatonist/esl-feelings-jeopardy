#!/usr/bin/env fish

# Script to open the Feelings Jeopardy game
set DIR (dirname (status --current-filename))

# Check if Docker is installed and compose file exists
if command -v docker > /dev/null && test -f "$DIR/docker-compose.yml"
    echo "Starting Feelings Jeopardy using Docker..."
    cd "$DIR"
    
    # Clean up any existing containers
    docker compose down

    # Remove any cached images to ensure a clean build
    docker compose rm -f

    # Force rebuild the images
    docker compose build --no-cache
    
    # Start the container
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
        
        # Open in browser
        open "http://localhost:9081"
        
        echo ""
        echo "Press Ctrl+C when you want to stop the server"
        echo "Or run 'docker compose down' in another terminal"
        
        # Keep the fish script running until user presses Ctrl+C
        sleep infinity
    else
        echo "Error starting container. Please check the Docker logs:"
        docker compose logs
    end
else
    echo "Opening Feelings Jeopardy directly in browser..."
    open "$DIR/index.html"
end
