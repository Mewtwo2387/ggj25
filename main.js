const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const creditsElement = document.getElementById('credits');
const blueUpgrade1Button = document.getElementById('blueUpgrade1');
const blueUpgrade2Button = document.getElementById('blueUpgrade2');
const blueUpgrade3Button = document.getElementById('blueUpgrade3');
const greenUpgrade1Button = document.getElementById('greenUpgrade1');
const greenUpgrade2Button = document.getElementById('greenUpgrade2');
const greenUpgrade3Button = document.getElementById('greenUpgrade3');
const unlockGreenButton = document.getElementById('unlockGreen');
const greenRow = document.getElementById('green-upgrades');
const unlockGreenRow = document.getElementById('green-unlock');
const spikeupgradeButton = document.getElementById('spikeupgrade');
const ui = document.getElementById('ui');
const toggleButton = document.getElementById('toggleButton');
const savePopup = document.getElementById('savePopup');
let blueSpawnIntervalId = null;
let greenSpawnIntervalId = null;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const uiBounds = {
    x: 0,
    y: 0,
    width: 300,
    height: 150
};

let uiVisible = true;

toggleButton.addEventListener('click', () => {
    uiVisible = !uiVisible;
    if (uiVisible) {
        toggleButton.textContent = '<';
        ui.classList.remove('hidden');
    } else {
        toggleButton.textContent = '>';
        ui.classList.add('hidden');
    }
});

class GameData {
    constructor() {
        this.bubbles = [];
        this.credits = 0;

        this.blueMaxBaseValue = 10;
        this.blueSpawnInterval = 3000;
        this.blueRiseSpeed = 1;

        this.blueUpgrade1Level = 1;
        this.blueUpgrade2Level = 1;
        this.blueUpgrade3Level = 1;

        this.blueUpgrade1Cost = 50;
        this.blueUpgrade2Cost = 100;
        this.blueUpgrade3Cost = 150;

        this.greenMaxBaseValue = 100;
        this.greenSpawnInterval = 5000;
        this.greenRiseSpeed = 1;

        this.greenUpgrade1Level = 1;
        this.greenUpgrade2Level = 1;
        this.greenUpgrade3Level = 1;

        this.greenUpgrade1Cost = 1000;
        this.greenUpgrade2Cost = 2000;
        this.greenUpgrade3Cost = 3000;

        this.green = false;
        this.spike = false;
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

class Bubble {
    constructor(x, y, baseRadius, baseValue, speed, colour) {
        this.x = x;
        this.y = y;
        this.baseRadius = baseRadius;
        this.radius = baseRadius;
        this.baseValue = baseValue;
        this.currentValue = baseValue;
        this.speed = speed;
        this.gradient = this.createGradient();
        this.popping = false;
        this.colour = colour;
    }

    createGradient() {
        const gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.2, this.x, this.y, this.radius);
        if (this.colour === 'blue') {
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
            gradient.addColorStop(0.5, 'rgba(173, 216, 230, 0.8)');
            gradient.addColorStop(1, 'rgba(70, 130, 180, 0.8)');
        } else if (this.colour === 'green') {
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
            gradient.addColorStop(0.5, 'rgba(144, 238, 144, 0.8)');
            gradient.addColorStop(1, 'rgba(60, 179, 113, 0.8)');
        }
        return gradient;
    }

    pop() {
        this.popping = true;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.gradient;
        ctx.fill();
        ctx.closePath();

        ctx.font = `${this.radius * 0.5}px Arial`;
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`$${Math.floor(this.currentValue)}`, this.x, this.y);
    }

    update() {
        if (this.popping) {
            this.radius -= this.baseRadius * 0.1;
            if (this.radius <= 0) {
                return true;
            }
        } else {
            if (this.colour === 'blue') {
                this.y -= this.speed * gameData.blueRiseSpeed;
                this.radius += this.baseRadius * (0.01 * gameData.blueRiseSpeed);
                this.currentValue += this.baseValue * 0.01;
            } else if (this.colour === 'green') {
                this.y -= this.speed * gameData.greenRiseSpeed;
                this.radius += this.baseRadius * (0.01 * gameData.greenRiseSpeed);
                this.currentValue += this.baseValue * 0.01;
            }
        }
        this.gradient = this.createGradient();
        return false;
    }
}

