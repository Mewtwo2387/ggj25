const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const creditsElement = document.getElementById('credits');
const upgrade1Button = document.getElementById('upgrade1');
const upgrade2Button = document.getElementById('upgrade2');
const upgrade3Button = document.getElementById('upgrade3');
const spikeupgradeButton = document.getElementById('spikeupgrade');
const ui = document.getElementById('ui');
const toggleButton = document.getElementById('toggleButton');
const savePopup = document.getElementById('savePopup');
let spawnIntervalId = null;

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
        this.maxBaseValue = 10;
        this.spawnInterval = 3000;
        this.riseSpeed = 1;

        this.upgrade1Level = 1;
        this.upgrade2Level = 1;
        this.upgrade3Level = 1;

        this.upgrade1Cost = 50;
        this.upgrade2Cost = 100;
        this.upgrade3Cost = 150;

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
        spawnIntervalId = setInterval(spawnBubble, gameData.spawnInterval);
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
    constructor(x, y, baseRadius, baseValue, speed) {
        this.x = x;
        this.y = y;
        this.baseRadius = baseRadius;
        this.radius = baseRadius;
        this.baseValue = baseValue;
        this.currentValue = baseValue;
        this.speed = speed;
        this.gradient = this.createGradient();
        this.popping = false;
    }

    createGradient() {
        const gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.2, this.x, this.y, this.radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.5, 'rgba(173, 216, 230, 0.8)');
        gradient.addColorStop(1, 'rgba(70, 130, 180, 0.8)');
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
            this.y -= this.speed * gameData.riseSpeed;
            this.radius += this.baseRadius * (0.01 * gameData.riseSpeed);
            this.currentValue += this.baseValue * 0.01;
        }
        this.gradient = this.createGradient();
        return false;
    }
}

function spawnBubble() {
    if (!document.hasFocus()) {
        return;
    }
    let x, y;
    do {
        x = Math.random() * (canvas.width - 20) + 10;
        y = canvas.height + 20;
    } while (x < uiBounds.x + uiBounds.width && y < uiBounds.y + uiBounds.height);

    const random = Math.random();
    const baseValue = random * gameData.maxBaseValue;
    const baseRadius = random * 10 + 10;
    const speed = Math.random() * 1 + 1;
    gameData.bubbles.push(new Bubble(x, y, baseRadius, baseValue, speed));
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

upgrade1Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.upgrade1Cost) {
        gameData.credits -= gameData.upgrade1Cost;
        gameData.maxBaseValue += 5;
        gameData.upgrade1Level++;
        gameData.upgrade1Cost = Math.floor(gameData.upgrade1Cost * 1.5);
        updateCreditsDisplay();
        updateUpgradeButtons();
    }
});

upgrade2Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.upgrade2Cost) {
        gameData.credits -= gameData.upgrade2Cost;
        gameData.spawnInterval = Math.floor(gameData.spawnInterval * 0.9);
        clearInterval(spawnIntervalId);
        spawnIntervalId = setInterval(spawnBubble, gameData.spawnInterval);
        gameData.upgrade2Level++;
        gameData.upgrade2Cost = Math.floor(gameData.upgrade2Cost * 1.5);
        updateCreditsDisplay();
        updateUpgradeButtons();
    }
});

upgrade3Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.upgrade3Cost) {
        gameData.credits -= gameData.upgrade3Cost;
        gameData.riseSpeed *= 0.9;
        gameData.upgrade3Level++;
        gameData.upgrade3Cost = Math.floor(gameData.upgrade3Cost * 1.5);
        updateCreditsDisplay();
        updateUpgradeButtons();
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
    upgrade1Button.querySelector('.upgrade-details').textContent = `Cost: $${formatNumber(gameData.upgrade1Cost)} | Level: ${gameData.upgrade1Level} | Base Value: $${formatNumber(gameData.maxBaseValue)} | Next: $${formatNumber(gameData.maxBaseValue + 5)}`;
    upgrade2Button.querySelector('.upgrade-details').textContent = `Cost: $${formatNumber(gameData.upgrade2Cost)} | Level: ${gameData.upgrade2Level} | Interval: ${formatNumber(gameData.spawnInterval)}ms | Next: ${formatNumber(gameData.spawnInterval * 0.9)}ms`;
    upgrade3Button.querySelector('.upgrade-details').textContent = `Cost: $${formatNumber(gameData.upgrade3Cost)} | Level: ${gameData.upgrade3Level} | Rise Speed: ${formatNumber(gameData.riseSpeed)} | Next: ${formatNumber(gameData.riseSpeed * 0.9)}`;
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