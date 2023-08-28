// Modal window functionality
let modal = document.getElementById("modalContainer");
let modalBtn = document.getElementById("modalBtn");
let span = document.getElementsByClassName("close")[0];

modalBtn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Game functionailty
let titleScreen = document.getElementById("centering")
let startMenu = document.getElementById("start-menu");
let startBtn = document.getElementById("startBtn");
let gameContainer = document.getElementById("memory-game");
let counter = document.getElementById("timer");
let memoryCards = document.getElementsByClassName("memory-card");
let gameOverPage = document.getElementById("game-over-page");
let turnCount = document.getElementById("turns");
let finalCount = document.getElementById("final-count");
let wellDonePage = document.getElementById("well-done-page");
let ping = new Audio('../assets/audio/ding.mp3');

function startGame() {
    // Function to start the game.
    // Hides start menu screen and shows game container.
    // Starts countdown, passing in two minutes and 30 seconds
    startMenu.classList.add("hide");
    gameContainer.classList.remove("hide");
    countdown(2, 30);
}

startBtn.addEventListener("click", startGame);

function countdown(minutes, seconds) {
    // Countdown, two minutes and 30 seconds passed in from startGame function.
    function tick() {
        counter.innerHTML =
            minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        seconds--;
        if (seconds >= 0) {
            timeoutHandle = setTimeout(tick, 1000);
        } else {
            if (minutes >= 1) {
                setTimeout(function () {
                    countdown(minutes - 1, 59);
                }, 1000);
            }
        }
        if (counter.innerText === "0:00") {
                // if countdown is over, show gameover screen.
                gameOverPage.classList.remove("hide");
                gameContainer.classList.add("hide");
                titleScreen.classList.add("hide")
        }
    }
    tick();
}

const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false; // Card not flipped yet.
let firstCard, secondCard; // Declare firstCard and secondCard, set to null.
let selectedCardsCount = 0; // Initial declaration, 0 cards selected.
let matchedCards = 0; // Initial declaration, 0 cards matched.

function incrementTurns() {
    // Increment turns for each pair, show turn counts on website.
    let oldTurn = parseInt(turnCount.innerText);
    turnCount.innerText = ++oldTurn;
}

function flipCard() {
    // Function to flip a pair of cards.
    // Add classList of 'flip' to the element calling this function.
    // If hasFlippedCard is false (not flipped yet), declare this element as firstCard.
    // hasFlippedCard is now set to true.
    // When another element calls this function, declare this as the secondCard, skipping if statement.
    // Add class list of 'disabled' to second card, and set hasFlippedCard back to false.
    // Increment counter of selectedCardsCount.
    // If selectedCardsCount is 1, call disableRemainingCards function.
    // Check to see if the cards match with checkForMatch function.
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlippedCard = false;
    selectedCardsCount++; // Increment the counter
    if (selectedCardsCount == 1) {
        disableRemainingCards();
    }
    checkForMatch();
}

function disableRemainingCards() {
    // For each card, if the card is not firstCard or secondCard, remove event listener and disable cards.
    // Function created to stop users from selecting multiple cards when checking for match.
    cards.forEach(card => {
        if (card !== firstCard && card !== secondCard) {
            card.removeEventListener('click', flipCard);
            card.classList.add('disabled');
        }
    });
}

function checkForMatch() {
    // Function to run to check of two cards match.
    // Check for match using the dataset framework.
    // Call the incrementTurns function to increment turn number.
    // If it's a match, call disableCards. Else, call unFlipCards.
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    incrementTurns();
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    // Function to run when cards are a match.
    // Play song.
    // Increment matchedCards by one.
    // If matchedCards is 18, call the wellDone function.
    // resetBoard function called.
    ping.play();
    matchedCards += 1;
    if (matchedCards == 18) {
        wellDone();
    }
    resetBoard();
}

function unflipCards() {
    // Function to run if cards do not match.
    // Remove flip class and call resetBoard function when timer ends.
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    // Function to reset the board.
    // Set firstCard and secondCard back to null.
    // Reset selectedCardsCount counter to 0.
    // If cards do not have a class of 'flip', allow cards to be clickable again.
    [firstCard, secondCard] = [null, null];
    selectedCardsCount = 0; // Reset the counter
    cards.forEach(card => {
        if (!card.classList.contains("flip")) {
            card.addEventListener('click', flipCard);
            card.classList.remove('disabled');
    }
    });
}

(function shuffle() {
    // Function to shuffle the cards, will run when website loads.
   cards.forEach(card => {
     let ramdomPos = Math.floor(Math.random() * 12);
     card.style.order = ramdomPos;
   });
 })();

cards.forEach(card => card.addEventListener('click', flipCard));

function wellDone() {
    // Function to show well done page.
    // Shows final score to the user.
    // Shows well done page and hides game container and title screen.
    finalCount.innerText = turnCount.innerText;
    wellDonePage.classList.remove("hide");
    gameContainer.classList.add("hide");
    titleScreen.classList.add("hide")
}