let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

function searchNotes(word) {
  return notes.filter(note =>
    note.text.toLowerCase().includes(word.toLowerCase())
  );
}

function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];

  for (let note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }

  return longest;
}

function countByCategory() {
  let counts = {};

  for (let note of notes) {
    if (!counts[note.category]) {
      counts[note.category] = 0;
    }

    counts[note.category]++;
  }

  return counts;
}

function getSummary() {
  let counts = countByCategory();
  let total = notes.length;
  let word = total === 1 ? "note" : "notes";

  return `${total} ${word}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
}

function isDuplicate(text) {
  let cleanedText = text.trim().toLowerCase();

  return notes.some(note =>
    note.text.trim().toLowerCase() === cleanedText
  );
}

function addNote(text, category) {
  let cleanedText = text.trim();

  if (cleanedText.length < 1 || cleanedText.length > 200) {
    console.log("Note not added: text must be 1–200 characters.");
    return false;
  }

  if (isDuplicate(cleanedText)) {
    console.log("Note not added: duplicate note.");
    return false;
  }

  if (!["personal", "work", "study"].includes(category)) {
    console.log("Note not added: invalid category.");
    return false;
  }

  let newId = notes.length > 0
    ? Math.max(...notes.map(note => note.id)) + 1
    : 1;

  notes.push({
    id: newId,
    text: cleanedText,
    category: category
  });

  console.log("Note added successfully.");
  return true;
}


/* TESTS */

/* searchNotes */
console.log(searchNotes("javascript"));
// Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]

console.log(searchNotes("pizza"));
// Expected: []


/* longestNote */
console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

let savedNotes = notes;
notes = [];

console.log(longestNote());
// Expected: null

notes = savedNotes;


/* countByCategory */
console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

notes = [
  { id: 1, text: "One personal note", category: "personal" }
];

console.log(countByCategory());
// Expected: { personal: 1 }

notes = savedNotes;


/* getSummary */
console.log(getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study."

notes = [
  { id: 1, text: "One note", category: "personal" }
];

console.log(getSummary());
// Expected: "1 note: 1 personal, 0 work, 0 study."

notes = savedNotes;


/* isDuplicate */
console.log(isDuplicate("  BUY MILK AND BREAD  "));
// Expected: true

console.log(isDuplicate("Buy pizza"));
// Expected: false


/* addNote */
console.log(addNote("Learn JavaScript functions", "study"));
// Expected: true

console.log(addNote("   Buy milk and bread   ", "personal"));
// Expected: false, duplicate note

console.log(addNote("", "study"));
// Expected: false, invalid text length

console.log(addNote("New valid note", "school"));
// Expected: false, invalid category
