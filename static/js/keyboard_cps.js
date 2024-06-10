// script.js

const phrases = [
    "Le texte à recopier s'affichera ici.",
    "Ceci est un test de vitesse de frappe.",
    "Vous devez recopier cette phrase correctement.",
    "Vérifiez votre vitesse et votre précision.",
    "Tapez cette phrase aussi vite que possible."
];

const textToType = document.getElementById('text-to-type');
const userInput = document.getElementById('user-input');
const timeDisplay = document.getElementById('time');
const errorsDisplay = document.getElementById('errors');
const cpmDisplay = document.getElementById('cpm');
const wpmDisplay = document.getElementById('wpm');
const toggleThemeButton = document.getElementById('toggle-theme');
const restartTestButton = document.getElementById('restart-test');
const resultsContainer = document.getElementById('results');
const previousTestsContainer = document.getElementById('previous-tests');
const startNewTestButton = document.getElementById('start-new-test');

let startTime;
let errors = 0;
let intervalId;
let previousTests = JSON.parse(localStorage.getItem('previousTests')) || [];

function getRandomPhrase() {
    return phrases[Math.floor(Math.random() * phrases.length)];
}

function startTest() {
    textToType.textContent = getRandomPhrase();
    userInput.value = '';
    userInput.disabled = false;
    userInput.focus();
    errors = 0;
    timeDisplay.textContent = 'Temps : 0s';
    errorsDisplay.textContent = 'Erreurs : 0';
    cpmDisplay.textContent = 'Touches par minute : 0';
    wpmDisplay.textContent = 'Mots par minute : 0';
    startTime = new Date();
    intervalId = setInterval(updateStats, 1000);
}

function updateStats() {
    const currentTime = new Date();
    const timeElapsed = Math.floor((currentTime - startTime) / 1000);
    const typedText = userInput.value;
    const cpm = Math.floor((typedText.length / timeElapsed) * 60);
    const words = typedText.split(' ').filter(word => word.length > 0).length;
    const wpm = Math.floor((words / timeElapsed) * 60);
    timeDisplay.textContent = `Temps : ${timeElapsed}s`;
    cpmDisplay.textContent = `Touches par minute : ${cpm}`;
    wpmDisplay.textContent = `Mots par minute : ${wpm}`;
}

function endTest() {
    clearInterval(intervalId);
    userInput.disabled = true;
    saveTest();
    displayResults();
}

function saveTest() {
    const currentTime = new Date();
    const timeElapsed = Math.floor((currentTime - startTime) / 1000);
    const typedText = userInput.value;
    const cpm = Math.floor((typedText.length / timeElapsed) * 60);
    const words = typedText.split(' ').filter(word => word.length > 0).length;
    const wpm = Math.floor((words / timeElapsed) * 60);
    const testResult = {
        time: timeElapsed,
        errors: errors,
        cpm: cpm,
        wpm: wpm
    };
    previousTests.push(testResult);
    if (previousTests.length > 10) {
        previousTests.shift();
    }
    localStorage.setItem('previousTests', JSON.stringify(previousTests));
}

function displayResults() {
    resultsContainer.classList.remove('hidden');
    previousTestsContainer.innerHTML = '';
    previousTests.forEach((test, index) => {
        const testElement = document.createElement('div');
        testElement.textContent = `Test ${index + 1} - Temps : ${test.time}s, Erreurs : ${test.errors}, CPM : ${test.cpm}, WPM : ${test.wpm}`;
        previousTestsContainer.appendChild(testElement);
    });
}

function checkInput() {
    const typedText = userInput.value;
    let correct = true;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] !== textToType.textContent[i]) {
            correct = false;
            errors++;
            break;
        }
    }
    if (correct) {
        userInput.classList.add('correct');
        userInput.classList.remove('incorrect');
    } else {
        userInput.classList.add('incorrect');
        userInput.classList.remove('correct');
    }
    errorsDisplay.textContent = `Erreurs : ${errors}`;
    if (typedText === textToType.textContent) {
        endTest();
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    toggleThemeButton.textContent = isDarkMode ? 'Mode Clair' : 'Mode Sombre';
}

toggleThemeButton.addEventListener('click', toggleTheme);
restartTestButton.addEventListener('click', startTest);
startNewTestButton.addEventListener('click', () => {
    resultsContainer.classList.add('hidden');
    startTest();
});
userInput.addEventListener('input', checkInput);

// Initialisation
startTest();
