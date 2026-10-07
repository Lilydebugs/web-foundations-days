const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const categorySelect = document.getElementById("category-select");
const notesList = document.getElementById("notes-list");
const noteCount = document.getElementById("note-count");
const errorMessage = document.getElementById("error-message");
const searchInput = document.getElementById("search-input");

let notes = [];

function renderNotes() {
  notesList.innerHTML = "";

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category.toLowerCase()}`;

    li.innerHTML = `
      <p>${note.text}</p>
      <span class="category-label">${note.category}</span>
      <p class="date">${note.createdAt}</p>
      <button type="button" data-id="${note.id}">Delete</button>
    `;

    notesList.appendChild(li);
  });
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = categorySelect.value;

  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  notes.push(newNote);
  renderNotes();

  noteInput.value = "";
});
