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

let wind = 0;

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
        this.spikeUp = false;
        this.spikeLeft = false;
        this.spikeRight = false;
        this.water = false;
        this.golden = false;

        this.ascensionPoints = 0;

        this.ascensionIntervalUpgradeLevel = 0;
        this.ascensionSpeedUpgradeLevel = 0;
        this.ascensionCostUpgrade1Level = 0;
        this.ascensionCostUpgrade2Level = 0;

        this.ascensionIntervalUpgradeCost = 1;
        this.ascensionSpeedUpgradeCost = 1;
        this.ascensionCostUpgrade1Cost = 1;
        this.ascensionCostUpgrade2Cost = 1;


        this.waterLevel = 1.0;

        this.globalBaseValueMultiplier = 1;
        this.globalSpawnIntervalMultiplier = 1;
        this.globalRiseSpeedMultiplier = 1;
        this.globalCost1Multiplier = 1;
        this.globalCost2Multiplier = 1;
    }
}

class WindParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 20 + 10;
        this.speed = Math.random() * 0.5 + 0.5;
    }

    update() {
        this.x += this.speed * wind / 3;
        if (this.x > canvas.width) {
            this.x = 0;
            this.y = Math.random() * canvas.height;
        }
        if (this.x < 0) {
            this.x = canvas.width;
            this.y = Math.random() * canvas.height;
        }
    }

    draw() {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length, this.y);
        ctx.stroke();
    }
}

class bubbleParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.radius = Math.random() * 2 + 2;
        this.speed = Math.random() * 0.5 + 0.5;
    }

    update() {
        this.x += this.speed * wind / Math.sqrt(this.radius);
        this.y -= this.speed;
        if (this.x > canvas.width) {
            this.x = 0;
        }
        if (this.x < 0) {
            this.x = canvas.width;
        }
        if (this.y < 0) {
            this.y = canvas.height;
        }
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

const windParticles = Array.from({length: 100}, () => new WindParticle());
const bubbleParticles = Array.from({length: 50}, () => new bubbleParticle());

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
        updateWaterBackground();
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

    // Draw top spikes
    if (gameData.spikeUp) {
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

    // Draw left spikes
    if (gameData.spikeLeft) {
        const spikeCount = Math.ceil(canvas.height / spikeWidth);
        ctx.fillStyle = '#a33';
        for (let i = 0; i < spikeCount; i++) {
            const y = i * spikeWidth;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(spikeHeight, y + spikeWidth / 2);
            ctx.lineTo(0, y + spikeWidth);
            ctx.closePath();
            ctx.fill();
        }
    }

    // Draw right spikes
    if (gameData.spikeRight) {
        const spikeCount = Math.ceil(canvas.height / spikeWidth);
        ctx.fillStyle = '#a33';
        for (let i = 0; i < spikeCount; i++) {
            const y = i * spikeWidth;
            ctx.beginPath();
            ctx.moveTo(canvas.width, y);
            ctx.lineTo(canvas.width - spikeHeight, y + spikeWidth / 2);
            ctx.lineTo(canvas.width, y + spikeWidth);
            ctx.closePath();
            ctx.fill();
        }
    }
}

function drawLightRays() {
    const rayCount = 10; // Number of light rays
    const rayWidth = 10; // Width of each ray
    const rayLength = canvas.height; // Length of each ray
    const angle = Math.PI / 6; // Angle for diagonal rays (30 degrees)

    ctx.save();
    ctx.globalCompositeOperation = 'overlay'; // Use overlay to blend the rays with the background

    for (let i = 0; i < rayCount; i++) {
        const startX = (canvas.width / rayCount) * i;
        const endX = startX + Math.cos(angle) * rayLength;
        const endY = Math.sin(angle) * rayLength;

        const gradient = ctx.createLinearGradient(startX, 0, endX, endY);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(startX, 0);
        ctx.lineTo(endX, endY);
        ctx.lineTo(endX + rayWidth, endY);
        ctx.lineTo(startX + rayWidth, 0);
        ctx.closePath();
        ctx.fill();
    }

    ctx.restore();
}

function gameLoop() {
    document.getElementById('windLabel').textContent = `Wind: ${format(wind)}`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    windParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    bubbleParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    drawLightRays();

    if (gameData.spike) {
        drawSpikes();
    }

    gameData.bubbles.forEach((bubble, index) => {
        if (bubble.update(wind)) {
            gameData.bubbles.splice(index, 1);
            return;
        }
        bubble.draw();

        if (gameData.spikeUp && bubble.y - bubble.radius < 0) {
            gameData.credits += bubble.currentValue * 0.5;
            updateCreditsDisplay();
            bubble.pop();
            return;
        }
        if (gameData.spikeLeft && bubble.x - bubble.radius < 0) {
            gameData.credits += bubble.currentValue * 0.5;
            updateCreditsDisplay();
            bubble.pop();
            return;
        }
        if (gameData.spikeRight && bubble.x + bubble.radius > canvas.width) {
            gameData.credits += bubble.currentValue * 0.5;
            updateCreditsDisplay();
            bubble.pop();
            return;
        }

        if (bubble.y + bubble.radius < 0) {
            gameData.bubbles.splice(index, 1);
        }
    });

    requestAnimationFrame(gameLoop);
}

let side = -1;               // -1 => negative side, +1 => positive side
let phase = 0;               // Phase for the sine wave
let isTransitioning = false; // Are we currently in a quick transition?
let transitionStart = 0;
let transitionEnd = 0;
let transitionProgress = 0;

// Tweak these parameters to control the feel of the oscillation
const amplitude = 1
const phaseSpeed = 0.06;     // Speed at which the sine wave progresses
const transitionSpeed = 0.05
const sideMidNeg = -3
const sideMidPos = 3

function updateWind() {
    if (isTransitioning) {
        // We are in the middle of a quick transition to the other side
        transitionProgress += transitionSpeed;
        if (transitionProgress >= 1) {
            // Finished transition
            transitionProgress = 1;
            isTransitioning = false;
        }
        // Linear interpolation from transitionStart -> transitionEnd
        wind = transitionStart + (transitionEnd - transitionStart) * transitionProgress;
    } else {
        // Normal oscillation around the current side’s midpoint
        phase += phaseSpeed;
        const center = (side === -1) ? sideMidNeg : sideMidPos;
        wind = center + amplitude * Math.sin(phase);

        // Occasionally (random chance) initiate a transition to the other side
        // Adjust probability below to make switching more or less frequent
        if (Math.random() < 0.05) {  // ~1% chance each frame
            isTransitioning = true;
            transitionProgress = 0;
            transitionStart = wind;

            // Flip side
            side = -side;
            transitionEnd = (side === -1) ? sideMidNeg : sideMidPos;
        }
    }

    return wind;
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
updateAscensionUpgrades();
document.querySelector('.tab-button[data-tab="bubble-upgrades"]').click();
setInterval(saveGameState, 10000);
setInterval(updateWind, 500);