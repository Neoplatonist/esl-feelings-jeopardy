import { CONFIG } from "./config.js";
import { Utils } from "./utils.js";

/**
 * Game Board Builder class
 * Handles creating and managing different game board layouts
 */
export class GameBoardBuilder {
  /**
   * Constructor for the GameBoardBuilder
   * @param {HTMLElement} gameBoard - The game board DOM element
   * @param {CardManager} cardManager - The card manager instance
   */
  constructor(gameBoard, cardManager) {
    this.gameBoard = gameBoard;
    this.cardManager = cardManager;
  }

  /**
   * Creates the game board based on the selected difficulty
   * @param {string} difficulty - The difficulty level ('normal' or 'hard')
   */
  createGameBoard(difficulty) {
    // Clear the game board
    this.gameBoard.innerHTML = "";

    // Set the appropriate CSS class for the game board based on difficulty
    this.gameBoard.className = "game-board";

    // Apply the appropriate grid layout
    if (difficulty === CONFIG.DIFFICULTY.HARD) {
      this.gameBoard.classList.add(CONFIG.CLASSES.hardMode);
      this.gameBoard.style.gridAutoFlow = "row"; // Make grid fill by rows in hard mode
    } else {
      this.gameBoard.style.gridAutoFlow = "column"; // Default: fill by columns in normal mode
    }

    // Categories and their colors
    const categories = [
      { name: "Red", color: "#dc3545", textColor: "white" },
      { name: "Blue", color: "#0d6efd", textColor: "white" },
      { name: "Green", color: "#198754", textColor: "white" },
      { name: "Yellow", color: "#ffc107", textColor: "#212529" },
    ];

    // Determine how many point cards per category based on difficulty
    const pointsPerCategory =
      difficulty === CONFIG.DIFFICULTY.NORMAL
        ? CONFIG.DEFAULTS.rows.normal
        : CONFIG.DEFAULTS.rows.hard;

    if (difficulty === CONFIG.DIFFICULTY.NORMAL) {
      // Create normal mode game board
      this.createNormalGameBoard(categories, pointsPerCategory);
    } else {
      // Create hard mode game board with completely randomized cards
      this.createHardGameBoard(categories, pointsPerCategory);
    }
  }

  /**
   * Creates a normal mode game board with cards in column layout
   * @param {Array} categories - List of categories for the game board
   * @param {number} pointsPerCategory - Number of points/rows per category
   */
  createNormalGameBoard(categories, pointsPerCategory) {
    // Set the auto-flow to column for normal mode
    this.gameBoard.style.gridAutoFlow = "column";

    // Shuffle the feelings array for randomization
    const shuffledFeelings = Utils.shuffleArray([...CONFIG.FEELINGS]);
    let feelingIndex = 0;

    // Create each category column
    categories.forEach((category, colIndex) => {
      // Add category header
      const categoryHeader = this.createCategoryHeader(category);
      this.gameBoard.appendChild(categoryHeader);

      // Add point cards for this category
      for (let points = 1; points <= pointsPerCategory; points++) {
        // Determine if this is a point card (in position 4 in hard mode)
        const isRandomPointCard = points === 4;

        // Create the card
        const card = this.createCard(category, points, isRandomPointCard);

        // Create card inner elements (front and back)
        const { cardInner, cardFront, cardBack } = this.createCardElements(
          category,
          points
        );

        // Create the content for the back of the card
        if (isRandomPointCard) {
          // Random point card
          this.createPointCardBack(cardBack);
        } else {
          // Regular image card with randomized feeling
          const feeling =
            shuffledFeelings[feelingIndex % shuffledFeelings.length];
          feelingIndex++;
          this.createImageCardBack(cardBack, feeling);
        }

        // Assemble the card DOM structure
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        this.gameBoard.appendChild(card);

        // Add click event
        card.addEventListener("click", this.cardManager.handleCardClick);
      }
    });
  }

  /**
   * Creates a hard mode game board with randomized cards in row layout
   * @param {Array} categories - List of categories for the game board
   * @param {number} pointsPerCategory - Number of points/rows per category
   */
  createHardGameBoard(categories, pointsPerCategory) {
    // Ensure we're in row-first order for hard mode
    this.gameBoard.style.gridAutoFlow = "row";

    // First, create all category headers
    categories.forEach((category, index) => {
      const categoryHeader = this.createCategoryHeader(category);
      // In hard mode, we want to ensure categories stay in the first row
      categoryHeader.style.gridRow = 1;
      categoryHeader.style.gridColumn = index + 1;
      this.gameBoard.appendChild(categoryHeader);
    });

    // Create arrays to hold all possible card types
    const totalCards = categories.length * pointsPerCategory;

    // Generate all card types (feeling cards and point cards)
    const cardTypes = this.generateCardTypes(totalCards, categories.length);

    // Now create the actual cards with randomized content but keep the visual structure
    let cardIndex = 0;

    // For hard mode, arrange cards by rows to maintain the color order
    for (let row = 1; row <= pointsPerCategory; row++) {
      // Loop through each category (column)
      for (let colIndex = 0; colIndex < categories.length; colIndex++) {
        const category = categories[colIndex];
        const cardType = cardTypes[cardIndex++];

        // Create the card
        const card = this.createCard(category, row, cardType.type === "point");

        // Set explicit grid positions to maintain structure
        card.style.gridRow = row + 1; // +1 because row 1 is categories
        card.style.gridColumn = colIndex + 1; // +1 because CSS grid is 1-indexed

        // Create card inner elements
        const { cardInner, cardFront, cardBack } = this.createCardElements(
          category,
          row
        );

        // Create appropriate card back content
        if (cardType.type === "point") {
          this.createPointCardBack(cardBack, cardType.value);
        } else {
          this.createImageCardBack(cardBack, cardType.feeling);
        }

        // Assemble the card DOM structure
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        this.gameBoard.appendChild(card);

        // Add click event
        card.addEventListener("click", this.cardManager.handleCardClick);
      }
    }
  }

