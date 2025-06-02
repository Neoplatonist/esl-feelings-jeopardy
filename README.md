# Feelings Jeopardy

An interactive Jeopardy-style game designed for vocabulary learning, specifically focusing on feelings and emotions.

## Features

- Interactive card-flipping game with colorful categories
- Two difficulty modes (normal and hard)
- Image cards showing different feelings
- Point cards with random values in hard mode
- Card zoom functionality to better see images
- Show/Hide all cards toggle for quick review
- Show/Hide titles toggle to control label visibility
- Modal-based instructions for cleaner UI
- Navigation menu with links to other resources
- Fully responsive design (mobile, tablet, desktop)
- Docker support for easy deployment

## Project Structure

```
jeopardy/
├── css/
│   └── styles.css        # Organized CSS with responsive design
├── js/
│   ├── card-manager.js   # Card interaction logic & zooming
│   ├── config.js         # Game configuration and constants
│   ├── game-board-builder.js # Board layout and card creation
│   ├── game-controller.js # Main game controller
│   ├── main.js           # Application entry point
│   ├── menu.js           # Navigation menu functionality
│   ├── terms.js          # Terms of service modal handling
│   └── utils.js          # Utility functions
├── images/               # Feeling images
│   ├── angry.png
│   ├── excited.png
│   ├── cultofcode-logo.svg
│   └── ...
├── index.html            # Main HTML structure
├── docker-compose.yml    # Docker configuration
├── Dockerfile            # Docker image definition
└── nginx.conf            # Nginx server configuration
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

## Developer Documentation

### Architecture

The game follows a component-based architecture with clean separation of concerns:

1. **HTML Structure** - `index.html` defines the basic layout and containers
2. **CSS Styling** - `styles.css` contains all styles organized by component
3. **JavaScript Modules** - Organized into specialized modules:
   - `main.js`: Application entry point
   - `game-controller.js`: Primary game orchestrator
   - `card-manager.js`: Handles card-specific behaviors
   - `game-board-builder.js`: Builds the game board structure
   - `config.js`: Contains game configuration
   - `menu.js`: Manages navigation menu
   - `terms.js`: Handles terms of service
   - `utils.js`: Reusable utility functions

### Extension Points

To extend the game, consider these common modification points:

1. **Adding New Images** - Add new feeling images to the `images/` directory and update the image references in the game configuration

2. **Changing Difficulty Settings** - Modify the `CONFIG.DIFFICULTIES` object in `config.js`

3. **Adding New Features**:
   - Add UI elements to `index.html`
   - Add corresponding styles to `styles.css`
   - Implement behavior in appropriate JS module or create a new one
   - Register new module in `main.js`

### Best Practices

1. **Modular JavaScript** - Keep modules focused on specific functionality
2. **Maintain CSS Organization** - Follow the section comment structure
3. **Document Public Methods** - Add JSDoc comments for all public methods
4. **Keep HTML Clean** - Avoid inline styles and scripts
