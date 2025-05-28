/**
 * Main entry point for the Jeopardy game
 * This file serves as the central initialization point for all game components
 */
import { GameController } from "./game-controller.js";
import { initializeTerms } from "./terms.js";
import { initializeMenu } from "./menu.js";

// Initialize the game when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize UI components first
  initializeMenu();
  initializeTerms();

  // Create and initialize the game controller after UI is ready
  new GameController();
});
