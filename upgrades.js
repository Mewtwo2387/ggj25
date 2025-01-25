const blueUpgrade1Button = document.getElementById('blueUpgrade1');
const blueUpgrade2Button = document.getElementById('blueUpgrade2');
const blueUpgrade3Button = document.getElementById('blueUpgrade3');
const blueRow = document.getElementById('blue-upgrades');
const blueAscendRow = document.getElementById('blue-ascend');
const blueAscendButton = document.getElementById('blueAscend');

const greenUpgrade1Button = document.getElementById('greenUpgrade1');
const greenUpgrade2Button = document.getElementById('greenUpgrade2');
const greenUpgrade3Button = document.getElementById('greenUpgrade3');
const unlockGreenButton = document.getElementById('unlockGreen');
const greenRow = document.getElementById('green-upgrades');
const greenAscendRow = document.getElementById('green-ascend');
const unlockGreenRow = document.getElementById('green-unlock');
const greenAscendButton = document.getElementById('greenAscend');

const redUpgrade1Button = document.getElementById('redUpgrade1');
const redUpgrade2Button = document.getElementById('redUpgrade2');
const redUpgrade3Button = document.getElementById('redUpgrade3');
const unlockRedButton = document.getElementById('unlockRed');
const redRow = document.getElementById('red-upgrades');
const unlockRedRow = document.getElementById('red-unlock');
const redAscendRow = document.getElementById('red-ascend');
const redAscendButton = document.getElementById('redAscend');

const spikeupgradeButton = document.getElementById('spikeupgrade');
const waterupgradeButton = document.getElementById('waterupgrade');
const goldenupgradeButton = document.getElementById('goldenupgrade');

blueUpgrade1Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.blueUpgrade1Cost * gameData.globalCost1Multiplier) {
        gameData.credits -= gameData.blueUpgrade1Cost * gameData.globalCost1Multiplier;
        gameData.blueMaxBaseValue += 5;
        gameData.blueUpgrade1Level++;
        gameData.blueUpgrade1Cost = Math.floor(gameData.blueUpgrade1Cost * 1.5);
        updateCredits();
    }
});

blueUpgrade2Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.blueUpgrade2Cost * gameData.globalCost1Multiplier) {
        gameData.credits -= gameData.blueUpgrade2Cost * gameData.globalCost1Multiplier;
        gameData.blueSpawnInterval = Math.floor(gameData.blueSpawnInterval * 0.9);
        clearInterval(blueSpawnIntervalId);
        blueSpawnIntervalId = setInterval(spawnBlueBubble, gameData.blueSpawnInterval * gameData.globalSpawnIntervalMultiplier);
        gameData.blueUpgrade2Level++;
        gameData.blueUpgrade2Cost = Math.floor(gameData.blueUpgrade2Cost * 1.5);
        updateCredits();
    }
});

blueUpgrade3Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.blueUpgrade3Cost * gameData.globalCost1Multiplier) {
        gameData.credits -= gameData.blueUpgrade3Cost * gameData.globalCost1Multiplier;
        gameData.blueRiseSpeed *= 0.9;
        gameData.blueUpgrade3Level++;
        gameData.blueUpgrade3Cost = Math.floor(gameData.blueUpgrade3Cost * 1.5);
        updateCredits();
    }
});

greenUpgrade1Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.greenUpgrade1Cost * gameData.globalCost1Multiplier) {
        gameData.credits -= gameData.greenUpgrade1Cost * gameData.globalCost1Multiplier;
        gameData.greenMaxBaseValue += 50;
        gameData.greenUpgrade1Level++;
        gameData.greenUpgrade1Cost = Math.floor(gameData.greenUpgrade1Cost * 1.5);
        updateCredits();
    }
});

greenUpgrade2Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.greenUpgrade2Cost * gameData.globalCost1Multiplier) {
        gameData.credits -= gameData.greenUpgrade2Cost * gameData.globalCost1Multiplier;
        gameData.greenSpawnInterval = Math.floor(gameData.greenSpawnInterval * 0.9);
        clearInterval(greenSpawnIntervalId);
        greenSpawnIntervalId = setInterval(spawnGreenBubble, gameData.greenSpawnInterval * gameData.globalSpawnIntervalMultiplier);
        gameData.greenUpgrade2Level++;
        gameData.greenUpgrade2Cost = Math.floor(gameData.greenUpgrade2Cost * 1.5);
        updateCredits();
    }
});

