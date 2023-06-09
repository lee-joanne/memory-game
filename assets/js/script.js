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

function flipCards() {
    this.classList.toggle('flip');
}

for (let i = 0; i < memoryCards.length; i++) {
    memoryCards[i].addEventListener("click", flipCards);
}


startBtn.addEventListener("click", startGame);

function startGame() {
    startMenu.classList.add("hide");
    gameContainer.classList.remove("hide");
    countdown(2, 30);
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