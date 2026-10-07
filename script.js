const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const categorySelect = document.getElementById("category-select");
const notesList = document.getElementById("notes-list");
const noteCount = document.getElementById("note-count");
const errorMessage = document.getElementById("error-message");
const searchInput = document.getElementById("search-input");

let notes = [];

function updateNoteCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

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

  updateNoteCount();
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = categorySelect.value;

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

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

notesList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const id = Number(event.target.dataset.id);

    notes = notes.filter((note) => note.id !== id);

    renderNotes();
  }
});