greenUpgrade3Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.greenUpgrade3Cost * gameData.globalCost1Multiplier) {
        gameData.credits -= gameData.greenUpgrade3Cost * gameData.globalCost1Multiplier;
        gameData.greenRiseSpeed *= 0.9;
        gameData.greenUpgrade3Level++;
        gameData.greenUpgrade3Cost = Math.floor(gameData.greenUpgrade3Cost * 1.5);
        updateCredits();
    }
});

unlockGreenButton.addEventListener('click', () => {
    if (gameData.credits >= 1000) {
        gameData.credits -= 1000;
        gameData.green = true;
        updateCredits();
        greenSpawnIntervalId = setInterval(spawnGreenBubble, gameData.greenSpawnInterval * gameData.globalSpawnIntervalMultiplier);
    }
});

redUpgrade1Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.redUpgrade1Cost * gameData.globalCost1Multiplier) {
        gameData.credits -= gameData.redUpgrade1Cost * gameData.globalCost1Multiplier;
        gameData.redMaxBaseValue += 500;
        gameData.redUpgrade1Level++;
        gameData.redUpgrade1Cost = Math.floor(gameData.redUpgrade1Cost * 1.5);
        updateCredits();
    }
});

redUpgrade2Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.redUpgrade2Cost * gameData.globalCost1Multiplier) {
        gameData.credits -= gameData.redUpgrade2Cost * gameData.globalCost1Multiplier;
        gameData.redSpawnInterval = Math.floor(gameData.redSpawnInterval * 0.9);
        clearInterval(redSpawnIntervalId);
        redSpawnIntervalId = setInterval(spawnRedBubble, gameData.redSpawnInterval * gameData.globalSpawnIntervalMultiplier);
        gameData.redUpgrade2Level++;
        gameData.redUpgrade2Cost = Math.floor(gameData.redUpgrade2Cost * 1.5);
        updateCredits();
    }
});

redUpgrade3Button.addEventListener('click', () => {
    if (gameData.credits >= gameData.redUpgrade3Cost * gameData.globalCost1Multiplier) {
        gameData.credits -= gameData.redUpgrade3Cost * gameData.globalCost1Multiplier;
        gameData.redRiseSpeed *= 0.9;
        gameData.redUpgrade3Level++;
        gameData.redUpgrade3Cost = Math.floor(gameData.redUpgrade3Cost * 1.5);
        updateCredits();
    }
});

unlockRedButton.addEventListener('click', () => {
    if (gameData.credits >= 20000) {
        gameData.credits -= 20000;
        gameData.red = true;
        updateCredits();
        redSpawnIntervalId = setInterval(spawnRedBubble, gameData.redSpawnInterval * gameData.globalSpawnIntervalMultiplier);
    }
});

blueAscendButton.addEventListener('click', () => {
    gameData.blueBaseValueMultiplier *= 1000;
    gameData.blueAscensionLevel++;
    gameData.ascensionPoints++;
    gameData.blueMaxBaseValue = 10;
    gameData.blueUpgrade1Level = 1;
    gameData.blueUpgrade1Cost = 50 * Math.pow(10000, gameData.blueAscensionLevel);
    gameData.blueSpawnInterval = 3000;
    gameData.blueUpgrade2Level = 1;
    gameData.blueUpgrade2Cost = 100 * Math.pow(10000, gameData.blueAscensionLevel);
    gameData.blueRiseSpeed = 1;
    gameData.blueUpgrade3Level = 1;
    gameData.blueUpgrade3Cost = 150 * Math.pow(10000, gameData.blueAscensionLevel);
    updateUpgradeButtons();
    updateAscensionUpgrades();
    clearInterval(blueSpawnIntervalId);
    blueSpawnIntervalId = setInterval(spawnBlueBubble, gameData.blueSpawnInterval * gameData.globalSpawnIntervalMultiplier);
});

