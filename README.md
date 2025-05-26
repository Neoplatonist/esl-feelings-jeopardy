# Feelings Jeopardy Game

A simple Jeopardy-style game for learning about feelings, built with HTML, CSS, and JavaScript.

## Running with Docker

### Prerequisites

- Docker and Docker Compose installed on your machine

### Starting the Application

1. Navigate to the project directory in your terminal
2. Run the following command:
   ```
   docker-compose up -d
   ```
3. Access the game in your browser at http://localhost:8080

### Stopping the Application

```
docker-compose down
```

## Running without Docker

Simply open the index.html file in a web browser.

## Game Instructions

1. Click on a card to flip it and reveal the feeling image
2. The image will automatically zoom in
3. Click anywhere to return to the game board
4. Use the "Randomize Cards" button to shuffle the feeling images

## File Structure

- `index.html` - The main HTML structure
- `styles.css` - CSS styling for the game
- `script.js` - JavaScript for game functionality
- `images/` - Directory containing feeling images
