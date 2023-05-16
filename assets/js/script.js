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

let startMenu = document.getElementById("start-menu");
let startBtn = document.getElementById("startBtn");
let gameContainer = document.getElementById("memory-game");

startBtn.addEventListener("click", startGame);

function startGame() {
    startMenu.classList.add("hide");
    gameContainer.classList.remove("hide");
}