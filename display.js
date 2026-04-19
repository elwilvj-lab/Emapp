const score = localStorage.getItem("currentScore") || "0.00";
document.getElementById("score").textContent = score;

function next() {
  const i = parseInt(localStorage.getItem("currentIndex") || "0", 10);
  const entry = localStorage.getItem("currentEntry") || "";
  const name = localStorage.getItem("currentName") || "";
  const level = localStorage.getItem("currentLevel") || "";

  const savedScores = JSON.parse(localStorage.getItem("savedScores") || "[]");

  savedScores.push({
    index: i,
    entry: entry,
    name: name,
    level: level,
    score: score
  });

  localStorage.setItem("savedScores", JSON.stringify(savedScores));
  localStorage.setItem("nextIndex", String(i + 1));

  alert("Saved: " + entry + " = " + score);

  window.location.href = "judge.html";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    next();
  }
});