const score = localStorage.getItem("currentScore") || "0.00";
const scoreText = document.getElementById("scoreText");
scoreText.textContent = score;

function fitScore() {
  const len = score.length;

  // Bigger for short scores, slightly smaller for longer
  let size = 360;
  if (len >= 5) size = 330;
  if (len >= 6) size = 290;
  if (len >= 7) size = 250;

  scoreText.setAttribute("font-size", size);
}

fitScore();

function goFullscreen() {
  const elem = document.documentElement;

  if (!document.fullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {});
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }
}

function next() {
  const i = parseInt(localStorage.getItem("currentIndex") || "0", 10);

  localStorage.setItem("lastConfirmedScore", score);
  localStorage.setItem("nextIndex", String(i + 1));

  // keep same query string if there is one
  window.location.href = "judge.html" + window.location.search;
}

document.getElementById("enterBtn").addEventListener("click", next);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") next();
});

// First tap anywhere can try fullscreen
document.body.addEventListener(
  "click",
  () => {
    goFullscreen();
  },
  { once: true }
);