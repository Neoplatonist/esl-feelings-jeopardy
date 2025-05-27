/**
 * Game configuration settings
 * Contains constants and default values for the game
 */
export const CONFIG = {
  // Game difficulty settings
  DIFFICULTY: {
    NORMAL: "normal",
    HARD: "hard",
  },

  // Default game settings
  DEFAULTS: {
    difficulty: "normal",
    rows: {
      normal: 3,
      hard: 4,
    },
  },

  // Card content data
  FEELINGS: [
    "happy",
    "sad",
    "angry",
    "excited",
    "good",
    "great",
    "hungry",
    "scared",
    "ok",
    "sick",
    "sleepy",
    "tired",
  ],

  // Point values for point cards
  POINT_VALUES: [1, 2, 3, -1, -2, -3],

  // CSS class names
  CLASSES: {
    flipped: "flipped",
    active: "active",
    pointCard: "point-card",
    hardMode: "hard-mode",
  },

  // Animation timings
  ANIMATION: {
    flipDuration: 500, // ms
    zoomOutDelay: 300, // ms
  },
};
