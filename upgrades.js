const blueUpgrade1Button = document.getElementById('blueUpgrade1');
const blueUpgrade2Button = document.getElementById('blueUpgrade2');
const blueUpgrade3Button = document.getElementById('blueUpgrade3');
const greenUpgrade1Button = document.getElementById('greenUpgrade1');
const greenUpgrade2Button = document.getElementById('greenUpgrade2');
const greenUpgrade3Button = document.getElementById('greenUpgrade3');
const unlockGreenButton = document.getElementById('unlockGreen');
const greenRow = document.getElementById('green-upgrades');
const unlockGreenRow = document.getElementById('green-unlock');
const redUpgrade1Button = document.getElementById('redUpgrade1');
const redUpgrade2Button = document.getElementById('redUpgrade2');
const redUpgrade3Button = document.getElementById('redUpgrade3');
const unlockRedButton = document.getElementById('unlockRed');
const redRow = document.getElementById('red-upgrades');
const unlockRedRow = document.getElementById('red-unlock');
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

function updateUpgradeDetails(button, level, cost, value, nextValue, label) {
  if (level < 20) {
    button.querySelector('.upgrade-details').innerHTML = `Cost: $${formatNumber(cost)}<br>${label}: ${formatNumber(value)}<br>Next: $${formatNumber(nextValue)}`;
    button.querySelector('.upgrade-header').innerHTML = `${label} Lv ${level}`;
    button.disabled = false;
  } else {
    button.querySelector('.upgrade-details').innerHTML = `${label}: ${formatNumber(value)}<br>Reach Lv 20 on all 3 upgrades to ascend!`;
    button.querySelector('.upgrade-header').innerHTML = `${label} MAX`;
    button.disabled = true;
  }
}

function updateUpgradeButtons() {
  updateUpgradeDetails(blueUpgrade1Button, gameData.blueUpgrade1Level, gameData.blueUpgrade1Cost, gameData.blueMaxBaseValue, gameData.blueMaxBaseValue + 5, 'Value');
  updateUpgradeDetails(blueUpgrade2Button, gameData.blueUpgrade2Level, gameData.blueUpgrade2Cost, gameData.blueSpawnInterval, gameData.blueSpawnInterval * 0.9, 'Interval');
  updateUpgradeDetails(blueUpgrade3Button, gameData.blueUpgrade3Level, gameData.blueUpgrade3Cost, gameData.blueRiseSpeed, gameData.blueRiseSpeed * 0.9, 'Speed');
  updateUpgradeDetails(greenUpgrade1Button, gameData.greenUpgrade1Level, gameData.greenUpgrade1Cost, gameData.greenMaxBaseValue, gameData.greenMaxBaseValue + 50, 'Value');
  updateUpgradeDetails(greenUpgrade2Button, gameData.greenUpgrade2Level, gameData.greenUpgrade2Cost, gameData.greenSpawnInterval, gameData.greenSpawnInterval * 0.9, 'Interval');
  updateUpgradeDetails(greenUpgrade3Button, gameData.greenUpgrade3Level, gameData.greenUpgrade3Cost, gameData.greenRiseSpeed, gameData.greenRiseSpeed * 0.9, 'Speed');
  updateUpgradeDetails(redUpgrade1Button, gameData.redUpgrade1Level, gameData.redUpgrade1Cost, gameData.redMaxBaseValue, gameData.redMaxBaseValue + 500, 'Value');
  updateUpgradeDetails(redUpgrade2Button, gameData.redUpgrade2Level, gameData.redUpgrade2Cost, gameData.redSpawnInterval, gameData.redSpawnInterval * 0.9, 'Interval');
  updateUpgradeDetails(redUpgrade3Button, gameData.redUpgrade3Level, gameData.redUpgrade3Cost, gameData.redRiseSpeed, gameData.redRiseSpeed * 0.9, 'Speed');
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
}