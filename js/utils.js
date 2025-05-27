/**
 * Utility functions for the Jeopardy game
 */
export const Utils = {
  /**
   * Shuffles an array using the Fisher-Yates algorithm
   * @param {Array} array - The array to shuffle
   * @returns {Array} A new shuffled array
   */
  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },

  /**
   * Creates a canvas element with points text for display
   * @param {string} pointsValue - The points value to display
   * @param {string} color - The color for the text
   * @returns {string} Data URL of the rendered canvas
   */
  createPointsCanvas(pointsValue, color) {
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.font = "bold 150px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(pointsValue, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL();
  },

  /**
   * Capitalizes the first letter of a string
   * @param {string} text - The string to capitalize
   * @returns {string} The capitalized string
   */
  capitalizeFirst(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  },
};
