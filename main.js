const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const creditsElement = document.getElementById('credits');
const ui = document.getElementById('ui');
const toggleButton = document.getElementById('toggleButton');
const savePopup = document.getElementById('savePopup');
let blueSpawnIntervalId = null;
let greenSpawnIntervalId = null;
let redSpawnIntervalId = null;

const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settingsModal');
const closeButtons = document.querySelectorAll('.close-button');
const aboutButton = document.getElementById('aboutButton');
const aboutModal = document.getElementById('aboutModal');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const uiBounds = {
    x: 0,
    y: 0,
    width: 300,
    height: 150
};

let uiCollapsed = true;

toggleButton.addEventListener('click', () => {
    uiCollapsed = !uiCollapsed;
    if (uiCollapsed) {
        toggleButton.textContent = '^';
        ui.classList.remove('collapsed');
    } else {
        toggleButton.textContent = 'v';
        ui.classList.add('collapsed');
    }
});

class GameData {
    constructor() {
        this.bubbles = [];
        this.credits = 0;

        this.blueMaxBaseValue = 10;
        this.blueSpawnInterval = 3000;
        this.blueRiseSpeed = 1;
        this.blueBaseValueMultiplier = 1;

        this.blueUpgrade1Level = 1;
        this.blueUpgrade2Level = 1;
        this.blueUpgrade3Level = 1;
        this.blueAscensionLevel = 0;

        this.blueUpgrade1Cost = 50;
        this.blueUpgrade2Cost = 100;
        this.blueUpgrade3Cost = 150;

        this.greenMaxBaseValue = 100;
        this.greenSpawnInterval = 10000;
        this.greenRiseSpeed = 1;
        this.greenBaseValueMultiplier = 1;

        this.greenUpgrade1Level = 1;
        this.greenUpgrade2Level = 1;
        this.greenUpgrade3Level = 1;
        this.greenAscensionLevel = 0;

        this.greenUpgrade1Cost = 1000;
        this.greenUpgrade2Cost = 2000;
        this.greenUpgrade3Cost = 3000;

        this.redMaxBaseValue = 1000;
        this.redSpawnInterval = 30000;
        this.redRiseSpeed = 1;
        this.redBaseValueMultiplier = 1;

        this.redUpgrade1Level = 1;
        this.redUpgrade2Level = 1;
        this.redUpgrade3Level = 1;
        this.redAscensionLevel = 0;

        this.redUpgrade1Cost = 20000;
        this.redUpgrade2Cost = 40000;
        this.redUpgrade3Cost = 60000;

        this.green = false;
        this.red = false;
        this.spike = false;
        this.water = false;
    }
}

function saveGameState() {
    localStorage.setItem('gameState', JSON.stringify(gameData));
    console.log('Game saved!');
    showSavePopup();
}

function loadGameState() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        Object.assign(gameData, gameState);
        gameData.bubbles = [];
        blueSpawnIntervalId = setInterval(spawnBlueBubble, gameData.blueSpawnInterval);
        if (gameData.green) {
            greenSpawnIntervalId = setInterval(spawnGreenBubble, gameData.greenSpawnInterval);
        }
        if (gameData.red) {
            redSpawnIntervalId = setInterval(spawnRedBubble, gameData.redSpawnInterval);
        }
        updateCreditsDisplay();
        updateUpgradeButtons();
    }
}

function showSavePopup() {
    savePopup.classList.remove('hidden');
    setTimeout(() => {
        savePopup.classList.add('hidden');
    }, 2000);
}

const gameData = new GameData();

function drawSpikes() {
    const spikeWidth = 20;
    const spikeHeight = 10;
    const spikeCount = Math.ceil(canvas.width / spikeWidth);

    ctx.fillStyle = '#a33';
    for (let i = 0; i < spikeCount; i++) {
        const x = i * spikeWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + spikeWidth / 2, spikeHeight);
        ctx.lineTo(x + spikeWidth, 0);
        ctx.closePath();
        ctx.fill();
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameData.spike) {
        drawSpikes();
    }

    gameData.bubbles.forEach((bubble, index) => {
        if(bubble.update()){
            gameData.bubbles.splice(index, 1);
            return;
        }
        bubble.draw();

        if (bubble.y - bubble.radius < 0) {
            if (gameData.spike) {
                gameData.credits += bubble.currentValue * 0.5;
                updateCreditsDisplay();
                bubble.pop();
            }
            return;
        }

        if (bubble.y + bubble.radius < 0) {
            gameData.bubbles.splice(index, 1);
        }
    });

    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    gameData.bubbles.forEach((bubble, index) => {
        const dist = Math.sqrt(
            (mouseX - bubble.x) ** 2 + (mouseY - bubble.y) ** 2
        );

        if (dist < bubble.radius) {
            gameData.credits += bubble.currentValue;
            updateCreditsDisplay();
            bubble.pop();
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 's' || e.key === 'S') {
        saveGameState();
    }
});

function updateCreditsDisplay() {
    creditsElement.textContent = `$${format(gameData.credits)}`;
}

settingsButton.addEventListener('click', () => {
    settingsModal.classList.add('show');
});

aboutButton.addEventListener('click', () => {
    aboutModal.classList.add('show');
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        settingsModal.classList.remove('show');
        aboutModal.classList.remove('show');
    });
});

window.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
        settingsModal.classList.remove('show');
    }
    if (event.target === aboutModal) {
        aboutModal.classList.remove('show');
    }
});

document.getElementById('resetButton').addEventListener('click', () => {
    if (document.getElementById('confirmReset').value === 'reset') {
        localStorage.clear();
        location.reload();
    }
});

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-tab');

        tabContents.forEach(content => {
            content.classList.add('hidden');
            if (content.id === target) {
                content.classList.remove('hidden');
            }
        });
    });
});

loadGameState();
gameLoop();
updateUpgradeButtons();
document.querySelector('.tab-button[data-tab="bubble-upgrades"]').click();
setInterval(saveGameState, 10000);