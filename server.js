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

// Route pour traiter la demande de connexion
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Vérification des informations d'identification (à remplacer par votre propre logique d'authentification)
    if (username === 'utilisateur' && password === 'motdepasse') {
        // Authentification réussie, rediriger vers une page sécurisée par exemple
        res.send('Authentification réussie ! Redirection vers la page sécurisée...');
    } else {
        // Informations d'identification incorrectes, afficher un message d'erreur par exemple
        res.send('Nom d\'utilisateur ou mot de passe incorrect.');
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
