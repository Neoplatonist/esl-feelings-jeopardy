import { CONFIG } from "./config.js";
import { CardManager } from "./card-manager.js";
import { GameBoardBuilder } from "./game-board-builder.js";

/**
 * Main Game Controller class
 * Manages the overall game state and user interactions
 */
export class GameController {
  constructor() {
    // DOM elements
    this.gameBoard = document.querySelector(".game-board");
    this.overlay = document.getElementById("overlay");
    this.zoomedImage = document.getElementById("zoomed-image");
    this.randomizeButton = document.getElementById("randomize-button");
    this.difficultySelect = document.getElementById("difficulty");
    this.flipAllButton = document.getElementById("flip-all-button");

    // Game state
    this.currentDifficulty = CONFIG.DEFAULTS.difficulty;
    this.allCardsFlipped = false;

    // Initialize managers
    this.cardManager = new CardManager(
      this.gameBoard,
      this.overlay,
      this.zoomedImage
    );
    this.boardBuilder = new GameBoardBuilder(this.gameBoard, this.cardManager);

    // Bind event handlers
    this.randomizeCards = this.randomizeCards.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
    this.toggleAllCards = this.toggleAllCards.bind(this);

    // Set up event listeners
    this.setupEventListeners();

    // Initialize the game
    this.initializeGame();
  }

  /**
   * Set up event listeners for game controls
   */
  setupEventListeners() {
    this.randomizeButton.addEventListener("click", this.randomizeCards);
    this.difficultySelect.addEventListener("change", this.changeDifficulty);
    this.flipAllButton.addEventListener("click", this.toggleAllCards);
  }

  /**
   * Initialize the game with default settings
   */
  initializeGame() {
    // Set up initial difficulty
    this.difficultySelect.value = this.currentDifficulty;

    // Create initial game board and randomize cards
    this.boardBuilder.createGameBoard(this.currentDifficulty);
    this.randomizeCards();
  }

  /**
   * Handles the randomization of cards
   */
  randomizeCards() {
    // Reset any flipped cards
    this.cardManager.resetFlippedCards();

    // Reset the flip-all button state if active
    if (this.allCardsFlipped) {
      this.flipAllButton.textContent = "Show All Cards";
      this.flipAllButton.classList.remove(CONFIG.CLASSES.active);
      this.allCardsFlipped = false;
    }

    // Re-create the game board to randomize everything
    this.boardBuilder.createGameBoard(this.currentDifficulty);
  }

  /**
   * Handles difficulty changes
   */
  changeDifficulty() {
    const newDifficulty = this.difficultySelect.value;
    if (newDifficulty !== this.currentDifficulty) {
      this.currentDifficulty = newDifficulty;

      // Reset the flip-all button state if active
      if (this.allCardsFlipped) {
        this.flipAllButton.textContent = "Show All Cards";
        this.flipAllButton.classList.remove(CONFIG.CLASSES.active);
        this.allCardsFlipped = false;
      }

      // Create a new game board with the appropriate difficulty
      this.boardBuilder.createGameBoard(this.currentDifficulty);
      this.randomizeCards();
    }
  }

  /**
   * Toggles all cards between shown and hidden states
   */
  toggleAllCards() {
    this.allCardsFlipped = this.cardManager.toggleAllCards(this.flipAllButton);
  }
}
