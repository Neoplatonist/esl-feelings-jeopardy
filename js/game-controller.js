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
    this.flipAllSwitch = document.getElementById("flip-all-switch");
    this.titleToggle = document.getElementById("title-switch");
    this.instructionsHeader = document.querySelector(".instructions-header");

    // Game state
    this.currentDifficulty = CONFIG.DEFAULTS.difficulty;
    this.allCardsFlipped = false;
    this.showTitles = false;

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
    this.toggleTitles = this.toggleTitles.bind(this);

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

    // Add flip all cards toggle switch listener
    if (this.flipAllSwitch) {
      this.flipAllSwitch.addEventListener(
        "change",
        this.toggleAllCards.bind(this)
      );
    }

    // Add title toggle event listener if the element exists
    if (this.titleToggle) {
      this.titleToggle.addEventListener("change", this.toggleTitles);
    }

    // Add instructions accordion toggle
    if (this.instructionsHeader) {
      this.instructionsHeader.addEventListener(
        "click",
        this.toggleInstructions.bind(this)
      );
    }
  }

  /**
   * Initialize the game with default settings
   */
  initializeGame() {
    // Set up initial difficulty
    this.difficultySelect.value = this.currentDifficulty;

    // Initialize toggle states
    if (this.titleToggle) {
      this.titleToggle.checked = this.showTitles;
    }

    if (this.flipAllSwitch) {
      this.flipAllSwitch.checked = this.allCardsFlipped;
    }

    // Create initial game board and randomize cards
    this.boardBuilder.createGameBoard(this.currentDifficulty);
    this.randomizeCards();
  }

  /**
   * Handles the randomization of cards
   */
  randomizeCards() {
    // Save current title visibility state
    const wasTitleVisible = this.showTitles;

    // Reset card states
    this.resetGameState();

    // Re-create the game board to randomize everything
    this.boardBuilder.createGameBoard(this.currentDifficulty);

    // Restore title visibility state
    this.applyTitleVisibility(wasTitleVisible);
  }

  /**
   * Resets game state including flipped cards and button states
   */
  resetGameState() {
    // Reset any flipped cards
    this.cardManager.resetFlippedCards();

    // Reset the flip-all switch state if active
    if (this.allCardsFlipped && this.flipAllSwitch) {
      this.flipAllSwitch.checked = false;
      this.allCardsFlipped = false;
    }
  }

  /**
   * Handles difficulty changes
   */
  changeDifficulty() {
    const newDifficulty = this.difficultySelect.value;
    if (newDifficulty !== this.currentDifficulty) {
      // Save current title visibility state
      const wasTitleVisible = this.showTitles;

      this.currentDifficulty = newDifficulty;

      // Reset game state and create new board
      this.resetGameState();
      this.boardBuilder.createGameBoard(this.currentDifficulty);

      // Restore title visibility state
      this.applyTitleVisibility(wasTitleVisible);
    }
  }

  /**
   * Toggles all cards between shown and hidden states
   */
  toggleAllCards() {
    if (!this.flipAllSwitch) return;

    this.allCardsFlipped = this.flipAllSwitch.checked;
    this.cardManager.setAllCardsState(this.allCardsFlipped);
  }
  /**
   * Toggle the visibility of feeling titles
   */
  toggleTitles() {
    // Check if the title toggle exists
    if (!this.titleToggle) return;

    this.showTitles = this.titleToggle.checked;

    // Apply the title visibility state
    this.applyTitleVisibility();
  }

  /**
   * Applies the current title visibility state to the DOM
   * @param {boolean} [visible] - Optional override for visibility state
   */
  applyTitleVisibility(visible) {
    const shouldShowTitles = visible !== undefined ? visible : this.showTitles;

    if (shouldShowTitles) {
      this.gameBoard.classList.add(CONFIG.CLASSES.showTitles);
      this.overlay.classList.add(CONFIG.CLASSES.showTitles);
    } else {
      this.gameBoard.classList.remove(CONFIG.CLASSES.showTitles);
      this.overlay.classList.remove(CONFIG.CLASSES.showTitles);
    }
  }

  /**
   * Toggles the instructions accordion open/closed state
   */
  toggleInstructions() {
    const instructionsSection = document.querySelector(".instructions");
    instructionsSection.classList.toggle(CONFIG.CLASSES.accordionOpen);
  }
}
