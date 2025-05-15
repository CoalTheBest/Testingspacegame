// admin.js

// Admin variables
let isAdmin = false;

// Toggle Command Bar visibility
function toggleCommandBar() {
  const commandBar = document.getElementById("commandBar");
  if (commandBar.style.display === "none" || commandBar.style.display === "") {
    commandBar.style.display = "flex";
  } else {
    commandBar.style.display = "none";
  }
}

// Close Command Bar
function closeCommandBar() {
  document.getElementById("commandBar").style.display = "none";
}

// Show Notifications
function showNotification(message, isCommandList = false) {
  const notificationBox = document.getElementById("notificationBox");
  const commandNotificationBox = document.getElementById("commandNotificationBox");

  if (isCommandList) {
    notificationBox.style.display = "none";
    commandNotificationBox.textContent += message + "\n";
    commandNotificationBox.style.display = "block";
    setTimeout(() => {
      commandNotificationBox.style.display = "none";
    }, 5000);
  } else {
    notificationBox.textContent = message;
    notificationBox.style.display = "block";
    setTimeout(() => {
      notificationBox.style.display = "none";
    }, 3000);
  }
}

// Submit Command for secret commands
function submitCommand() {
  const commandInput = document.getElementById("commandInput");
  const command = commandInput.value.trim().toLowerCase();
  const args = command.split(' ');

  if (command === "unlockadmin") {
    isAdmin = true;
    showNotification("You have unlocked admin commands! Here is the list of commands:", true);
    showNotification("1. givepoints [amount] - Gives energy", true);
    showNotification("2. reset - Resets the game", true);
    showNotification("3. adminop - Max levels for everything", true);
    showNotification("4. boostclick [amount] - Boost your click power", true);
    showNotification("5. maxspeed - Sets max spaceship speed", true);
    showNotification("6. richmode - Gives a ton of energy and upgrades", true);
    showNotification("7. unlockall - Unlocks all upgrades", true);
    showNotification("8. prestigemax - Prestiges multiple times", true);
    showNotification("9. storm - Gives 1000 energy per second", true);
    showNotification("10. mysterybox - Opens a mystery box", true);
  } else if (command.startsWith("givepoints") && isAdmin && args.length === 2) {
    const points = parseInt(args[1]);
    if (!isNaN(points) && points > 0) {
      energy += points;
      updateScore();
      showNotification(`You gained ${points} energy!`);
    } else {
      showNotification("Invalid points value.");
    }
  } else if (command === "reset" && isAdmin) {
    energy = 0;
    spaceships = 0;
    energyBeam = 1;
    spaceshipSpeed = 1000;
    prestigeLevel = 0;
    prestigeThreshold = 1000;
    updateScore();
    showNotification("Game reset!");
  } else if (command === "adminop" && isAdmin) {
    energy = 100000;
    spaceships = 100;
    energyBeam = 100;
    spaceshipSpeed = 50;
    updateScore();
    showNotification("Admin op applied: Full power mode!");
  } else if (command.startsWith("boostclick") && isAdmin && args.length === 2) {
    const boost = parseInt(args[1]);
    if (!isNaN(boost) && boost > 0) {
      energyBeam += boost;
      updateScore();
      showNotification(`Click power boosted by ${boost}`);
    } else {
      showNotification("Invalid boost amount.");
    }
  } else if (command === "maxspeed" && isAdmin) {
    spaceshipSpeed = 50;
    updateScore();
    showNotification("Spaceship speed set to maximum!");
  } else if (command === "richmode" && isAdmin) {
    energy = 1000000;
    spaceships = 100;
    energyBeam = 100;
    updateScore();
    showNotification("Rich mode activated!");
  } else if (command === "unlockall" && isAdmin) {
    energyBeam = 10;
    spaceships = 10;
    updateScore();
    showNotification("All basic upgrades unlocked!");
  } else if (command === "prestigemax" && isAdmin) {
    prestigeLevel += 10;
    prestigeThreshold *= Math.pow(2, 10);
    updateScore();
    showNotification(`Prestiged 10 times! Current level: ${prestigeLevel}`);
  } else if (command === "storm" && isAdmin) {
    showNotification("Storm activated! +1000 energy per second for 10 seconds.");
    let stormInterval = setInterval(() => {
      energy += 1000;
      updateScore();
    }, 1000);
    setTimeout(() => {
      clearInterval(stormInterval);
      showNotification("Storm ended.");
    }, 10000);
  } else if (command === "mysterybox" && isAdmin) {
    const rewards = [
      () => { energy += 5000; showNotification("Mystery Box: +5000 energy!"); },
      () => { spaceships += 5; showNotification("Mystery Box: +5 spaceships!"); },
      () => { energyBeam += 3; showNotification("Mystery Box: +3 energy beam!"); },
      () => { prestigeLevel += 1; showNotification("Mystery Box: +1 prestige level!"); },
      () => { spaceshipSpeed = Math.max(50, spaceshipSpeed - 200); showNotification("Mystery Box: Faster ships!"); }
    ];
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    randomReward();
    updateScore();
  } else {
    showNotification("Invalid command or admin access required.");
  }

  commandInput.value = "";
}
