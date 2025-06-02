/**
 * @fileoverview Main entry point for the Jeopardy game application
 *
 * This file serves as the central initialization point for all game components
 * and handles the startup sequence to ensure proper order of initialization.
 *
 * @author Cult of Code Team
 * @version 1.0.0
 */

import { GameController } from "./game-controller.js";
import { initializeTerms } from "./terms.js";
import { initializeMenu } from "./menu.js";

/**
 * Initializes the application in the correct sequence
 * - First initializes UI components (menu, terms)
 * - Then initializes the main game controller
 */
function initializeApplication() {
  // Step 1: Initialize UI components first
  initializeMenu();
  initializeTerms();

  // Step 2: Create and initialize the game controller
  const gameController = new GameController();

  // Store the controller reference in window for potential debugging
  // and extension by future developers
  window.gameController = gameController;
}

// Initialize the game when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeApplication);
