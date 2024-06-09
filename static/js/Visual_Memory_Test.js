document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('start-game');
    const cells = document.querySelectorAll('.board-cell');
    let activeCells = [];
    let userSelections = [];
    let clickCounter = 0;

    startButton.addEventListener('click', function() {
        initializeGame();
    });

    function initializeGame() {
        clickCounter = 0;
        activeCells = generateRandomCells(cells.length);
        activateCellsSequentially(activeCells, 0);
    }

    function generateRandomCells(totalCells) {
        const activeCells = [];
        const maxActiveCells = 5; // Nombre maximum de carrés allumés
        for (let i = 0; i < maxActiveCells; i++) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * totalCells);
            } while (activeCells.includes(randomIndex));
            activeCells.push(randomIndex);
        }
        return activeCells;
    }

    function activateCellsSequentially(activeCells, index) {
        if (index < activeCells.length) {
            cells[activeCells[index]].classList.add('active');
            setTimeout(function() {
                cells[activeCells[index]].classList.remove('active');
                activateCellsSequentially(activeCells, index + 1);
            }, 1000); // 1 seconde d'allumage avant de passer au suivant
        } else {
            setTimeout(function() {
                activateClickListeners();
            }, 1000); // Attend 1 seconde après l'allumage de tous les carrés avant d'activer les clics
        }
    }

    function activateClickListeners() {
        cells.forEach(function(cell, index) {
            cell.addEventListener('click', function() {
                // Vérifie si le compteur de clics a atteint 10
                clickCounter++;
                if (clickCounter === 10) {
                    alert('Perdu!');
                }
                // Vérifie si la cellule cliquée est parmi les cellules actives
                if (activeCells.includes(index)) {
                    cell.classList.add('selected');
                    userSelections.push(index);
                    if (checkUserSelection()) {
                        alert('Gagné!');
                    }
                }
            });
        });
    }
    
    function checkUserSelection() {
        return userSelections.every(function(selection) {
            return activeCells.includes(selection);
        });
    }
});
