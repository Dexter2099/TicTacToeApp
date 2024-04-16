// Player Factory Function
const Player = (name, marker) => {
    return { name, marker };
};

// Gameboard Module
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    
    const setCell = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false;
    };

    const getCell = (index) => board[index];

    const resetBoard = () => {
        board.fill("");
    };

    const isBoardFull = () => {
        return board.every(cell => cell !== "");
    };

    return { setCell, getCell, resetBoard, isBoardFull };
})();

// Game Controller Module
const GameController = (() => {
    let players = [Player("Player 1", "X"), Player("Player 2", "O")];
    let currentPlayer = players[0];
    let gameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            return pattern.every(index => {
                return Gameboard.getCell(index) === currentPlayer.marker;
            });
        });
    };

    const playTurn = (index) => {
        if (!gameOver && Gameboard.setCell(index, currentPlayer.marker)) {
            if (checkWin()) {
                gameOver = true;
                return `${currentPlayer.name} wins!`;
            } else if (Gameboard.isBoardFull()) {
                gameOver = true;
                return "It's a tie!";
            } else {
                switchPlayer();
                return "Continue";
            }
        }
        return "Invalid move";
    };

    const resetGame = () => {
        Gameboard.resetBoard();
        currentPlayer = players[0];
        gameOver = false;
        DisplayController.updateGameBoard();
        document.getElementById("game-status").textContent = 'Game reset. Player 1 starts.';
    };

    const initPlayers = (name1, name2) => {
        players[0] = Player(name1, "X");
        players[1] = Player(name2, "O");
        currentPlayer = players[0];
    };

    return { playTurn, resetGame, initPlayers };
})();

// Display Controller Module
const DisplayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const gameStatus = document.getElementById("game-status");
    const restartButton = document.getElementById("restart-button");

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            const result = GameController.playTurn(index);
            updateGameBoard();
            gameStatus.textContent = result;
        });
    });

    restartButton.addEventListener('click', GameController.resetGame);

    const updateGameBoard = () => {
        cells.forEach((cell, index) => {
            cell.textContent = Gameboard.getCell(index);
        });
    };

    return { updateGameBoard };
})();

// Event Listeners for Player Initialization
document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const player1Name = document.getElementById('player1Name').value || 'Player 1';
    const player2Name = document.getElementById('player2Name').value || 'Player 2';
    GameController.initPlayers(player1Name, player2Name);
    document.getElementById('startModal').style.display = 'none';
    DisplayController.updateGameBoard();
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startModal').style.display = 'block';
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('startModal').style.display = 'none';
    });
});
