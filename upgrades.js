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