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

function updateUpgradeButtons() {
  blueUpgrade1Button.querySelector('.upgrade-details').innerHTML = `Cost: $${formatNumber(gameData.blueUpgrade1Cost)}<br>Value: $${formatNumber(gameData.blueMaxBaseValue)}<br>Next: $${formatNumber(gameData.blueMaxBaseValue + 5)}`;
  blueUpgrade2Button.querySelector('.upgrade-details').innerHTML = `Cost: $${formatNumber(gameData.blueUpgrade2Cost)}<br>Interval: ${formatNumber(gameData.blueSpawnInterval)}ms<br>Next: ${formatNumber(gameData.blueSpawnInterval * 0.9)}ms`;
  blueUpgrade3Button.querySelector('.upgrade-details').innerHTML = `Cost: $${formatNumber(gameData.blueUpgrade3Cost)}<br>Speed: ${formatNumber(gameData.blueRiseSpeed)}<br>Next: ${formatNumber(gameData.blueRiseSpeed * 0.9)}`;
  greenUpgrade1Button.querySelector('.upgrade-details').innerHTML = `Cost: $${formatNumber(gameData.greenUpgrade1Cost)}<br>Value: $${formatNumber(gameData.greenMaxBaseValue)}<br>Next: $${formatNumber(gameData.greenMaxBaseValue + 50)}`;
  greenUpgrade2Button.querySelector('.upgrade-details').innerHTML = `Cost: $${formatNumber(gameData.greenUpgrade2Cost)}<br>Interval: ${formatNumber(gameData.greenSpawnInterval)}ms<br>Next: ${formatNumber(gameData.greenSpawnInterval * 0.9)}ms`;
  greenUpgrade3Button.querySelector('.upgrade-details').innerHTML = `Cost: $${formatNumber(gameData.greenUpgrade3Cost)}<br>Speed: ${formatNumber(gameData.greenRiseSpeed)}<br>Next: ${formatNumber(gameData.greenRiseSpeed * 0.9)}`;
  redUpgrade1Button.querySelector('.upgrade-details').innerHTML = `Cost: $${formatNumber(gameData.redUpgrade1Cost)}<br>Value: $${formatNumber(gameData.redMaxBaseValue)}<br>Next: $${formatNumber(gameData.redMaxBaseValue + 500)}`;
  redUpgrade2Button.querySelector('.upgrade-details').innerHTML = `Cost: $${formatNumber(gameData.redUpgrade2Cost)}<br>Interval: ${formatNumber(gameData.redSpawnInterval)}ms<br>Next: ${formatNumber(gameData.redSpawnInterval * 0.9)}ms`;
  redUpgrade3Button.querySelector('.upgrade-details').innerHTML = `Cost: $${formatNumber(gameData.redUpgrade3Cost)}<br>Speed: ${formatNumber(gameData.redRiseSpeed)}<br>Next: ${formatNumber(gameData.redRiseSpeed * 0.9)}`;
  blueUpgrade1Button.querySelector('.upgrade-header').innerHTML = `Value Lv ${gameData.blueUpgrade1Level}`;
  blueUpgrade2Button.querySelector('.upgrade-header').innerHTML = `Interval Lv ${gameData.blueUpgrade2Level}`;
  blueUpgrade3Button.querySelector('.upgrade-header').innerHTML = `Speed Lv ${gameData.blueUpgrade3Level}`;
  greenUpgrade1Button.querySelector('.upgrade-header').innerHTML = `Value Lv ${gameData.greenUpgrade1Level}`;
  greenUpgrade2Button.querySelector('.upgrade-header').innerHTML = `Interval Lv ${gameData.greenUpgrade2Level}`;
  greenUpgrade3Button.querySelector('.upgrade-header').innerHTML = `Speed Lv ${gameData.greenUpgrade3Level}`;
  redUpgrade1Button.querySelector('.upgrade-header').innerHTML = `Value Lv ${gameData.redUpgrade1Level}`;
  redUpgrade2Button.querySelector('.upgrade-header').innerHTML = `Interval Lv ${gameData.redUpgrade2Level}`;
  redUpgrade3Button.querySelector('.upgrade-header').innerHTML = `Speed Lv ${gameData.redUpgrade3Level}`;
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