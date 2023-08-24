// modal window functionality
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

// game functionailty
let titleScreen = document.getElementById("centering")
let startMenu = document.getElementById("start-menu");
let startBtn = document.getElementById("startBtn");
let gameContainer = document.getElementById("memory-game");
let counter = document.getElementById("timer");
let memoryCards = document.getElementsByClassName("memory-card");
let gameOverPage = document.getElementById("game-over-page");

startBtn.addEventListener("click", startGame);

function startGame() {
    startMenu.classList.add("hide");
    gameContainer.classList.remove("hide");
    countdown(2, 30);
}

function flipCards() {
    // functionality to flip the cards
    this.classList.toggle('flip');
}

for (let i = 0; i < memoryCards.length; i++) {
    memoryCards[i].addEventListener("click", flipCards);
}

function countdown(minutes, seconds) {
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
                gameOverPage.classList.remove("hide");
                gameContainer.classList.add("hide");
                titleScreen.classList.add("hide")
        }
    }
    tick();
}

const cards = document.querySelectorAll('.memory-card');
// Fix bugs: disabling cards from being flipped again after two are selected
// when game is over, show screen to user

let hasFlippedCard = false; // card not flipped yet
let lockBoard = false; // board not locked yet
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return; // if lockboard is true, stop
    if (this === firstCard) return; // if clicked card is same as the first card, stop

    this.classList.add('flip');

    if (!hasFlippedCard) { // if false
        hasFlippedCard = true; // set flippedCard to true
        firstCard = this; // assign this card as the first card
        return; // stop
    }

    secondCard = this; // hasflipped is true, so if statement is skipped. now this card is second card
    hasFlippedCard = false; // set flippedcard back to false

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
   cards.forEach(card => {
     let ramdomPos = Math.floor(Math.random() * 12);
     card.style.order = ramdomPos;
   });
 })();

cards.forEach(card => card.addEventListener('click', flipCard));