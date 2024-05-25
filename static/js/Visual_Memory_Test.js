document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    const gameBoard = document.getElementById('game-board');
    const startButton = document.getElementById('start-game');
    let squares = [];
    let activeSquares = [];

    function createSquares() {
        console.log("Creating squares...");
        const boardRows = document.querySelectorAll('.board-row');
        boardRows.forEach(row => {
            const cells = row.querySelectorAll('.board-cell');
            cells.forEach(cell => {
                squares.push(cell);
                cell.addEventListener('click', () => {
                    toggleActive(cell);
                });
            });
        });
        console.log("Squares created:", squares.length);
    }

    function randomlyActivateSquares(numActive) {
        console.log("Randomly activating squares...");
        const shuffledSquares = squares.slice().sort(() => 0.5 - Math.random());
        activeSquares = shuffledSquares.slice(0, numActive);
        activeSquares.forEach(square => square.classList.add('active'));
        console.log("Active squares:", activeSquares.length);
    }

    function toggleActive(square) {
        if (square.classList.contains('active')) {
            square.classList.remove('active');
            const index = activeSquares.indexOf(square);
            activeSquares.splice(index, 1);
        } else {
            square.classList.add('active');
            activeSquares.push(square);
        }
        console.log("Toggled square, active squares count:", activeSquares.length);
    }

    function clearBoard() {
        console.log("Clearing board...");
        activeSquares.forEach(square => square.classList.remove('active'));
        activeSquares = [];
        console.log("Board cleared");
    }

    startButton.addEventListener('click', () => {
        console.log("Start button clicked");
        createSquares();
        randomlyActivateSquares(3);
        setTimeout(clearBoard, 5000);
    });
});
