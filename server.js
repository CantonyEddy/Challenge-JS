const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Middleware pour traiter les données de formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Définir le dossier contenant les fichiers statiques
app.use(express.static(path.join(__dirname)));

// Route pour servir l'index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'template/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'template/login.html'));
});

app.get('/tic_tac_toe', (req, res) => {
    res.sendFile(path.join(__dirname, 'template/tic_tac_toe.html'));
});

app.get('/snake', (req, res) => {
    res.sendFile(path.join(__dirname, 'template/snake.html'));
});

app.get('/keyboard_cps', (req, res) => {
    res.sendFile(path.join(__dirname, 'template/keyboard_cps.html'));
});

app.get('/memory_test', (req, res) => {
    res.sendFile(path.join(__dirname, 'template/memory_test.html'));
});

app.get('/visual_sort', (req, res) => {
    res.sendFile(path.join(__dirname, 'template/visual_sort.html'));
});

app.get('/platformer_2d', (req, res) => {
    res.sendFile(path.join(__dirname, 'template/platform2d.html'));
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
