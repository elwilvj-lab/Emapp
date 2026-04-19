// =====================
// TEST DATA
// =====================
let gymnasts = [
  { entry: "D01", name: "KARMENIQUE HUNTER", level: "Level 1", score: "", active: true, done: false },
  { entry: "D02", name: "JANE DOE",            level: "Level 1", score: "", active: true, done: false },
  { entry: "D03", name: "SARAH SMITH",         level: "Level 1", score: "", active: true, done: false },
  { entry: "D04", name: "AMY JONES",           level: "Level 1", score: "", active: false, done: false }, // DNC
  { entry: "D05", name: "EMMA BROWN",          level: "Level 1", score: "", active: true, done: false },
  { entry: "D06", name: "LISA WHITE",          level: "Level 1", score: "", active: true, done: false },
  { entry: "D07", name: "CHLOE GREEN",         level: "Level 1", score: "", active: true, done: false }
];

// =====================
// INIT
// =====================
const params = new URLSearchParams(window.location.search);

const gender = params.get("gender") || "Girls";
const levelFromUrl = params.get("level") || "Level 1";
const apparatus = params.get("apparatus") || "Vault";
const groupFromUrl = params.get("group") || "Group D";

document.addEventListener("DOMContentLoaded", initJudgePage);

function initJudgePage() {
  restoreStateFromLocalStorage();
  renderTable();

  document.getElementById("contextText").textContent =
    `${gender} | ${levelFromUrl} | ${apparatus} | ${groupFromUrl}`;

  document.getElementById("levelSelect").value = levelFromUrl;
  document.getElementById("groupSelect").value = groupFromUrl;

  document.getElementById("levelSelect").disabled = true;
  document.getElementById("groupSelect").disabled = true;
}




// =====================
// RESTORE STATE
// =====================
function restoreStateFromLocalStorage() {
  const savedGymnasts = localStorage.getItem("judgeGymnasts");
  if (savedGymnasts) {
    try {
      gymnasts = JSON.parse(savedGymnasts);
    } catch (err) {
      console.error("Could not parse judgeGymnasts:", err);
    }
  }

  const savedIndex = localStorage.getItem("nextIndex");
  const lastConfirmedScore = localStorage.getItem("lastConfirmedScore");

  if (savedIndex !== null && lastConfirmedScore !== null) {
    const prevIndex = parseInt(savedIndex, 10) - 1;

    if (!isNaN(prevIndex) && gymnasts[prevIndex]) {
      gymnasts[prevIndex].score = lastConfirmedScore;
      gymnasts[prevIndex].done = true;
    }

    localStorage.removeItem("nextIndex");
    localStorage.removeItem("lastConfirmedScore");
    saveStateToLocalStorage();
  }
}

// =====================
// SAVE STATE
// =====================
function saveStateToLocalStorage() {
  localStorage.setItem("judgeGymnasts", JSON.stringify(gymnasts));
}

// =====================
// RENDER TABLE
// =====================
function renderTable() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  gymnasts.forEach((g, index) => {
    const row = document.createElement("tr");

    const rowClass = [
      !g.active ? "row-dnc" : "",
      g.done ? "row-done" : ""
    ].join(" ").trim();

    row.className = rowClass;

    row.innerHTML = `
      <td>${g.entry}</td>

      <td class="${g.active ? "name" : "name dnc"}">
        ${g.name}
      </td>

      <td class="${g.active ? "level" : "level dnc"}">
        ${g.level}
      </td>

      <td>
        <div class="score-controls">

          <button class="adjust-btn big"
            ${!g.active ? "disabled" : ""}
            onclick="adjustScore(${index}, -1)">-1</button>

          <button class="adjust-btn small"
            ${!g.active ? "disabled" : ""}
            onclick="adjustScore(${index}, -0.05)">-</button>

          <input 
            class="score-input ${!g.active ? "dnc-input" : ""}"
            type="number"
            step="0.05"
            min="0"
            max="10"
            value="${g.score}"
            ${!g.active ? "disabled" : ""}
            onchange="updateScore(${index}, this.value)"
          >

          <button class="adjust-btn small"
            ${!g.active ? "disabled" : ""}
            onclick="adjustScore(${index}, 0.05)">+</button>

          <button class="adjust-btn big"
            ${!g.active ? "disabled" : ""}
            onclick="adjustScore(${index}, 1)">+1</button>

        </div>
      </td>

      <td>
        <button class="show-btn"
          ${!g.active ? "disabled" : ""}
          onclick="showScore(${index})">
          SHOW
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// =====================
// UPDATE SCORE
// =====================
function updateScore(index, value) {
  gymnasts[index].score = value;
  saveStateToLocalStorage();
}

// =====================
// ADJUST BUTTONS
// =====================
function adjustScore(index, amount) {
  let current = parseFloat(gymnasts[index].score || 0);

  current += amount;

  if (current < 0) current = 0;
  if (current > 10) current = 10;

  gymnasts[index].score = current.toFixed(2);

  saveStateToLocalStorage();
  renderTable();
}

// =====================
// SHOW BUTTON
// =====================
function showScore(index) {
  const g = gymnasts[index];

  if (!g.score || g.score === "") {
    alert("Enter score first");
    return;
  }

  localStorage.setItem("currentScore", parseFloat(g.score).toFixed(2));
  localStorage.setItem("currentName", g.name);
  localStorage.setItem("currentEntry", g.entry);
  localStorage.setItem("currentLevel", g.level);
  localStorage.setItem("currentIndex", index);

  window.location.href = "display.html";
}