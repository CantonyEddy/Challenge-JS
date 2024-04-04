const express = require('express');
const app = express();
const path = require('path');

// Définir le dossier contenant les fichiers statiques
app.use(express.static(path.join(__dirname)));

// Route pour servir l'index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
