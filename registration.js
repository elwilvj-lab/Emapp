let gymnasts = [
  // ===== GROUP A =====
  { entry: "A1", name: "MORGAN SMITH",      level: "Level 2", group: "A", club: "Emf", score: "", arrived: false, active: true,  done: false },
  { entry: "A2", name: "LIA VAN WYK",       level: "Level 2", group: "A", club: "Emf", score: "", arrived: true,  active: true,  done: false },
  { entry: "A3", name: "AMORE DYNE",        level: "Level 2", group: "A", club: "JGC", score: "", arrived: false, active: true,  done: false },
  { entry: "A4", name: "YANA PRINSLOO",     level: "Level 2", group: "A", club: "Emf", score: "", arrived: false, active: true,  done: false },
  { entry: "A5", name: "MAINE SWIN",        level: "Level 2", group: "A", club: "VGC", score: "", arrived: false, active: true,  done: false },
  { entry: "A6", name: "MOKA GOMES",        level: "Level 2", group: "A", club: "Emf", score: "", arrived: false, active: true,  done: false },

  // ===== GROUP B =====
  { entry: "B1", name: "ABIGAIL NAUDE",     level: "Level 2", group: "B", club: "Emf", score: "", arrived: false, active: true,  done: false },
  { entry: "B2", name: "HUNTER RILEY",      level: "Level 2", group: "B", club: "VGC", score: "", arrived: false, active: true,  done: false },
  { entry: "B3", name: "TELYN GELDART",     level: "Level 2", group: "B", club: "Emf", score: "", arrived: true,  active: true,  done: false },
  { entry: "B4", name: "NAH RYS",           level: "Level 2", group: "B", club: "JGC", score: "", arrived: false, active: true,  done: false },
  { entry: "B5", name: "JENAH COTZEE",      level: "Level 2", group: "B", club: "Emf", score: "", arrived: false, active: true,  done: false },
  { entry: "B6", name: "KARMIA LANE",       level: "Level 2", group: "B", club: "VGC", score: "", arrived: false, active: true,  done: false },

  // ===== GROUP C =====
  { entry: "C1", name: "TANYA VICTOR",      level: "Level 2", group: "C", club: "Emf", score: "", arrived: false, active: true,  done: false },
  { entry: "C2", name: "MIRA NORCIC",       level: "Level 2", group: "C", club: "Emf", score: "", arrived: false, active: true,  done: false },
  { entry: "C3", name: "SIBY TOMLIN",       level: "Level 2", group: "C", club: "JGC", score: "", arrived: false, active: true,  done: false },
  { entry: "C4", name: "NINA ELS",          level: "Level 2", group: "C", club: "VGC", score: "", arrived: false, active: true,  done: false },
  { entry: "C5", name: "ALLENKE BUCHNER",   level: "Level 2", group: "C", club: "Emf", score: "", arrived: true,  active: true,  done: false },
  { entry: "C6", name: "LEANE ROSOUW",      level: "Level 2", group: "C", club: "JGC", score: "", arrived: false, active: true,  done: false },

  // ===== GROUP D =====
  { entry: "D1", name: "ANANTE SIBANDA",    level: "Level 2", group: "D", club: "Emf", score: "", arrived: true,  active: true,  done: false },
  { entry: "D2", name: "MIKE STEINBERG",    level: "Level 2", group: "D", club: "VGC", score: "", arrived: false, active: true,  done: false },
  { entry: "D3", name: "THANDO NKOSI",      level: "Level 2", group: "D", club: "Emf", score: "", arrived: false, active: false, done: false },
  { entry: "D4", name: "LANA PIERSE",       level: "Level 2", group: "D", club: "JGC", score: "", arrived: false, active: true,  done: false },
  { entry: "D5", name: "PAJALO MARENG",     level: "Level 2", group: "D", club: "Emf", score: "", arrived: false, active: true,  done: false },
  { entry: "D6", name: "NOKWAZI MATLA",     level: "Level 2", group: "D", club: "VGC", score: "", arrived: false, active: true,  done: false }
];

let selectedIndex = null;

document.addEventListener("DOMContentLoaded", () => {
  render();

  const searchBox = document.getElementById("searchBox");
  if (searchBox) {
    searchBox.addEventListener("input", () => {
      render();

      const btn = document.getElementById("clearSearch");
      if (btn) {
        btn.style.display = searchBox.value ? "block" : "none";
      }
    });
  }
});

function render() {
  const grid = document.getElementById("grid");
  if (!grid) return;

  const searchValue = (document.getElementById("searchBox")?.value || "").trim().toLowerCase();
  grid.innerHTML = "";

  const filtered = gymnasts.filter(g => {
    if (!searchValue) return true;
    return (
      g.entry.toLowerCase().includes(searchValue) ||
      g.name.toLowerCase().includes(searchValue) ||
      (g.group || "").toLowerCase().includes(searchValue) ||
      (g.club || "").toLowerCase().includes(searchValue)
    );
  });

  filtered.forEach((g) => {
    const index = gymnasts.indexOf(g);

    const div = document.createElement("div");
    div.className = "reg-cell";

    if (g.arrived) div.classList.add("present");
    if (!g.active) div.classList.add("inactive");
    if (selectedIndex === index) div.classList.add("selected");

    div.innerHTML = `
      <div class="reg-checkbox">
        <input type="checkbox" ${g.arrived ? "checked" : ""} onclick="togglePresentDirect(${index}, event)">
      </div>

      <div class="reg-entry">${g.entry}</div>
      <div class="reg-name">${g.name}</div>
      <div class="reg-meta">${[g.level, `Group ${g.group}`, g.club].filter(Boolean).join(" | ")}</div>
    `;

    div.onclick = () => edit(index);
    grid.appendChild(div);
  });
}

function togglePresentDirect(index, e) {
  e.stopPropagation();
  gymnasts[index].arrived = !gymnasts[index].arrived;
  render();
}

function edit(index) {
  selectedIndex = index;
  const g = gymnasts[index];

  document.getElementById("editEntry").value = g.entry || "";
  document.getElementById("editName").value = g.name || "";

  document.getElementById("editor").classList.remove("hidden");
  render();
}

function saveEdit() {
  if (selectedIndex === null) return;

  const g = gymnasts[selectedIndex];
  g.entry = document.getElementById("editEntry").value.trim();
  g.name = document.getElementById("editName").value.trim();

  render();
}

function addNew() {
  gymnasts.push({
    entry: "",
    name: "",
    level: "Level 2",
    group: "A",
    club: "Emf",
    score: "",
    arrived: false,
    active: true,
    done: false
  });

  selectedIndex = gymnasts.length - 1;
  document.getElementById("editor").classList.remove("hidden");
  render();

  document.getElementById("editEntry").value = "";
  document.getElementById("editName").value = "";
}

function clearSearch() {
  const box = document.getElementById("searchBox");
  box.value = "";
  render();
  box.focus();

  const btn = document.getElementById("clearSearch");
  if (btn) {
    btn.style.display = "none";
  }
}