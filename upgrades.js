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

redUpgrade1Button.addEventListener('click', () => {
  if (gameData.credits >= gameData.redUpgrade1Cost) {
      gameData.credits -= gameData.redUpgrade1Cost;
      gameData.redMaxBaseValue += 500;
      gameData.redUpgrade1Level++;
      gameData.redUpgrade1Cost = Math.floor(gameData.redUpgrade1Cost * 1.5);
      updateCreditsDisplay();
      updateUpgradeButtons();
  }
});

redUpgrade2Button.addEventListener('click', () => {
  if (gameData.credits >= gameData.redUpgrade2Cost) {
      gameData.credits -= gameData.redUpgrade2Cost;
      gameData.redSpawnInterval = Math.floor(gameData.redSpawnInterval * 0.9);
      clearInterval(redSpawnIntervalId);
      redSpawnIntervalId = setInterval(spawnRedBubble, gameData.redSpawnInterval);
      gameData.redUpgrade2Level++;
      gameData.redUpgrade2Cost = Math.floor(gameData.redUpgrade2Cost * 1.5);
      updateCreditsDisplay();
      updateUpgradeButtons();
  }
});

redUpgrade3Button.addEventListener('click', () => {
  if (gameData.credits >= gameData.redUpgrade3Cost) {
      gameData.credits -= gameData.redUpgrade3Cost;
      gameData.redRiseSpeed *= 0.9;
      gameData.redUpgrade3Level++;
      gameData.redUpgrade3Cost = Math.floor(gameData.redUpgrade3Cost * 1.5);
      updateCreditsDisplay();
      updateUpgradeButtons();
  }
});

unlockRedButton.addEventListener('click', () => {
  if (gameData.credits >= 20000) {
      gameData.credits -= 20000;
      gameData.red = true;
      updateCreditsDisplay();
      updateUpgradeButtons();
      redSpawnIntervalId = setInterval(spawnRedBubble, gameData.redSpawnInterval);
  }
});

blueAscendButton.addEventListener('click', () => {
  gameData.blueBaseValueMultiplier *= 1000;
  gameData.blueAscensionLevel++;
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
  clearInterval(blueSpawnIntervalId);
  blueSpawnIntervalId = setInterval(spawnBlueBubble, gameData.blueSpawnInterval);
});

greenAscendButton.addEventListener('click', () => {
  gameData.greenBaseValueMultiplier *= 1000;
  gameData.greenAscensionLevel++;
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
  clearInterval(greenSpawnIntervalId);
  greenSpawnIntervalId = setInterval(spawnGreenBubble, gameData.greenSpawnInterval);
});

redAscendButton.addEventListener('click', () => {
  gameData.redBaseValueMultiplier *= 1000;
  gameData.redAscensionLevel++;
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
  clearInterval(redSpawnIntervalId);
  redSpawnIntervalId = setInterval(spawnRedBubble, gameData.redSpawnInterval);
});

spikeupgrade.addEventListener('click', () => {
  if (gameData.credits >= 10000 && !gameData.spike) {
      gameData.credits -= 10000;
      gameData.spike = true;
      updateCreditsDisplay();
      updateUpgradeButtons();
  }
});

waterupgradeButton.addEventListener('click', () => {
  if (gameData.credits >= 100000 && !gameData.water) {
      gameData.credits -= 100000;
      gameData.water = true;
      updateCreditsDisplay();
      updateUpgradeButtons();
  }
});

function updateUpgradeDetails(button, level, cost, value, nextValue, label, ascensionLevel) {
  if (level < 20) {
    button.querySelector('.upgrade-details').innerHTML = `Cost: $${formatNumber(cost)}<br>${label}: ${formatNumber(value)}<br>Next: ${formatNumber(nextValue)}`;
    if (label == 'Value' && ascensionLevel > 0) {
      button.querySelector('.upgrade-header').innerHTML = `${label}(+${ascensionLevel}) Lv ${level}`;
    } else {
      button.querySelector('.upgrade-header').innerHTML = `${label} Lv ${level}`;
    }
    button.disabled = false;
  } else {
    button.querySelector('.upgrade-details').innerHTML = `${label}: ${formatNumber(value)}`;
    button.querySelector('.upgrade-header').innerHTML = `${label} MAX`;
    button.disabled = true;
  }
}

