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
    if (card.classList.contains(CONFIG.CLASSES.pointCard)) {
      // For point cards, display the points value in the zoomed view
      const pointsElement = card.querySelector(".random-points");
      const pointsValue = pointsElement.textContent;

      // Use canvas to create image representing the points
      this.zoomedImage.src = Utils.createPointsCanvas(
        pointsValue,
        pointsElement.style.color
      );
      this.zoomedImage.alt = "Points: " + pointsValue;
    } else {
      // For regular image cards, display the image
      const img = card.querySelector(".card-back img");
      this.zoomedImage.src = img.src;
      this.zoomedImage.alt = img.alt;
    }

    this.overlay.classList.add(CONFIG.CLASSES.active);
    this.activeCard = card;
  }

  /**
   * Closes the zoomed card overlay
   */
  zoomOutCard() {
    this.overlay.classList.remove(CONFIG.CLASSES.active);
    setTimeout(() => {
      this.zoomedImage.src = "";
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
}
