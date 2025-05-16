document.addEventListener("DOMContentLoaded", () => {
  let clicks = 0;
  let autoClickers = 0;

  const clickCountEl = document.getElementById("click-count");
  const clickerButton = document.getElementById("clicker-button");
  const autoClickerBtn = document.getElementById("auto-clicker-btn");
  const autoClickerCount = document.getElementById("auto-clickers");
  const shopPanel = document.getElementById("shop-panel");
  const toggleShopBtn = document.getElementById("toggle-shop");

  clickerButton.addEventListener("click", () => {
    clicks++;
    updateUI();
  });

  autoClickerBtn.addEventListener("click", () => {
    if (clicks >= 10) {
      clicks -= 10;
      autoClickers++;
      updateUI();
    }
  });

  toggleShopBtn.addEventListener("click", () => {
    shopPanel.classList.toggle("open");
  });

  function updateUI() {
    clickCountEl.textContent = clicks;
    autoClickerCount.textContent = autoClickers;
  }

  function autoClick() {
    clicks += autoClickers;
    updateUI();
  }

  setInterval(autoClick, 1000);
});
