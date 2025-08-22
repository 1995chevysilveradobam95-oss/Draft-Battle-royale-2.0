const characters = [
  { name: "Kidd (F)", img: "https://picsum.photos/seed/kidd/200" },
  { name: "Axel", img: "https://picsum.photos/seed/axel/200" },
  { name: "Dante", img: "https://picsum.photos/seed/dante/200" },
  { name: "Crow", img: "https://picsum.photos/seed/crow/200" },
  { name: "Blade", img: "https://picsum.photos/seed/blade/200" },
  { name: "Rook", img: "https://picsum.photos/seed/rook/200" },
  { name: "Ash", img: "https://picsum.photos/seed/ash/200" },
  { name: "Gunner", img: "https://picsum.photos/seed/gunner/200" },
  { name: "Fang", img: "https://picsum.photos/seed/fang/200" },
  { name: "Slade", img: "https://picsum.photos/seed/slade/200" }
];

let alive = [];
let log = [];
let interval;

const battlefield = document.getElementById("battlefield");
const logDiv = document.getElementById("log");
const rankingsDiv = document.getElementById("rankings");

document.getElementById("startBtn").addEventListener("click", startBattle);
document.getElementById("toggleLog").addEventListener("click", () => {
  logDiv.classList.toggle("hidden");
});

function renderCharacters() {
  battlefield.innerHTML = "";
  alive.forEach(ch => {
    const div = document.createElement("div");
    div.className = "character";
    div.innerHTML = `<img src="${ch.img}" alt="${ch.name}"><p>${ch.name}</p>`;
    battlefield.appendChild(div);
  });
}

function startBattle() {
  alive = [...characters];
  log = [];
  rankingsDiv.innerHTML = "";
  renderCharacters();
  logDiv.innerHTML = "";
  clearInterval(interval);
  interval = setInterval(step, 1500);
}

function step() {
  if (alive.length <= 1) {
    clearInterval(interval);
    if (alive.length === 1) {
      rankingsDiv.innerHTML = `<div id="winner">👑 Winner: ${alive[0].name}</div>`;
    }
    return;
  }

  const killer = alive[Math.floor(Math.random() * alive.length)];
  let victim;
  do {
    victim = alive[Math.floor(Math.random() * alive.length)];
  } while (victim === killer);

  log.unshift(`${killer.name} brutally eliminates ${victim.name}`);
  logDiv.innerHTML = log.join("<br>");

  // Mark victim as dead
  const charDivs = battlefield.getElementsByClassName("character");
  for (let div of charDivs) {
    if (div.innerText.includes(victim.name)) {
      div.classList.add("dead");
    }
  }

  // Remove victim from alive
  alive = alive.filter(c => c !== victim);

  // Rankings
  rankingsDiv.innerHTML = `<p>Alive: ${alive.length}</p>`;
}
