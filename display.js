function loadScore() {
  const score = localStorage.getItem("currentScore") || "0.00";
  document.getElementById("score").textContent = score;
}

// =====================
// ENTER ACTION (CLICK OR KEY)
// =====================
function nextScore() {
  document.body.style.background = "white";

  setTimeout(() => {
    window.location.replace("judge.html" + window.location.search);
  }, 60);
}
// =====================
// ENTER KEY SUPPORT (KEYBOARD)
// =====================
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    nextScore();
  }
});

// =====================
// LOAD + AUTO REFRESH
// =====================
loadScore();
setInterval(loadScore, 500);