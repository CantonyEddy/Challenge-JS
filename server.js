const express = require('express');
const app = express();
const path = require('path');

// Définir le dossier contenant les fichiers statiques
app.use(express.static(path.join(__dirname)));

// Route pour servir l'index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/index.html'));
});

app.get('/tic_tac_toe', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/tic_tac_toe.html'));
});

app.get('/snake', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/snake.html'));
});

app.get('/keyboard_cps', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/keyboard_cps.html'));
});

app.get('/memory_test', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/memory_test.html'));
});

app.get('/visual_sort', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/visual_sort.html'));
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
