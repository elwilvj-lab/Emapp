const score = localStorage.getItem("currentScore") || "0.00";
document.getElementById("score").textContent = score;

function next() {
  const i = parseInt(localStorage.getItem("currentIndex") || "0", 10);

  localStorage.setItem("lastConfirmedScore", score);
  localStorage.setItem("nextIndex", String(i + 1));

  window.location.href = "judge.html" + window.location.search;
}