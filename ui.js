// Notları ekranda gösterme işlevselliği
function displayNotes() {
  noteList.innerHTML = "";
  const sessionUserNotes = getNoteBySessionUser();

  sessionUserNotes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note relative w-full bg-white px-4 pt-4 pb-8 text-left rounded-md shadow-lg flex flex-col items-start justify-start";
    noteDiv.innerHTML = `
                    <h3 class="font-bold text-lg mb-1">${note.title}</h3>
                    <p class="mb-4">${note.content}</p>
                    <button class="bg-red-600 text-white text-sm px-3 py-1 rounded-lg absolute bottom-4 right-4" type="button" onclick="deleteNote(${note.noteId})">Sil</button>
                `;
    noteDiv.setAttribute("dataId", note.noteId);
    noteList.appendChild(noteDiv);

  });
}

// Update User Bar 
function updateUserBar() {
  const userImage = document.getElementById("userImage");
  const userFullName = document.getElementById("userFullName");
  const userUsername = document.getElementById("userUsername");
  const sessionUser = getSessionUser();


  userImage.src = 'https://api.dicebear.com/7.x/initials/svg?seed=' + sessionUser.fullName;
  userFullName.innerText = sessionUser.fullName;
  userUsername.innerText = '@' + sessionUser.username;
}

// Kullanıcı giriş panelini gizle, not panelini göster
function showNotePanel() {
  userPanel.style.display = "none";
  notePanel.style.display = "flex";
  displayNotes();
  updateUserBar();
}

// Kullanıcı giriş panelini göster, not panelini gizle
function showUserPanel() {
  userPanel.style.display = "flex";
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
  noteModal.style.display = "flex";
}

function openRegisterPanel() {
  registerPanel.style.display = "flex";
  loginPanel.style.display = "none";
}

function openLoginPanel() {
  registerPanel.style.display = "none";
  loginPanel.style.display = "flex";
}
