window.addEventListener('load', () => {
  const title = document.getElementById('page-title');
  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);
  title.textContent = `Baba's Puzzle of ${formattedDate}`;
});

const difficultyClasses = [
  "group-easiest",   // index 0: Antibiotics (easiest)
  "group-medium",    // index 1: Autoimmune Diseases
  "group-hard",      // index 2: Brain Structures
  "group-hardest"    // index 3: Neurological Disorders (hardest)
];

const terms = [
  // Group: Antibiotics
  "Penicillin", "Amoxicillin", "Erythromycin", "Doxycycline",
  // Group: Autoimmune Diseases
  "Lupus", "Rheumatoid Arthritis", "MS", "Crohn's Disease",
  // Group: Brain Structures
  "Cerebellum", "Hippocampus", "Medulla", "Thalamus",
  // Group: Neurological Disorders
  "Migraine", "Epilepsy", "Parkinson’s", "ALS"
];

// Define the correct groups
const correctGroups = [
  ["Penicillin", "Amoxicillin", "Erythromycin", "Doxycycline"],
  ["Lupus", "Rheumatoid Arthritis", "MS", "Crohn's Disease"],
  ["Cerebellum", "Hippocampus", "Medulla", "Thalamus"],
  ["Migraine", "Epilepsy", "Parkinson’s", "ALS"]
];

let selected = [];
let solvedGroups = 0;

const grid = document.getElementById("grid");
const feedback = document.getElementById("feedback");

// Shuffle terms before showing
terms.sort(() => 0.5 - Math.random());

terms.forEach(term => {
  const div = document.createElement("div");
  div.className = "tile";
  div.textContent = term;
  div.addEventListener("click", () => selectTile(div));
  grid.appendChild(div);
});

function selectTile(tile) {
  if (tile.classList.contains("locked")) return;

  tile.classList.toggle("selected");

  const term = tile.textContent;
  if (tile.classList.contains("selected")) {
    selected.push(term);
  } else {
    selected = selected.filter(t => t !== term);
  }
}

const difficultyClasses = [
  "group-easiest",
  "group-medium",
  "group-hard",
  "group-hardest"
];

function submitGroup() {
  if (selected.length !== 4) {
    feedback.textContent = "Please select exactly 4 terms.";
    return;
  }

  // Check if selected terms match a group
  const matchIndex = correctGroups.findIndex(group =>
    selected.every(term => group.includes(term)) &&
    group.every(term => selected.includes(term))
  );

  if (matchIndex !== -1) {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach(tile => {
    if (selected.includes(tile.textContent)) {
      tile.classList.remove("selected");
      tile.classList.add("locked");
      tile.classList.add(difficultyClasses[matchIndex]);  // add difficulty color here
    }
  });

  feedback.textContent = "Correct!";
  solvedGroups++;
  } else {
    feedback.textContent = "Try again.";
  }

  selected = [];

  if (solvedGroups === 4) {
    feedback.textContent = "Avicenna!";
  }
}

function formatDate(date) {
  // Format as: Month Day, Year (e.g., July 11, 2025)
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}



