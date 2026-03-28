let notes = JSON.parse(localStorage.getItem("notes")) || [];

function displayNotes() {
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = "";

  notes.forEach((note, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
${note}
<button onclick="deleteNote(${index})">Delete</button>
`;

    notesList.appendChild(li);
  });
}



function addNote() {
  const input = document.getElementById("noteInput");
  const noteText = input.value;

  if (noteText === "") return;

  notes.push(noteText);

  localStorage.setItem("notes", JSON.stringify(notes));

  input.value = "";

  displayNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);

  localStorage.setItem("notes", JSON.stringify(notes));

  displayNotes();
}

displayNotes();
