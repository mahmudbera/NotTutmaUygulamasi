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

// Category storage
function createNewCategory(newCategory) {
  const allCategories = getCategories();
  allCategories.push(newCategory);
  setCategories(allCategories);
}

function setCategories(category) {
  localStorage.setItem("categories", JSON.stringify(category));
}

function getCategories() {
  return JSON.parse(localStorage.getItem("categories")) || [];
}

function getCategoryBySessionUser() {
  const categories = getCategories();
  return categories.filter(
    (category) => category.userId === getSessionUser()?.id
  );
}

function getCategoryById(id) {
  const categories = getCategoryBySessionUser();
  return categories.find((category) => category.categoryId == id);
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