function updateUpgradeButtons() {
  updateUpgradeDetails(blueUpgrade1Button, gameData.blueUpgrade1Level, gameData.blueUpgrade1Cost, gameData.blueMaxBaseValue * gameData.blueBaseValueMultiplier, (gameData.blueMaxBaseValue + 5) * gameData.blueBaseValueMultiplier, 'Value', gameData.blueAscensionLevel);
  updateUpgradeDetails(blueUpgrade2Button, gameData.blueUpgrade2Level, gameData.blueUpgrade2Cost, gameData.blueSpawnInterval, gameData.blueSpawnInterval * 0.9, 'Interval', gameData.blueAscensionLevel);
  updateUpgradeDetails(blueUpgrade3Button, gameData.blueUpgrade3Level, gameData.blueUpgrade3Cost, gameData.blueRiseSpeed, gameData.blueRiseSpeed * 0.9, 'Speed', gameData.blueAscensionLevel);
  updateUpgradeDetails(greenUpgrade1Button, gameData.greenUpgrade1Level, gameData.greenUpgrade1Cost, gameData.greenMaxBaseValue * gameData.greenBaseValueMultiplier, (gameData.greenMaxBaseValue + 50) * gameData.greenBaseValueMultiplier, 'Value', gameData.greenAscensionLevel);
  updateUpgradeDetails(greenUpgrade2Button, gameData.greenUpgrade2Level, gameData.greenUpgrade2Cost, gameData.greenSpawnInterval, gameData.greenSpawnInterval * 0.9, 'Interval', gameData.greenAscensionLevel);
  updateUpgradeDetails(greenUpgrade3Button, gameData.greenUpgrade3Level, gameData.greenUpgrade3Cost, gameData.greenRiseSpeed, gameData.greenRiseSpeed * 0.9, 'Speed', gameData.greenAscensionLevel);
  updateUpgradeDetails(redUpgrade1Button, gameData.redUpgrade1Level, gameData.redUpgrade1Cost, gameData.redMaxBaseValue * gameData.redBaseValueMultiplier, (gameData.redMaxBaseValue + 500) * gameData.redBaseValueMultiplier, 'Value');
  updateUpgradeDetails(redUpgrade2Button, gameData.redUpgrade2Level, gameData.redUpgrade2Cost, gameData.redSpawnInterval, gameData.redSpawnInterval * 0.9, 'Interval', gameData.redAscensionLevel);
  updateUpgradeDetails(redUpgrade3Button, gameData.redUpgrade3Level, gameData.redUpgrade3Cost, gameData.redRiseSpeed, gameData.redRiseSpeed * 0.9, 'Speed', gameData.redAscensionLevel);
  if (gameData.green) {
      greenRow.classList.remove('hidden');
      unlockGreenRow.classList.add('hidden');
  } else {
      greenRow.classList.add('hidden');
      unlockGreenRow.classList.remove('hidden');
  }
  if (gameData.red) {
      redRow.classList.remove('hidden');
      unlockRedRow.classList.add('hidden');
  } else {
      redRow.classList.add('hidden');
      unlockRedRow.classList.remove('hidden');
  }
  if (gameData.spike) {
      spikeupgradeButton.disabled = true;
  } else {
      spikeupgradeButton.disabled = false;
  }
  if (gameData.water) {
      document.body.classList.add('water');
      waterupgradeButton.disabled = true;
  } else {
      document.body.classList.remove('water');
      waterupgradeButton.disabled = false;
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