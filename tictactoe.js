const PLAYER_O = 'O';
const PLAYER_X = 'X';

let board;
let currentPlayer = PLAYER_O;
let gameOver = false;
let scores = {
    [PLAYER_O]: 0,
    [PLAYER_X]: 0,
    ties: 0
};

const WINNING_COMBINATIONS = [
    // Rows
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // Columns
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // Diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
];

window.addEventListener('DOMContentLoaded', () => {
    initGame();
    document.getElementById('reset-btn').addEventListener('click', resetGame);
});

function initGame() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    gameOver = false;
    currentPlayer = PLAYER_O;
    updateStatus();

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const tile = document.createElement('div');
            tile.id = `${r}-${c}`;
            tile.classList.add('tile');
            tile.addEventListener('click', handleTileClick);
            boardElement.appendChild(tile);
        }
    }
}

function handleTileClick() {
    if (gameOver) return;

    const [r, c] = this.id.split('-').map(Number);

    if (board[r][c] !== ' ') return;

    // Apply move
    board[r][c] = currentPlayer;
    this.innerText = currentPlayer;
    this.classList.add('filled', currentPlayer === PLAYER_O ? 'tile-o' : 'tile-x');

    // Check winner or draw
    const winningCombo = checkWinningCombo();
    if (winningCombo) {
        handleWin(winningCombo);
        return;
    }

    if (checkTie()) {
        handleTie();
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === PLAYER_O ? PLAYER_X : PLAYER_O;
    updateStatus();
}

function checkWinningCombo() {
    for (const combo of WINNING_COMBINATIONS) {
        const [a, b, c] = combo;
        const valA = board[a[0]][a[1]];
        const valB = board[b[0]][b[1]];
        const valC = board[c[0]][c[1]];

        if (valA !== ' ' && valA === valB && valB === valC) {
            return combo;
        }
    }
    return null;
}

function checkTie() {
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[r][c] === ' ') {
                return false;
            }
        }
    }
    return true;
}

function handleWin(winningCombo) {
    gameOver = true;
    scores[currentPlayer]++;
    updateScoreboard();

    // Highlight winning tiles
    winningCombo.forEach(([r, c]) => {
        const tile = document.getElementById(`${r}-${c}`);
        tile.classList.add('winner-tile');
    });

    // Update status badge
    const statusElement = document.getElementById('status');
    const statusText = document.getElementById('status-text');
    statusElement.className = `status-badge ${currentPlayer === PLAYER_O ? 'turn-o' : 'turn-x'}`;
    statusText.innerText = `Player ${currentPlayer} Wins! 🎉`;
}

function handleTie() {
    gameOver = true;
    scores.ties++;
    updateScoreboard();

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            document.getElementById(`${r}-${c}`).classList.add('tie-tile');
        }
    }

    const statusElement = document.getElementById('status');
    const statusText = document.getElementById('status-text');
    statusElement.className = 'status-badge tie';
    statusText.innerText = `It's a Tie! 🤝`;
}

function updateStatus() {
    const statusElement = document.getElementById('status');
    const statusText = document.getElementById('status-text');
    statusElement.className = `status-badge ${currentPlayer === PLAYER_O ? 'turn-o' : 'turn-x'}`;
    statusText.innerText = `Player ${currentPlayer}'s Turn`;
}

function updateScoreboard() {
    document.getElementById('score-o').innerText = scores[PLAYER_O];
    document.getElementById('score-x').innerText = scores[PLAYER_X];
    document.getElementById('score-ties').innerText = scores.ties;
}

function resetGame() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    gameOver = false;
    currentPlayer = PLAYER_O;
    updateStatus();

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const tile = document.getElementById(`${r}-${c}`);
            tile.innerText = '';
            tile.className = 'tile';
        }
    }
}
