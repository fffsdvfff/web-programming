let currentLevelIndex = 0;
let board = [];
let initialBoard = [];
let moves = 0;
let seconds = 0;
let timerInterval = null;

const levelSelect = document.getElementById("levelSelect");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const newGameBtn = document.getElementById("newGameBtn");

const boardElement = document.getElementById("board");
const minMovesElement = document.getElementById("minMoves");
const movesCountElement = document.getElementById("movesCount");
const timerElement = document.getElementById("timer");
const messageElement = document.getElementById("message");

fetch("data/levels.json")
    .then(response => response.json())
    .then(data => {
        levels = data;
        startGame(0);
    });

startBtn.addEventListener("click", () => {
    currentLevelIndex = Number(levelSelect.value);
    startGame(currentLevelIndex);
});

resetBtn.addEventListener("click", () => {
    startGame(currentLevelIndex);
});

newGameBtn.addEventListener("click", () => {
    currentLevelIndex++;

    if (currentLevelIndex >= levels.length) {
        currentLevelIndex = 0;
    }

    levelSelect.value = currentLevelIndex;
    startGame(currentLevelIndex);
});

function startGame(index) {
    board = copyBoard(levels[index].board);
    initialBoard = copyBoard(levels[index].board);

    moves = 0;
    seconds = 0;

    minMovesElement.textContent = levels[index].minMoves;
    movesCountElement.textContent = moves;
    timerElement.textContent = "00:00";
    messageElement.textContent = "";

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);

    renderBoard();
}

function renderBoard() {
    boardElement.innerHTML = "";

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const cell = document.createElement("div");

            cell.classList.add("cell");

            if (board[row][col] === 1) {
                cell.classList.add("on");
            }

            cell.addEventListener("click", () => {
                makeMove(row, col);
            });

            boardElement.appendChild(cell);
        }
    }
}

function makeMove(row, col) {
    toggleCell(row, col);
    toggleCell(row - 1, col);
    toggleCell(row + 1, col);
    toggleCell(row, col - 1);
    toggleCell(row, col + 1);

    moves++;
    movesCountElement.textContent = moves;

    renderBoard();
    checkWin();
}

function toggleCell(row, col) {
    if (row >= 0 && row < board.length && col >= 0 && col < board[row].length) {
        board[row][col] = board[row][col] === 1 ? 0 : 1;
    }
}

function checkWin() {
    const isWin = board.every(row => row.every(cell => cell === 0));

    if (isWin) {
        clearInterval(timerInterval);
        messageElement.textContent = "Вітаємо! Ви розв’язали головоломку!";
    }
}

function updateTimer() {
    seconds++;

    const minutes = Math.floor(seconds / 60);
    const restSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(restSeconds).padStart(2, "0");

    timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function copyBoard(sourceBoard) {
    return sourceBoard.map(row => row.slice());
}
