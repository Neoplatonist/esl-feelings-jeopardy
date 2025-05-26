document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");
  const overlay = document.getElementById("overlay");
  const zoomedImage = document.getElementById("zoomed-image");
  const randomizeButton = document.getElementById("randomize-button");
  let activeCard = null;

  // List of all feelings for the cards
  const feelings = [
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
  ];

  // Function to handle card flip
  function handleCardClick(event) {
    const card = event.currentTarget;

    // If the card is already flipped
    if (card.classList.contains("flipped")) {
      return;
    }

    // Flip the card if not flipped yet
    card.classList.add("flipped");

    // Wait for the flip animation to complete before zooming in
    setTimeout(() => {
      zoomInCard(card);
    }, 500); // Match this to the flip animation duration
  }

  // Function to zoom in on an image
  function zoomInCard(card) {
    const img = card.querySelector(".card-back img");
    zoomedImage.src = img.src;
    zoomedImage.alt = img.alt;
    overlay.classList.add("active");
    activeCard = card;
  }

  // Function to zoom out (close the overlay)
  function zoomOutCard() {
    overlay.classList.remove("active");
    setTimeout(() => {
      zoomedImage.src = "";
    }, 300);
    activeCard = null;
  }

  // Add click event to all cards
  cards.forEach((card) => {
    card.addEventListener("click", handleCardClick);
  });

  // Add click event to overlay to close it
  overlay.addEventListener("click", function () {
    zoomOutCard();
  });

  // Prevent clicks on the zoomed image from bubbling to the overlay
  zoomedImage.addEventListener("click", function (event) {
    event.stopPropagation();
    zoomOutCard();
  });

  // Handle keyboard events (Esc to close overlay)
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && overlay.classList.contains("active")) {
      zoomOutCard();
    }
  });

  // Function to shuffle an array
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Function to randomize card images
  function randomizeCards() {
    // Reset any flipped cards
    cards.forEach((card) => {
      if (card.classList.contains("flipped")) {
        card.classList.remove("flipped");
      }
    });

    // Get all card back images
    const cardBackImages = document.querySelectorAll(".card-back img");

    // Shuffle the feelings array
    const shuffledFeelings = shuffleArray(feelings);

    // Assign shuffled feelings to cards
    cardBackImages.forEach((img, index) => {
      const feeling = shuffledFeelings[index];
      img.src = `images/${feeling.toLowerCase()}.png`;
      img.alt = feeling.charAt(0).toUpperCase() + feeling.slice(1); // Capitalize first letter
      img.dataset.feeling = feeling;
    });
  }

  // Add click event for randomize button
  randomizeButton.addEventListener("click", randomizeCards);
});
