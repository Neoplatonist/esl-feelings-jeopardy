# Feelings Jeopardy

An interactive Jeopardy-style game designed for vocabulary learning, specifically focusing on feelings and emotions.

## Features

- Interactive card-flipping game with colorful categories
- Two difficulty modes (normal and hard)
- Image cards showing different feelings
- Point cards with random values in hard mode
- Card zoom functionality to better see images
- Show/Hide all cards button for quick review
- Mobile-responsive design

## Project Structure

```
jeopardy/
├── css/
│   └── styles.css        # Organized CSS with responsive design
├── js/
│   ├── card-manager.js   # Card interaction logic
│   ├── config.js         # Game configuration and constants
│   ├── game-board-builder.js # Board layout and card creation
│   ├── game-controller.js # Main game controller
│   ├── main.js           # Application entry point
│   └── utils.js          # Utility functions
├── images/               # Feeling images
│   ├── angry.png
│   ├── excited.png
│   └── ...
├── index.html            # Main HTML structure
└── docker-compose.yml    # Docker configuration
```

## Usage

### Running with Docker

1. Navigate to the project directory in your terminal
2. Run the following command:
   ```
   docker-compose up -d
   ```
3. Access the game in your browser at http://localhost:8080
4. To stop the application: `docker-compose down`

### Running without Docker

Simply open the `index.html` file in a web browser.

## Game Instructions

1. Select a difficulty level (Normal or Hard)
2. Click on a card to flip it and reveal the feeling image or point value
3. The image will automatically zoom in
4. Click anywhere to return to the game board
5. Use "Show All Cards" button to reveal all cards at once without zooming
6. Use "Randomize Cards" button to shuffle the board with new feelings

## Technical Details

- Built with vanilla JavaScript using modular ES6 architecture
- CSS Grid used for responsive layout
- CSS animations for card flips and zooms
- Mobile-first responsive design
- No external dependencies required

## Development

To modify the game:

1. Game difficulty settings and card content can be adjusted in `config.js`
2. New feelings can be added by:
   - Adding images to the `images/` directory
   - Adding feeling names to the `FEELINGS` array in `config.js`
