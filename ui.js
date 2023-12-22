// Notları ekranda gösterme işlevselliği
function displayNotes() {
  noteList.innerHTML = "";
  const sessionUserNotes = getNoteBySessionUser();

  sessionUserNotes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";
    noteDiv.innerHTML = `
                    <h3>${note.title}</h3>
                    <p>${note.content}</p>
                    <button type="button" onclick="deleteNote(${note.noteId})">Sil</button>
                `;
    noteDiv.setAttribute("dataId", note.noteId);
    noteList.appendChild(noteDiv);
  });
}

// Kullanıcı giriş panelini gizle, not panelini göster
function showNotePanel() {
  userPanel.style.display = "none";
  notePanel.style.display = "block";
  displayNotes();
}

// Kullanıcı giriş panelini göster, not panelini gizle
function showUserPanel() {
  userPanel.style.display = "block";
  notePanel.style.display = "none";
}

function deleteNote(noteId) {
  deleteNoteById(noteId);
  displayNotes();
}

// Modalı kapatma işlevselliği
function closeNoteModal() {
  noteModal.style.display = "none";
}

function openNoteModal() {
  noteModal.style.display = "block";
}
