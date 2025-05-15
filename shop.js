// shop.js

function buyAutoClicker() {
  if (energy >= spaceshipCost) {
    energy -= spaceshipCost;
    spaceships++;
    spaceshipCost = Math.floor(spaceshipCost * 1.5);
    updateScore();
    showNotification("You bought a spaceship!");
  } else {
    showNotification("Not enough energy!");
  }
}

function buyMultiplier() {
  if (energy >= energyBeamCost) {
    energy -= energyBeamCost;
    energyBeam++;
    energyBeamCost = Math.floor(energyBeamCost * 2);
    updateScore();
    showNotification("You bought an energy beam!");
  } else {
    showNotification("Not enough energy!");
  }
}

function buyAutoClickerSpeed() {
  if (energy >= solarPanelCost) {
    energy -= solarPanelCost;
    spaceshipSpeed = Math.max(50, spaceshipSpeed - 100);
    solarPanelCost = Math.floor(solarPanelCost * 1.5);
    updateScore();
    showNotification("Solar panel speed upgraded!");
  } else {
    showNotification("Not enough energy!");
  }
}