function spawnBlueBubble() {
    if (!document.hasFocus()) {
        return;
    }
    let x, y;
    do {
        x = Math.random() * (canvas.width - 20) + 10;
        y = canvas.height + 20;
    } while (x < uiBounds.x + uiBounds.width && y < uiBounds.y + uiBounds.height);

    const random = Math.random();
    const baseValue = random * gameData.blueMaxBaseValue;
    const baseRadius = random * 10 + 10;
    const speed = Math.random() * 1 + 1;
    gameData.bubbles.push(new Bubble(x, y, baseRadius, baseValue, speed, 'blue'));
    console.log(gameData.bubbles);
}

function spawnGreenBubble() {
    let x, y;
    do {
        x = Math.random() * (canvas.width - 20) + 10;
        y = canvas.height + 20;
    } while (x < uiBounds.x + uiBounds.width && y < uiBounds.y + uiBounds.height);

    const random = Math.random();
    const baseValue = random * gameData.greenMaxBaseValue;
    const baseRadius = random * 10 + 10;
    const speed = Math.random() * 1 + 1;
    gameData.bubbles.push(new Bubble(x, y, baseRadius, baseValue, speed, 'green'));
    console.log(gameData.bubbles);
}

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
                gameData.credits += Math.floor(bubble.currentValue * 0.5);
                updateCreditsDisplay();
            }
            bubble.pop();
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
            gameData.credits += Math.floor(bubble.currentValue);
            updateCreditsDisplay();
            bubble.pop();
        }
    });
});

blueUpgrade1Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.blueUpgrade1Cost) {
        gameData.credits -= gameData.blueUpgrade1Cost;
        gameData.blueMaxBaseValue += 5;
        gameData.blueUpgrade1Level++;
        gameData.blueUpgrade1Cost = Math.floor(gameData.blueUpgrade1Cost * 1.5);
        updateCreditsDisplay();
        updateUpgradeButtons();
    }
});

blueUpgrade2Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.blueUpgrade2Cost) {
        gameData.credits -= gameData.blueUpgrade2Cost;
        gameData.blueSpawnInterval = Math.floor(gameData.blueSpawnInterval * 0.9);
        clearInterval(blueSpawnIntervalId);
        blueSpawnIntervalId = setInterval(spawnBlueBubble, gameData.blueSpawnInterval);
        gameData.blueUpgrade2Level++;
        gameData.blueUpgrade2Cost = Math.floor(gameData.blueUpgrade2Cost * 1.5);
        updateCreditsDisplay();
        updateUpgradeButtons();
    }
});

blueUpgrade3Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.blueUpgrade3Cost) {
        gameData.credits -= gameData.blueUpgrade3Cost;
        gameData.blueRiseSpeed *= 0.9;
        gameData.blueUpgrade3Level++;
        gameData.blueUpgrade3Cost = Math.floor(gameData.blueUpgrade3Cost * 1.5);
        updateCreditsDisplay();
        updateUpgradeButtons();
    }
});

greenUpgrade1Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.greenUpgrade1Cost) {
        gameData.credits -= gameData.greenUpgrade1Cost;
        gameData.greenMaxBaseValue += 50;
        gameData.greenUpgrade1Level++;
        gameData.greenUpgrade1Cost = Math.floor(gameData.greenUpgrade1Cost * 1.5);
        updateCreditsDisplay();
        updateUpgradeButtons();
    }
});

greenUpgrade2Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.greenUpgrade2Cost) {
        gameData.credits -= gameData.greenUpgrade2Cost;
        gameData.greenSpawnInterval = Math.floor(gameData.greenSpawnInterval * 0.9);
        clearInterval(greenSpawnIntervalId);
        greenSpawnIntervalId = setInterval(spawnGreenBubble, gameData.greenSpawnInterval);
        gameData.greenUpgrade2Level++;
        gameData.greenUpgrade2Cost = Math.floor(gameData.greenUpgrade2Cost * 1.5);
        updateCreditsDisplay();
        updateUpgradeButtons();
    }
});

