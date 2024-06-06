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
        // Réinitialise le compteur de clics
        clickCounter = 0;

        // Génère aléatoirement les carrés qui doivent être allumés
        activeCells = generateRandomCells(cells.length);

        // Affiche les carrés allumés
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
            // Active l'écoute des clics sur les carrés pour que l'utilisateur puisse les sélectionner
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
                    // Réinitialise le jeu ou affiche un message d'erreur
                }
                // Vérifie si la cellule cliquée est parmi les cellules actives
                if (activeCells.includes(index)) {
                    cell.classList.add('selected');
                    userSelections.push(index);
                    // Vérifie la victoire après chaque clic
                    if (checkUserSelection()) {
                        alert('Gagné!');
                        // Réinitialise le jeu ou affiche un message de victoire
                    }
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
