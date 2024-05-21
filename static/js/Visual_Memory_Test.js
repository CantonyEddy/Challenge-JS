document.addEventListener("DOMContentLoaded", function() {
    const gameBoard = document.getElementById('game-board');
    const startButton = document.getElementById('start-game');
    let squares = [];
    let activeSquares = [];

    function createSquares() {
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
    }

    function randomlyActivateSquares(numActive) {
        const shuffledSquares = squares.slice().sort(() => 0.5 - Math.random());
        activeSquares = shuffledSquares.slice(0, numActive);
        activeSquares.forEach(square => square.classList.add('active'));
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
    }

    function clearBoard() {
        activeSquares.forEach(square => square.classList.remove('active'));
        activeSquares = [];
    }

    // Écouteur d'événement pour le bouton de démarrage du jeu
    startButton.addEventListener('click', () => {
        createSquares();
        randomlyActivateSquares(3); // Changez le nombre de carrés actifs au début ici
        setTimeout(clearBoard, 5000); // Désactive tous les carrés après 5 secondes
    });
});
