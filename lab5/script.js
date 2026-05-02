let difficultySelect = document.getElementById("difficulty");
let colorSelect = document.getElementById("color");
let startBtn = document.getElementById("startBtn");
let square = document.getElementById("square");
let scoreText = document.getElementById("score");
let timeText = document.getElementById("time"); 

let score = 0;
let timeLeft = 0;
let squareSize = 0;
let moveDistance = 0;
let timer;
 
startBtn.onclick = function () {
    let difficulty = difficultySelect.value;
    let color = colorSelect.value;

    if (difficulty === "" || color === "") {
        return;
    }
    document.getElementById("info").style.display = "block";
    document.getElementById("menu").style.display = "none";
    if (difficulty === "easy") {
        timeLeft = 10;
        squareSize = 60;
        moveDistance = 120;
    } else if (difficulty === "medium") {
        timeLeft = 5;
        squareSize = 40;
        moveDistance = 250;
    } else if (difficulty === "hard") {
        timeLeft = 2;
        squareSize = 25;
        moveDistance = 500;
    }

    score = 0;
    scoreText.textContent = score;
    timeText.textContent = timeLeft;

    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";
    square.style.backgroundColor = color;
    square.style.display = "block";

    moveSquare();

    timer = setInterval(function () {
        timeLeft--;
        timeText.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            square.style.display = "none";
            alert("Game over! Your score is " + score + ", congratulations!\nPlease, reload the page to start a new game.");
        }
    }, 1000);
};

square.onclick = function () {
    score++;
    scoreText.textContent = score;
    moveSquare();
};

function moveSquare() {
    let gameArea = document.getElementById("gameArea");

    let currentLeft = square.offsetLeft;
    let currentTop = square.offsetTop;

    let minLeft = Math.max(0, currentLeft - moveDistance);
    let maxLeft = Math.min(gameArea.clientWidth - squareSize, currentLeft + moveDistance);

    let minTop = Math.max(0, currentTop - moveDistance);
    let maxTop = Math.min(gameArea.clientHeight - squareSize, currentTop + moveDistance);

    let newLeft = Math.floor(Math.random() * (maxLeft - minLeft + 1)) + minLeft;
    let newTop = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;

    square.style.left = newLeft + "px";
    square.style.top = newTop + "px";
}