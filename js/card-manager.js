import { CONFIG } from "./config.js";
import { Utils } from "./utils.js";

/**
 * Card management class
 * Handles card creation, flipping, and zooming functionality
 */
export class CardManager {
  constructor(gameBoard, overlay, zoomedImage) {
    this.gameBoard = gameBoard;
    this.overlay = overlay;
    this.zoomedImage = zoomedImage;
    this.activeCard = null;

    // Bind methods to ensure 'this' context
    this.handleCardClick = this.handleCardClick.bind(this);
    this.zoomInCard = this.zoomInCard.bind(this);
    this.zoomOutCard = this.zoomOutCard.bind(this);

    // Initialize event listeners
    this.overlay.addEventListener("click", this.zoomOutCard);
  }

  /**
   * Handles card click event - flips the card and zooms in
   * @param {Event} event - The click event
   */
  handleCardClick(event) {
    const card = event.currentTarget;

    // If the card is already flipped, just zoom in on it
    if (card.classList.contains(CONFIG.CLASSES.flipped)) {
      this.zoomInCard(card);
      return;
    }

    // Flip the card
    card.classList.add(CONFIG.CLASSES.flipped);

    // Wait for flip animation to complete before zooming in
    setTimeout(() => {
      this.zoomInCard(card);
    }, CONFIG.ANIMATION.flipDuration);
  }

  /**
   * Zooms in on a card to show its content
   * @param {HTMLElement} card - The card element to zoom in on
   */
  zoomInCard(card) {
    // Cache DOM elements to avoid duplicate queries
    const zoomedTitle = document.getElementById("zoomed-title");
    const isPointCard = card.classList.contains(CONFIG.CLASSES.pointCard);
    const animationTiming = `${CONFIG.ANIMATION.zoomInDuration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`;

    if (isPointCard) {
      // For point cards, display the points value in the zoomed view
      const pointsElement = card.querySelector(".random-points");
      const pointsValue = pointsElement.textContent;

      // Use canvas to create image representing the points
      this.zoomedImage.src = Utils.createPointsCanvas(
        pointsValue,
        pointsElement.style.color
      );
      this.zoomedImage.alt = "Points: " + pointsValue;

      // Clear any title for point cards
      if (zoomedTitle) {
        zoomedTitle.textContent = "";
      }
    } else {
      // For regular image cards, display the image
      const img = card.querySelector(".card-back img");
      this.zoomedImage.src = img.src;
      this.zoomedImage.alt = img.alt;

      // Set the zoomed title
      const titleElement = card.querySelector(".image-title");
      if (titleElement && zoomedTitle) {
        zoomedTitle.textContent = titleElement.textContent;
        zoomedTitle.dataset.feeling = titleElement.dataset.feeling;
      }
    }

    // Reset animations by triggering a browser reflow
    if (zoomedTitle) {
      zoomedTitle.style.animation = "none";
      void zoomedTitle.offsetWidth; // Trigger browser reflow
      zoomedTitle.style.animation = `zoomIn ${animationTiming} ${CONFIG.ANIMATION.zoomTitleDelay}ms`;
    }

    // Reset image animation
    this.zoomedImage.style.animation = "none";
    void this.zoomedImage.offsetWidth; // Trigger browser reflow
    this.zoomedImage.style.animation = `zoomIn ${animationTiming}`;

    this.overlay.classList.add(CONFIG.CLASSES.active);
    this.activeCard = card;
  }

  /**
   * Closes the zoomed card overlay
   */
  zoomOutCard() {
    this.overlay.classList.remove(CONFIG.CLASSES.active);

    // Reset content after animation completes
    setTimeout(() => {
      this.zoomedImage.src = "";
      const zoomedTitle = document.getElementById("zoomed-title");
      if (zoomedTitle) {
        zoomedTitle.textContent = "";
      }
    }, CONFIG.ANIMATION.zoomOutDelay);

    // Keep activeCard reference for possible re-zooming
  }

  /**
   * Toggles all cards between shown and hidden states
   * @param {HTMLElement} flipAllButton - The toggle button element
   * @returns {boolean} The new flipped state
   */
  toggleAllCards(flipAllButton) {
    const cards = document.querySelectorAll(".card");
    let allFlipped = flipAllButton.classList.contains(CONFIG.CLASSES.active);

    if (allFlipped) {
      // Flip all cards back to the front
      cards.forEach((card) => {
        card.classList.remove(CONFIG.CLASSES.flipped);
      });
      flipAllButton.textContent = "Show All Cards";
      flipAllButton.classList.remove(CONFIG.CLASSES.active);
      allFlipped = false;
    } else {
      // Flip all cards to reveal the back
      cards.forEach((card) => {
        card.classList.add(CONFIG.CLASSES.flipped);
      });
      flipAllButton.textContent = "Hide All Cards";
      flipAllButton.classList.add(CONFIG.CLASSES.active);
      allFlipped = true;
    }

    return allFlipped;
  }

  /**
   * Resets all flipped cards to their front state
   */
  resetFlippedCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      if (card.classList.contains(CONFIG.CLASSES.flipped)) {
        card.classList.remove(CONFIG.CLASSES.flipped);
      }
    });
  }

  /**
   * Sets all cards to a specific state (shown or hidden)
   * @param {boolean} showCards - Whether to show all cards (true) or hide them (false)
   */
  setAllCardsState(showCards) {
    const cards = document.querySelectorAll(".card");

    if (showCards) {
      // Flip all cards to reveal the back
      cards.forEach((card) => {
        card.classList.add(CONFIG.CLASSES.flipped);
      });
    } else {
      // Flip all cards back to the front
      cards.forEach((card) => {
        card.classList.remove(CONFIG.CLASSES.flipped);
      });
    }
  }
}