  /**
   * Creates a category header element
   * @param {Object} category - The category data
   * @returns {HTMLElement} The category header element
   */
  createCategoryHeader(category) {
    const categoryHeader = document.createElement("div");
    categoryHeader.className = "category";
    categoryHeader.style.backgroundColor = category.color;
    if (category.textColor) {
      categoryHeader.style.color = category.textColor;
    }
    categoryHeader.textContent = category.name;
    return categoryHeader;
  }

  /**
   * Creates a card element
   * @param {Object} category - The category data
   * @param {number} points - The point value
   * @param {boolean} isPointCard - Whether this is a point card
   * @returns {HTMLElement} The card element
   */
  createCard(category, points, isPointCard) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.category = category.name.toLowerCase();
    card.dataset.points = points;

    if (isPointCard) {
      card.classList.add(CONFIG.CLASSES.pointCard);
      card.dataset.points = "random";
    }

    return card;
  }

  /**
   * Creates the inner elements for a card
   * @param {Object} category - The category data
   * @param {number} points - The point value
   * @returns {Object} Object containing the inner DOM elements
   */
  createCardElements(category, points) {
    const cardInner = document.createElement("div");
    cardInner.className = "card-inner";

    const cardFront = document.createElement("div");
    cardFront.className = "card-front";
    cardFront.style.backgroundColor = category.color;
    if (category.textColor) {
      cardFront.style.color = category.textColor;
    }
    cardFront.textContent = points;

    const cardBack = document.createElement("div");
    cardBack.className = "card-back";

    return { cardInner, cardFront, cardBack };
  }

  /**
   * Creates the back of a point card with random value
   * @param {HTMLElement} cardBack - The card back element
   * @param {number} [pointValue] - Optional fixed point value
   */
  createPointCardBack(cardBack, pointValue) {
    // Use provided value or generate random one
    pointValue =
      pointValue ||
      CONFIG.POINT_VALUES[
        Math.floor(Math.random() * CONFIG.POINT_VALUES.length)
      ];

    const randomPoints = document.createElement("div");
    randomPoints.className = "random-points";
    const prefix = pointValue > 0 ? "+" : "";
    randomPoints.textContent = prefix + pointValue;

    // Set color based on positive or negative
    if (pointValue > 0) {
      randomPoints.style.color = "#198754"; // Green
    } else {
      randomPoints.style.color = "#dc3545"; // Red
    }

    cardBack.appendChild(randomPoints);
  }

  /**
   * Creates the back of an image card with a feeling
   * @param {HTMLElement} cardBack - The card back element
   * @param {string} feeling - The feeling to display
   */
  createImageCardBack(cardBack, feeling) {
    const img = document.createElement("img");
    img.src = `images/${feeling}.png`;
    img.alt = Utils.capitalizeFirst(feeling);
    img.dataset.feeling = feeling;
    cardBack.appendChild(img);
  }

  /**
   * Generates an array of randomized card types for the game board
   * @param {number} totalCards - Total number of cards in the game
   * @param {number} categoryCount - Number of categories
   * @returns {Array} Array of card type objects
   */
  generateCardTypes(totalCards, categoryCount) {
    const cardTypes = [];

    // Add feeling cards (normal cards with images)
    const feelingsNeeded = totalCards - categoryCount; // Subtract point cards (1 per category)
    const shuffledFeelings = Utils.shuffleArray([...CONFIG.FEELINGS]);

    for (let i = 0; i < feelingsNeeded; i++) {
      cardTypes.push({
        type: "image",
        feeling: shuffledFeelings[i % shuffledFeelings.length],
      });
    }

    // Add point cards
    for (let i = 0; i < categoryCount; i++) {
      cardTypes.push({
        type: "point",
        value:
          CONFIG.POINT_VALUES[
            Math.floor(Math.random() * CONFIG.POINT_VALUES.length)
          ],
      });
    }

    // Shuffle card types
    return Utils.shuffleArray(cardTypes);
  }
}
