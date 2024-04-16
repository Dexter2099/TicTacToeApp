const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const setCell = (index, marker) => {
        if (index >= 0 && index < board.length && board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false;
    };

    const getCell = (index) => board[index];

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { setCell, getCell, resetBoard };
})();

console.log(Gameboard);  // Test the Gameboard Module
