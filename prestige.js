// prestige.js

let prestigeLevel = 0;
let prestigeThreshold = 1000;
const prestigeBaseThreshold = 1000;

function prestige() {
  if (energy >= prestigeThreshold) {
    energy = 0;
    spaceships = 0;
    energyBeam = 1;
    spaceshipSpeed = 1000;
    prestigeLevel++;
    prestigeThreshold = Math.floor(prestigeThreshold * 2);
    updateScore();
    showNotification(`Prestiged! You are now at prestige level ${prestigeLevel}.`);
  } else {
    showNotification(`You need ${prestigeThreshold} energy to prestige.`);
  }
}

// Update prestige button text each time score updates
function updatePrestigeButton() {
  if (typeof prestigeBtn !== 'undefined') {
    prestigeBtn.textContent = `Prestige (Requires ${prestigeThreshold} Energy)`;
  }
}

// Modify updateScore to also update prestige button
const originalUpdateScore = updateScore;
updateScore = function() {
  originalUpdateScore();
  updatePrestigeButton();
};
