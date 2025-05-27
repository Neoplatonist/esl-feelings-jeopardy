/**
 * Main entry point for the Jeopardy game
 */
import { GameController } from "./game-controller.js";

// Initialize the game when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Create and initialize the game controller
  new GameController();
});
