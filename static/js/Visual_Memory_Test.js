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
        // Réinitialiser les variables de jeu
        clickCounter = 0;
        userSelections = [];
        
        // Réinitialiser les classes des cellules
        cells.forEach(function(cell) {
            cell.classList.remove('active', 'selected');
        });

        // Supprimer les anciens écouteurs de clic
        cells.forEach(function(cell) {
            const newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);
        });

        // Met à jour la référence des cellules après la suppression des écouteurs
        const newCells = document.querySelectorAll('.board-cell');

        // Générer aléatoirement les carrés qui doivent être allumés
        activeCells = generateRandomCells(newCells.length);

        // Afficher les carrés allumés
        activateCellsSequentially(newCells, 0);
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

    function activateCellsSequentially(newCells, index) {
        if (index < activeCells.length) {
            newCells[activeCells[index]].classList.add('active');
            setTimeout(function() {
                newCells[activeCells[index]].classList.remove('active');
                activateCellsSequentially(newCells, index + 1);
            }, 1000); // 1 seconde d'allumage avant de passer au suivant
        } else {
            setTimeout(function() {
                activateClickListeners(newCells);
            }, 1000); // Attend 1 seconde après l'allumage de tous les carrés avant d'activer les clics
        }
    }

    function activateClickListeners(newCells) {
        newCells.forEach(function(cell, index) {
            cell.addEventListener('click', function() {
                // Vérifie si la cellule cliquée est parmi les cellules actives
                if (activeCells.includes(index)) {
                    if (!userSelections.includes(index)) {
                        cell.classList.add('selected');
                        userSelections.push(index);
                    }

                    // Vérifie la victoire après chaque clic
                    if (userSelections.length === activeCells.length && checkUserSelection()) {
                        alert('Gagné!');
                    }
                } else {
                    // Perdu dès le premier clic incorrect
                    alert('Perdu!');
                }
            });
        });
    }

    function checkUserSelection() {
        // Vérifie si les sélections du joueur correspondent aux cellules actives
        return userSelections.every(function(selection) {
            return activeCells.includes(selection);
        });
    }
});
