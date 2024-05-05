// Fonction pour générer un tableau de nombres aléatoires
function generateArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.random());
    }
    return array;
}

// Fonction pour vider la mémoire
function clearMemory() {
    // Affectez null aux variables contenant des données pour libérer la mémoire
    array = null;
}

// Test de mémoire
function memoryTest() {
    const arraySize = 1000000; // Taille du tableau
    let array = generateArray(arraySize); // Générer un tableau de nombres aléatoires

    // Afficher la consommation de mémoire avant de vider
    console.log("Mémoire utilisée avant de vider : " + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB");

    // Vider la mémoire
    clearMemory();

    // Afficher la consommation de mémoire après avoir vidé
    console.log("Mémoire utilisée après avoir vidé : " + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB");
}

// Exécuter le test de mémoire
memoryTest();