greenAscendButton.addEventListener('click', () => {
    gameData.greenBaseValueMultiplier *= 1000;
    gameData.greenAscensionLevel++;
    gameData.ascensionPoints++;
    gameData.greenMaxBaseValue = 100;
    gameData.greenUpgrade1Level = 1;
    gameData.greenUpgrade1Cost = 1000 * Math.pow(10000, gameData.greenAscensionLevel);
    gameData.greenSpawnInterval = 10000;
    gameData.greenUpgrade2Level = 1;
    gameData.greenUpgrade2Cost = 2000 * Math.pow(10000, gameData.greenAscensionLevel);
    gameData.greenRiseSpeed = 1;
    gameData.greenUpgrade3Level = 1;
    gameData.greenUpgrade3Cost = 3000 * Math.pow(10000, gameData.greenAscensionLevel);
    updateUpgradeButtons();
    updateAscensionUpgrades();
    clearInterval(greenSpawnIntervalId);
    greenSpawnIntervalId = setInterval(spawnGreenBubble, gameData.greenSpawnInterval * gameData.globalSpawnIntervalMultiplier);
});

redAscendButton.addEventListener('click', () => {
    gameData.redBaseValueMultiplier *= 1000;
    gameData.redAscensionLevel++;
    gameData.ascensionPoints++;
    gameData.redMaxBaseValue = 1000;
    gameData.redUpgrade1Level = 1;
    gameData.redUpgrade1Cost = 20000 * Math.pow(10000, gameData.redAscensionLevel);
    gameData.redSpawnInterval = 30000;
    gameData.redUpgrade2Level = 1;
    gameData.redUpgrade2Cost = 40000 * Math.pow(10000, gameData.redAscensionLevel);
    gameData.redRiseSpeed = 1;
    gameData.redUpgrade3Level = 1;
    gameData.redUpgrade3Cost = 60000 * Math.pow(10000, gameData.redAscensionLevel);
    updateUpgradeButtons();
    updateAscensionUpgrades();
    clearInterval(redSpawnIntervalId);
    redSpawnIntervalId = setInterval(spawnRedBubble, gameData.redSpawnInterval * gameData.globalSpawnIntervalMultiplier);
});

spikeupgradeButton.addEventListener('click', () => {
    if (!gameData.spikeUp) {
        // First upgrade: Top spikes
        if (gameData.credits >= 10000) {
            gameData.credits -= 10000;
            gameData.spikeUp = true;
            updateCredits();
        }
    } else if (!gameData.spikeLeft) {
        // Second upgrade: Left spikes
        if (gameData.credits >= 50000) {
            gameData.credits -= 50000;
            gameData.spikeLeft = true;
            updateCredits();
        }
    } else if (!gameData.spikeRight) {
        // Third upgrade: Right spikes
        if (gameData.credits >= 100000) {
            gameData.credits -= 100000;
            gameData.spikeRight = true;
            updateCredits();
        }
    }
});

waterupgradeButton.addEventListener('click', () => {
    if (gameData.credits >= 100000 && !gameData.water) {
        gameData.credits -= 100000;
        gameData.water = true;
        updateCredits();
    }
});

goldenupgradeButton.addEventListener('click', () => {
    if (gameData.credits >= 1000000 && !gameData.golden) {
        gameData.credits -= 1000000;
        gameData.golden = true;
        updateCredits();
    }
});

function updateUpgradeDetails(button, level, cost, value, nextValue, label, ascensionLevel) {
    if (level < 20) {
        button.querySelector('.upgrade-details').innerHTML = `Cost: $${format(cost)}<br>${label}: ${format(value)}<br>Next: ${format(nextValue)}`;
        if (label == 'Value' && ascensionLevel > 0) {
            button.querySelector('.upgrade-header').innerHTML = `${label}(+${ascensionLevel}) Lv ${level}`;
        } else {
            button.querySelector('.upgrade-header').innerHTML = `${label} Lv ${level}`;
        }
        button.disabled = gameData.credits < cost;
    } else {
        button.querySelector('.upgrade-details').innerHTML = `${label}: ${format(value)}`;
        button.querySelector('.upgrade-header').innerHTML = `${label} MAX`;
        button.disabled = true;
    }
}

