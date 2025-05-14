let energy = 0;
let spaceships = 0;
let energyBeam = 1;
let spaceshipCost = 50;
let energyBeamCost = 20;
let solarPanelCost = 200;
let spaceshipSpeed = 1000;  // Time in ms for spaceship interval
let prestigeLevel = 0;  // Tracks how many times the player has prestiged
let prestigeThreshold = 1000;  // Energy required to prestige
const prestigeBaseThreshold = 1000;  // Starting prestige threshold
const scoreDisplay = document.getElementById("score");
const clicker = document.getElementById("clicker");
const autoClickerBtn = document.getElementById("autoClickerBtn");
const multiplierBtn = document.getElementById("multiplierBtn");
const autoClickerSpeedBtn = document.getElementById("autoClickerSpeedBtn");
const prestigeBtn = document.getElementById("prestigeBtn");
const autoClickerCursors = document.getElementById("autoClickerCursors");
const notificationBox = document.getElementById("notificationBox");

// Command bar elements
const commandBar = document.getElementById("commandBar");
const commandInput = document.getElementById("commandInput");

// Question mark button
const questionMarkButton = document.getElementById("questionMarkButton");

let isAdmin = false;  // Admin flag to enable secret commands

clicker.addEventListener("click", () => {
  energy += energyBeam;
  animateScore();
  updateScore();
});

function updateScore() {
  scoreDisplay.textContent = `Energy: ${energy}`;
  autoClickerBtn.textContent = `Buy Spaceship (Cost: ${spaceshipCost}, Level: ${spaceships})`;
  multiplierBtn.textContent = `Buy Energy Beam (Cost: ${energyBeamCost}, Level: ${energyBeam - 1})`;
  autoClickerSpeedBtn.textContent = `Buy Solar Panel Speed (Cost: ${solarPanelCost})`;
  prestigeBtn.textContent = `Prestige (Requires ${prestigeThreshold} Energy)`;
}

function animateScore() {
  scoreDisplay.style.transform = "scale(1.2)";
  setTimeout(() => {
    scoreDisplay.style.transform = "scale(1)";
  }, 200);
}

function buyAutoClicker() {
  if (energy >= spaceshipCost) {
    energy -= spaceshipCost;
    spaceships++;
    spaceshipCost = Math.floor(spaceshipCost * 1.5);
    updateScore();
    autoClickerCursors.appendChild(createCursor());
  }
}

function buyMultiplier() {
  if (energy >= energyBeamCost) {
    energy -= energyBeamCost;
    energyBeam++;
    energyBeamCost = Math.floor(energyBeamCost * 1.5);
    updateScore();
  }
}

function buyAutoClickerSpeed() {
  if (energy >= solarPanelCost) {
    energy -= solarPanelCost;
    spaceshipSpeed = Math.max(spaceshipSpeed - 200, 100);  // Speed up spaceship every purchase
    solarPanelCost = Math.floor(solarPanelCost * 1.5);
    updateScore();
  }
}

// Spawning spaceship cursors
function createCursor() {
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  return cursor;
}

// Prestige function
function prestige() {
  if (energy >= prestigeThreshold) {
    energy = 0;
    prestigeLevel++;
    prestigeThreshold = Math.floor(prestigeThreshold * 1.5);
    updateScore();
    showNotification("Prestige successful! Energy reset.");
  } else {
    showNotification("Not enough energy to prestige.");
  }
}

// Notification function
function showNotification(message) {
  notificationBox.textContent = message;
  notificationBox.style.display = "block";
  setTimeout(() => {
    notificationBox.style.display = "none";
  }, 3000);
}

// Command Bar
function toggleCommandBar() {
  commandBar.style.display = commandBar.style.display === "none" ? "flex" : "none";
}

function closeCommandBar() {
  commandBar.style.display = "none";
}

function submitCommand() {
  const command = commandInput.value.trim().toLowerCase();

  if (command === "godmode") {
    isAdmin = true;
    showNotification("Admin Mode Activated!");
  } else if (command === "reset") {
    energy = 0;
    prestigeLevel = 0;
    prestigeThreshold = prestigeBaseThreshold;
    updateScore();
    showNotification("Game reset successfully.");
  } else {
    showNotification("Unknown command.");
  }

  commandInput.value = "";
}

// Command List and Question Mark Feature
questionMarkButton.addEventListener("click", () => {
  showCommandList();
});

function showCommandList() {
  const commandList = [
    "godmode - Activates admin mode",
    "reset - Resets the game"
  ];

  const commandNotificationBox = document.getElementById("commandNotificationBox");
  commandNotificationBox.innerHTML = "<strong>Available Commands:</strong><br>" + commandList.join("<br>");
  commandNotificationBox.style.display = "block";

  setTimeout(() => {
    commandNotificationBox.style.display = "none";
  }, 5000);
}
