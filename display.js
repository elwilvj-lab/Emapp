function loadScore() {
  const score = localStorage.getItem("currentScore") || "0.00";
  document.getElementById("score").textContent = score;
}

// load immediately
loadScore();

// update every 500ms (so it refreshes live)
setInterval(loadScore, 500);