greenUpgrade3Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.greenUpgrade3Cost) {
        gameData.credits -= gameData.greenUpgrade3Cost;
        gameData.greenRiseSpeed *= 0.9;
        gameData.greenUpgrade3Level++;
        gameData.greenUpgrade3Cost = Math.floor(gameData.greenUpgrade3Cost * 1.5);
        updateCreditsDisplay();
        updateUpgradeButtons();
    }
});

unlockGreenButton.addEventListener('click', () => {
    if (gameData.credits >= 1000) {
        gameData.credits -= 1000;
        gameData.green = true;
        updateCreditsDisplay();
        updateUpgradeButtons();
        greenSpawnIntervalId = setInterval(spawnGreenBubble, gameData.greenSpawnInterval);
    }
});

spikeupgrade.addEventListener('click', () => {
    if (gameData.credits >= 10000 && !gameData.spike) {
        gameData.credits -= 10000;
        gameData.spike = true;
        updateCreditsDisplay();
        updateUpgradeButtons();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 's' || e.key === 'S') {
        saveGameState();
    }
});

function updateCreditsDisplay() {
    creditsElement.textContent = `$${formatNumber(gameData.credits)}`;
}

function updateUpgradeButtons() {
    blueUpgrade1Button.querySelector('.upgrade-details').textContent = `Cost: $${formatNumber(gameData.blueUpgrade1Cost)} \n Level: ${gameData.blueUpgrade1Level} \n Value: $${formatNumber(gameData.blueMaxBaseValue)} \n Next: $${formatNumber(gameData.blueMaxBaseValue + 5)}`;
    blueUpgrade2Button.querySelector('.upgrade-details').textContent = `Cost: $${formatNumber(gameData.blueUpgrade2Cost)} \n Level: ${gameData.blueUpgrade2Level} \n Interval: ${formatNumber(gameData.blueSpawnInterval)}ms \n Next: ${formatNumber(gameData.blueSpawnInterval * 0.9)}ms`;
    blueUpgrade3Button.querySelector('.upgrade-details').textContent = `Cost: $${formatNumber(gameData.blueUpgrade3Cost)} \n Level: ${gameData.blueUpgrade3Level} \n Speed: ${formatNumber(gameData.blueRiseSpeed)} \n Next: ${formatNumber(gameData.blueRiseSpeed * 0.9)}`;
    greenUpgrade1Button.querySelector('.upgrade-details').textContent = `Cost: $${formatNumber(gameData.greenUpgrade1Cost)} \n Level: ${gameData.greenUpgrade1Level} \n Value: $${formatNumber(gameData.greenMaxBaseValue)} \n Next: $${formatNumber(gameData.greenMaxBaseValue + 50)}`;
    greenUpgrade2Button.querySelector('.upgrade-details').textContent = `Cost: $${formatNumber(gameData.greenUpgrade2Cost)} \n Level: ${gameData.greenUpgrade2Level} \n Interval: ${formatNumber(gameData.greenSpawnInterval)}ms \n Next: ${formatNumber(gameData.greenSpawnInterval * 0.9)}ms`;
    greenUpgrade3Button.querySelector('.upgrade-details').textContent = `Cost: $${formatNumber(gameData.greenUpgrade3Cost)} \n Level: ${gameData.greenUpgrade3Level} \n Speed: ${formatNumber(gameData.greenRiseSpeed)} \n Next: ${formatNumber(gameData.greenRiseSpeed * 0.9)}`;
    if (gameData.green) {
        greenRow.classList.remove('hidden');
        unlockGreenRow.classList.add('hidden');
    } else {
        greenRow.classList.add('hidden');
        unlockGreenRow.classList.remove('hidden');
    }
    if (gameData.spike) {
        spikeupgradeButton.disabled = true;
    }
}

function formatNumber(num) {
    return num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 3 });
}

loadGameState();
gameLoop();
updateUpgradeButtons();
setInterval(saveGameState, 10000);