function updateUpgradeButtons() {
    updateUpgradeDetails(
        blueUpgrade1Button,
        gameData.blueUpgrade1Level,
        gameData.blueUpgrade1Cost * gameData.globalCost1Multiplier,
        gameData.blueMaxBaseValue * gameData.blueBaseValueMultiplier * gameData.globalBaseValueMultiplier,
        (gameData.blueMaxBaseValue + 5) * gameData.blueBaseValueMultiplier * gameData.globalBaseValueMultiplier,
        'Value',
        gameData.blueAscensionLevel);
    updateUpgradeDetails(blueUpgrade2Button,
        gameData.blueUpgrade2Level,
        gameData.blueUpgrade2Cost * gameData.globalCost1Multiplier,
        gameData.blueSpawnInterval * gameData.globalSpawnIntervalMultiplier,
        gameData.blueSpawnInterval * 0.9 * gameData.globalSpawnIntervalMultiplier,
        'Interval',
        gameData.blueAscensionLevel);
    updateUpgradeDetails(blueUpgrade3Button,
        gameData.blueUpgrade3Level,
        gameData.blueUpgrade3Cost * gameData.globalCost1Multiplier,
        gameData.blueRiseSpeed * gameData.globalRiseSpeedMultiplier,
        gameData.blueRiseSpeed * 0.9 * gameData.globalRiseSpeedMultiplier,
        'Speed',
        gameData.blueAscensionLevel);

    updateUpgradeDetails(greenUpgrade1Button,
        gameData.greenUpgrade1Level,
        gameData.greenUpgrade1Cost * gameData.globalCost1Multiplier,
        gameData.greenMaxBaseValue * gameData.greenBaseValueMultiplier * gameData.globalBaseValueMultiplier,
        (gameData.greenMaxBaseValue + 50) * gameData.greenBaseValueMultiplier * gameData.globalBaseValueMultiplier,
        'Value',
        gameData.greenAscensionLevel);

    updateUpgradeDetails(greenUpgrade2Button,
        gameData.greenUpgrade2Level,
        gameData.greenUpgrade2Cost * gameData.globalCost1Multiplier,
        gameData.greenSpawnInterval * gameData.globalSpawnIntervalMultiplier,
        gameData.greenSpawnInterval * 0.9 * gameData.globalSpawnIntervalMultiplier,
        'Interval',
        gameData.greenAscensionLevel);

    updateUpgradeDetails(greenUpgrade3Button,
        gameData.greenUpgrade3Level,
        gameData.greenUpgrade3Cost * gameData.globalCost1Multiplier,
        gameData.greenRiseSpeed * gameData.globalRiseSpeedMultiplier,
        gameData.greenRiseSpeed * 0.9 * gameData.globalRiseSpeedMultiplier,
        'Speed',
        gameData.greenAscensionLevel);

    updateUpgradeDetails(redUpgrade1Button,
        gameData.redUpgrade1Level,
        gameData.redUpgrade1Cost * gameData.globalCost1Multiplier,
        gameData.redMaxBaseValue * gameData.redBaseValueMultiplier * gameData.globalBaseValueMultiplier,
        (gameData.redMaxBaseValue + 500) * gameData.redBaseValueMultiplier * gameData.globalBaseValueMultiplier,
        'Value',
        gameData.redAscensionLevel);

    updateUpgradeDetails(redUpgrade2Button,
        gameData.redUpgrade2Level,
        gameData.redUpgrade2Cost * gameData.globalCost1Multiplier,
        gameData.redSpawnInterval * gameData.globalSpawnIntervalMultiplier,
        gameData.redSpawnInterval * 0.9 * gameData.globalSpawnIntervalMultiplier,
        'Interval',
        gameData.redAscensionLevel);

    updateUpgradeDetails(redUpgrade3Button,
        gameData.redUpgrade3Level,
        gameData.redUpgrade3Cost * gameData.globalCost1Multiplier,
        gameData.redRiseSpeed * gameData.globalRiseSpeedMultiplier,
        gameData.redRiseSpeed * 0.9 * gameData.globalRiseSpeedMultiplier,
        'Speed',
        gameData.redAscensionLevel);

    if (gameData.green) {
        greenRow.classList.remove('hidden');
        unlockGreenRow.classList.add('hidden');
    } else {
        greenRow.classList.add('hidden');
        unlockGreenRow.classList.remove('hidden');
        unlockGreenButton.disabled = gameData.credits < 1000;
    }
    if (gameData.red) {
        redRow.classList.remove('hidden');
        unlockRedRow.classList.add('hidden');
    } else {
        redRow.classList.add('hidden');
        unlockRedRow.classList.remove('hidden');
        unlockRedButton.disabled = gameData.credits < 20000;
    }
    if (gameData.spikeUp && gameData.spikeLeft && gameData.spikeRight) {
        spikeupgradeButton.disabled = true;
        spikeupgradeButton.querySelector('.upgrade-details').innerHTML =
            'Spikes MAX | Spikes will automatically break the bubble and get 50% credits';
        spikeupgradeButton.querySelector('.upgrade-header').innerHTML = 'Spikes MAX';
    } else if (gameData.spikeUp && gameData.spikeLeft) {
        spikeupgradeButton.querySelector('.upgrade-details').innerHTML = 'Cost: $100,000<br>' +
            'Unlock Right Spikes | Spikes will automatically break the bubble and get 50% credits';
        spikeupgradeButton.querySelector('.upgrade-header').innerHTML = 'Spikes Lv 2';
    } else if (gameData.spikeUp) {
        spikeupgradeButton.querySelector('.upgrade-details').innerHTML = 'Cost: $50,000<br>' +
            'Unlock Left Spikes | Spikes will automatically break the bubble and get 50% credits';
        spikeupgradeButton.querySelector('.upgrade-header').innerHTML = 'Spikes Lv 1';
    } else {
        spikeupgradeButton.querySelector('.upgrade-details').innerHTML = 'Cost: $10,000<br>' +
            'Unlock Top Spikes | Spikes will automatically break the bubble and get 50% credits';
        spikeupgradeButton.querySelector('.upgrade-header').innerHTML = 'Spikes Lv 0 ';
    }
    if (gameData.water) {
        document.body.classList.add('water');
        waterupgradeButton.disabled = true;
    } else {
        document.body.classList.remove('water');
        waterupgradeButton.disabled = false;
    }
    if (gameData.golden) {
        goldenupgradeButton.disabled = true;
    } else {
        goldenupgradeButton.disabled = false;
    }
    if (gameData.blueUpgrade1Level >= 20 && gameData.blueUpgrade2Level >= 20 && gameData.blueUpgrade3Level >= 20) {
        blueAscendRow.classList.remove('hidden');
        blueAscendButton.disabled = false;
    } else if (gameData.blueUpgrade1Level >= 20 || gameData.blueUpgrade2Level >= 20 || gameData.blueUpgrade3Level >= 20) {
        blueAscendRow.classList.remove('hidden');
        blueAscendButton.disabled = true;
    } else {
        blueAscendRow.classList.add('hidden');
        blueAscendButton.disabled = true;
    }
    if (gameData.greenUpgrade1Level >= 20 && gameData.greenUpgrade2Level >= 20 && gameData.greenUpgrade3Level >= 20) {
        greenAscendRow.classList.remove('hidden');
        greenAscendButton.disabled = false;
    } else if (gameData.greenUpgrade1Level >= 20 || gameData.greenUpgrade2Level >= 20 || gameData.greenUpgrade3Level >= 20) {
        greenAscendRow.classList.remove('hidden');
        greenAscendButton.disabled = true;
    } else {
        greenAscendRow.classList.add('hidden');
        greenAscendButton.disabled = true;
    }
    if (gameData.redUpgrade1Level >= 20 && gameData.redUpgrade2Level >= 20 && gameData.redUpgrade3Level >= 20) {
        redAscendRow.classList.remove('hidden');
        redAscendButton.disabled = false;
    } else if (gameData.redUpgrade1Level >= 20 || gameData.redUpgrade2Level >= 20 || gameData.redUpgrade3Level >= 20) {
        redAscendRow.classList.remove('hidden');
        redAscendButton.disabled = true;
    } else {
        redAscendRow.classList.add('hidden');
        redAscendButton.disabled = true;
    }
}