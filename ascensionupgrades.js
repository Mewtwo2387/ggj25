const ascensionPointsLabel = document.getElementById('ascension-points-label');
const ascensionLabelRow = document.getElementById('ascension-label-row');
const intervalUpgradeRow = document.getElementById('interval-upgrades');
const speedUpgradeRow = document.getElementById('speed-upgrades');
const costUpgradeRow = document.getElementById('cost-upgrades');
const ascensionCostUpgradeRow = document.getElementById('ascension-cost-upgrades');
const ascendLockedRow = document.getElementById('ascend-locked');

const intervalUpgrade = document.getElementById('intervalupgrade');
const speedUpgrade = document.getElementById('speedupgrade');
const costUpgrade = document.getElementById('costupgrade');
const ascensionCostUpgrade = document.getElementById('ascensioncostupgrade');

function updateAscensionUpgradeDetails(button, label, cost, description, level) {
  button.querySelector('.upgrade-details').innerHTML = `Cost: ${format(cost)} Ascension Points<br>${description}`;
  button.querySelector('.upgrade-header').innerHTML = `${label} Upgrade Lv ${level}`;
  button.disabled = false;
}

function updateAscensionUpgrades(){
  if(gameData.blueAscensionLevel >= 1 || gameData.greenAscensionLevel >= 1 || gameData.redAscensionLevel >= 1){
    ascensionLabelRow.classList.remove('hidden');
    intervalUpgradeRow.classList.remove('hidden');
    speedUpgradeRow.classList.remove('hidden');
    costUpgradeRow.classList.remove('hidden');
    ascensionCostUpgradeRow.classList.remove('hidden');
    ascendLockedRow.classList.add('hidden');
  } else {
    ascensionLabelRow.classList.add('hidden');
    intervalUpgradeRow.classList.add('hidden');
    speedUpgradeRow.classList.add('hidden');
    costUpgradeRow.classList.add('hidden');
    ascensionCostUpgradeRow.classList.add('hidden');
    ascendLockedRow.classList.remove('hidden');
  }
  ascensionPointsLabel.textContent = `Ascension Points: ${format(gameData.ascensionPoints)}`;

  updateAscensionUpgradeDetails(intervalUpgrade, 'Interval', gameData.ascensionIntervalUpgradeCost * gameData.globalCost2Multiplier, 'Decreases interval of all bubbles by 20%', gameData.ascensionIntervalUpgradeLevel);
  updateAscensionUpgradeDetails(speedUpgrade, 'Speed', gameData.ascensionSpeedUpgradeCost * gameData.globalCost2Multiplier, 'Decreases speed of all bubbles by 20%', gameData.ascensionSpeedUpgradeLevel);
  updateAscensionUpgradeDetails(costUpgrade, 'Cost', gameData.ascensionCostUpgrade1Cost * gameData.globalCost2Multiplier, 'All regular upgrades are 30% cheaper', gameData.ascensionCostUpgrade1Level);
  updateAscensionUpgradeDetails(ascensionCostUpgrade, 'Ascension Cost', gameData.ascensionCostUpgrade2Cost * gameData.globalCost2Multiplier, 'All ascension upgrades are 30% cheaper', gameData.ascensionCostUpgrade2Level);
}

intervalUpgrade.addEventListener('click', () => {
  if(gameData.ascensionPoints >= gameData.ascensionIntervalUpgradeCost * gameData.globalCost2Multiplier){
    gameData.ascensionPoints -= gameData.ascensionIntervalUpgradeCost * gameData.globalCost2Multiplier;
    gameData.ascensionIntervalUpgradeLevel++;
    gameData.globalSpawnIntervalMultiplier *= 0.8;
    gameData.ascensionIntervalUpgradeCost *= 2;
    updateAscensionUpgrades();
    updateUpgradeButtons();
    clearInterval(gameData.blueSpawnIntervalId);
    gameData.blueSpawnIntervalId = setInterval(spawnBlueBubble, gameData.blueSpawnInterval * gameData.globalSpawnIntervalMultiplier);
    clearInterval(gameData.greenSpawnIntervalId);
    gameData.greenSpawnIntervalId = setInterval(spawnGreenBubble, gameData.greenSpawnInterval * gameData.globalSpawnIntervalMultiplier);
    clearInterval(gameData.redSpawnIntervalId);
    gameData.redSpawnIntervalId = setInterval(spawnRedBubble, gameData.redSpawnInterval * gameData.globalSpawnIntervalMultiplier);
  }
});

speedUpgrade.addEventListener('click', () => {
  if(gameData.ascensionPoints >= gameData.ascensionSpeedUpgradeCost * gameData.globalCost2Multiplier){
    gameData.ascensionPoints -= gameData.ascensionSpeedUpgradeCost * gameData.globalCost2Multiplier;
    gameData.ascensionSpeedUpgradeLevel++;
    gameData.globalRiseSpeedMultiplier *= 0.8;
    gameData.ascensionSpeedUpgradeCost *= 2;
    updateAscensionUpgrades();
    updateUpgradeButtons();
  }
});

costUpgrade.addEventListener('click', () => {
  if(gameData.ascensionPoints >= gameData.ascensionCostUpgrade1Cost * gameData.globalCost2Multiplier){
    gameData.ascensionPoints -= gameData.ascensionCostUpgrade1Cost * gameData.globalCost2Multiplier;
    gameData.ascensionCostUpgrade1Level++;
    gameData.globalCost1Multiplier *= 0.7;
    gameData.ascensionCostUpgrade1Cost *= 2;
    updateAscensionUpgrades();
    updateUpgradeButtons();
  }
});

ascensionCostUpgrade.addEventListener('click', () => {
  if(gameData.ascensionPoints >= gameData.ascensionCostUpgrade2Cost * gameData.globalCost2Multiplier){
    gameData.ascensionPoints -= gameData.ascensionCostUpgrade2Cost * gameData.globalCost2Multiplier;
    gameData.ascensionCostUpgrade2Level++;
    gameData.globalCost2Multiplier *= 0.7;
    gameData.ascensionCostUpgrade2Cost *= 2;
    updateAscensionUpgrades();
    updateUpgradeButtons();
  }
});
