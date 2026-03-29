let notes = JSON.parse(localStorage.getItem("notes")) || [];

//* Display Notes
function displayNotes() {
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = "";

  notes.forEach((note, index) => {
    const li = document.createElement("li");

    const noteCont = document.createElement("div");
    noteCont.className = "note-content";

    const text = document.createElement("p");
    text.textContent = note.text;

    const date = document.createElement("h6");
    date.textContent = note.date;

    noteCont.appendChild(text);
    noteCont.appendChild(date);

    const noteBtnsCont = document.createElement("div");
    noteBtnsCont.className = "actions";
    // noteBtnsCont.style.border = "1px solid black";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editNote(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteNote(index);

    noteBtnsCont.appendChild(editBtn);
    noteBtnsCont.appendChild(deleteBtn);

    li.appendChild(noteCont);
    li.appendChild(noteBtnsCont);

    notesList.appendChild(li);
  });
}

//* Add Note
function addNote() {
  const input = document.getElementById("noteInput");
  const noteText = input.value.trim();

  if (noteText === "") return;

  notes.push({
    text: noteText,
    date: new Date().toLocaleString(),
  });

  localStorage.setItem("notes", JSON.stringify(notes));

  input.value = "";
  displayNotes();
}

//* Delete Note
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

//* Edit Note
function editNote(index) {
  const newText = prompt("Edit Note:", notes[index].text);

  if (newText === null || newText.trim() === "") return;

  notes[index].text = newText.trim();
  notes[index].date = new Date().toLocaleString();

  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

//* Clear All Notes
function clearNotes() {
  if (!confirm("Delete all notes?")) return;

  notes = [];
  localStorage.removeItem("notes");
  displayNotes();
}

//* Enter Key Support
document.getElementById("noteInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    addNote();
  }
});

//* Initial Load
displayNotes();
