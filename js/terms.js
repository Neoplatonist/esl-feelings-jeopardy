/**
 * Terms of Service Modal Functionality
 */

document.addEventListener("DOMContentLoaded", () => {
  const termsLink = document.getElementById("terms-link");

  if (termsLink) {
    termsLink.addEventListener("click", (event) => {
      event.preventDefault();

      // Show a simple alert for now - in a full implementation this would open a modal
      alert(
        "Terms of Service\n\n" +
          "1. This game is provided for educational purposes only.\n" +
          "2. All images and content are copyright protected by Cult of Code.\n" +
          "3. No redistribution or copying of this material is allowed without permission from Cult of Code.\n" +
          '4. The game is provided "as is" without warranty of any kind.\n' +
          "5. Cult of Code is not liable for any damage or issues arising from use of this game."
      );
    });
  }
});
