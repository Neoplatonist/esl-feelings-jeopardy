/**
 * Menu toggle functionality for the navigation drawer
 */
export function initializeMenu() {
  const menuButton = document.getElementById("menu-button");
  const navMenu = document.querySelector(".nav-menu");
  const closeMenuButton = document.querySelector(".close-menu");
  const body = document.body;

  // Create overlay element for background dimming
  const menuOverlay = document.createElement("div");
  menuOverlay.className = "menu-overlay";
  // Insert the overlay before the drawer element in the DOM
  // This ensures the overlay is behind the menu drawer
  document.querySelector(".overlay-ui").appendChild(menuOverlay);

  function openMenu() {
    menuButton.classList.add("active");
    navMenu.classList.add("active");
    menuOverlay.classList.add("active");
    body.style.overflow = "hidden"; // Prevent scrolling when menu is open

    // Set focus to the first interactive element in the menu
    // This improves accessibility and keyboard navigation
    setTimeout(() => {
      const firstInteractiveElement =
        document.querySelector(".close-menu") ||
        document.querySelector(".menu-links a");
      if (firstInteractiveElement) {
        firstInteractiveElement.focus();
      }
    }, 100);
  }

  function closeMenu() {
    menuButton.classList.remove("active");
    navMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
    body.style.overflow = ""; // Restore scrolling

    // Return focus to the menu button after closing
    // This improves keyboard navigation experience
    setTimeout(() => {
      menuButton.focus();
    }, 100);
  }

  if (menuButton && navMenu) {
    // Toggle menu when button is clicked
    menuButton.addEventListener("click", (event) => {
      event.stopPropagation();
      if (navMenu.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking the X button
    if (closeMenuButton) {
      closeMenuButton.addEventListener("click", (event) => {
        event.stopPropagation();
        closeMenu();
      });
    }

    // Close menu when clicking the overlay
    menuOverlay.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeMenu();
    });

    // Close menu with escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("active")) {
        closeMenu();
      }
    });

    // Make sure menu links work properly
    const menuLinks = document.querySelectorAll(".menu-links a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // Close menu after slight delay to allow for animation
        setTimeout(closeMenu, 100);
      });
    });
  }
}
