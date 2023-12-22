// Notes storage
function createNewNote(newNote) {
  const allNotes = getNotes();
  allNotes.push(newNote);
  setNotes(allNotes);
}

function deleteNoteById(id) {
  const notes = getNotes();
  const filteredNotes = notes.filter((note) => note.noteId !== id);
  setNotes(filteredNotes);
}

function setNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

function getNoteBySessionUser() {
  const notes = getNotes();
  const sessionUser = getSessionUser();
  return notes.filter((note) => note.userId === sessionUser?.id);
}

// User storage
function setUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function removeSessionUser() {
  localStorage.removeItem("user");
}

function setSessionUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function getSessionUser() {
  return JSON.parse(localStorage.getItem("user")) || null;
}
