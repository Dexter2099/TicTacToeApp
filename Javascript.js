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
        board = ["", "", "", "", "", "", "", "", ""];
    };

    const isBoardFull = () => {
        return board.every(cell => cell !== "");
    };

    return { setCell, getCell, resetBoard, isBoardFull, board };
})();

const Player = (name, marker) => {
    return { name, marker };
};

const GameController = (() => {
    const playerX = Player("Player 1", "X");
    const playerO = Player("Player 2", "O");
    let currentPlayer = playerX;
    let gameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    };

    const checkWin = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            return combination.every(index => {
                return Gameboard.getCell(index) === currentPlayer.marker;
            });
        });
    };

    const playTurn = (cellIndex) => {
        if (!gameOver && Gameboard.setCell(parseInt(cellIndex), currentPlayer.marker)) {
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
        currentPlayer = playerX;
        gameOver = false;
        DisplayController.updateGameBoard();
        document.getElementById("game-status").textContent = 'Game reset. Player 1 starts.';
    };

    return { playTurn, resetGame };
})();

const DisplayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const gameStatus = document.getElementById("game-status");
    const restartButton = document.getElementById("restart-button");

    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            const result = GameController.playTurn(e.target.dataset.cellIndex);
            updateGameBoard();
            gameStatus.textContent = result;
        });
    });

    restartButton.addEventListener('click', () => {
        GameController.resetGame();
    });

    const updateGameBoard = () => {
        cells.forEach((cell, index) => {
            cell.textContent = Gameboard.getCell(index);
        });
    };

    updateGameBoard(); // Initial render of the board

    return { updateGameBoard };
})();





