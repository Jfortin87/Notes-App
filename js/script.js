//mt Load notes from localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

//mt Save helper
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

//mt Display Notes
function displayNotes() {
  const notesList = document.getElementById("notesList");
  const searchInput = document.getElementById("searchInput");


  const searchValue = searchInput
    ? searchInput.value.toLowerCase()
    : "";

  notesList.innerHTML = "";

  //st Filter notes (search)
  let filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(searchValue)
  );

  //st Sort pinned notes first - (without mutating original order)
  filteredNotes.sort((a, b) => b.pinned - a.pinned);

  filteredNotes.forEach((note) => {
    const li = document.createElement("li");

    //* Content
    const contentDiv = document.createElement("div");
    contentDiv.className = "note-content";

    const text = document.createElement("p");
    text.textContent = note.text;

    const date = document.createElement("small");
    date.textContent = note.date;

    const tag = document.createElement("small");
    tag.textContent = `#${note.tag}`;

    contentDiv.appendChild(text);
    contentDiv.appendChild(date);
    contentDiv.appendChild(tag);

    //st Actions
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    //st Pin/Unpin Button
    const pinBtn = document.createElement("button");
    pinBtn.textContent = note.pinned ? "Unpin" : "Pin";
    pinBtn.onclick = () => togglePin(note.id);

    //st Edit Button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editNote(note.id);

    //st Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteNote(note.id);

    //st Append buttons
    actionsDiv.appendChild(pinBtn);
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    //st Append content and actions to list item
    li.appendChild(contentDiv);
    li.appendChild(actionsDiv);

    //st Append list item to notes list
    notesList.appendChild(li);
  });
}

//mt Add Note
function addNote() {
  const input = document.getElementById("noteInput");
  const tagInput = document.getElementById("tagInput");

  const noteText = input.value.trim();
  const tag = tagInput ? tagInput.value : "general";

  if (noteText === "") return;

  const newNote = {
    id: Date.now(), // unique ID
    text: noteText,
    date: new Date().toLocaleString(),
    pinned: false,
    tag: tag
  };

  notes.push(newNote);
  saveNotes();

  input.value = "";
  displayNotes();
}

//mt Delete Note
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  displayNotes();
}

//mt Edit Note
function editNote(id) {
  const note = notes.find(note => note.id === id);
  const newText = prompt("Edit your note:", note.text);

  if (newText === null || newText.trim() === "") return;

  note.text = newText.trim();
  note.date = new Date().toLocaleString();

  saveNotes();
  displayNotes();
}

//mt Toggle Pin
function togglePin(id) {
  const note = notes.find(note => note.id === id);

  note.pinned = !note.pinned;

  saveNotes();
  displayNotes();
}

//mt Clear All Notes
function clearNotes() {
  if (!confirm("Delete all notes?")) return;

  notes = [];
  localStorage.removeItem("notes");
  displayNotes();
}

//mt Search Listener
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", displayNotes);
}
//mt Enter Key Support
const noteInput = document.getElementById("noteInput");
if (noteInput) {
  noteInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addNote();
    }
  });
}
//mt Initial Load
displayNotes();