// app.js
const userPanel = document.getElementById("userPanel");
const loginPanel = document.getElementById("loginPanel");
const registerPanel = document.getElementById("registerPanel");
const notePanel = document.getElementById("notePanel");
const loginUsernameInput = document.getElementById("loginUsername");
const loginPasswordInput = document.getElementById("loginPassword");
const registerUsernameInput = document.getElementById("registerUsername");
const registerPasswordInput = document.getElementById("registerPassword");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const addNoteBtn = document.getElementById("addNoteBtn");
const noteList = document.getElementById("noteList");
const noteModal = document.getElementById("noteModal");
const noteTitleInput = document.getElementById("noteTitle");
const noteContentTextarea = document.getElementById("noteContent");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const closeModalBtn = document.querySelector(".close");
const logoutBtn = document.getElementById("logoutBtn");
const logoutBtnNotePanel = document.getElementById("logoutBtnNotePanel");
const closeNoteModalBtn = document.getElementById("closeNoteModalBtn");

// Sayfa yüklendiğinde kullanıcının oturum durumuna göre paneli ayarla
document.addEventListener("DOMContentLoaded", function () {
  const sessionUser = getSessionUser();

  if (sessionUser) {
    // Kullanıcı oturum açmışsa not panelini göster
    showNotePanel();
  } else {
    // Kullanıcı oturum açmamışsa giriş panelini göster
    showUserPanel();
  }
});

// Kullanıcı kayıt işlevselliği
registerBtn.addEventListener("click", function () {
  const username = registerUsernameInput.value;
  const password = registerPasswordInput.value;

  if (!isInputsValid({ username, password })) {
    alert("Kullanıcı adı ve şifre boş bırakılamaz.");
    return;
  }

  const status = registerHandler({ username, password });
  if (!status) {
    alert("Kullanıcı adı zaten alınmış.");
    return;
  }
  clearInputs({ registerUsernameInput, registerPasswordInput });
  showNotePanel();
});

loginBtn.addEventListener("click", function () {
  const username = loginUsernameInput.value;
  const password = loginPasswordInput.value;

  if (!isInputsValid({ username, password })) {
    alert("Kullanıcı adı ve şifre boş bırakılamaz.");
    return;
  }
  const status = loginHandler({ username, password });
  if (!status) {
    alert("Kullanıcı adı veya şifre hatalı.");
    return;
  }
  clearInputs({ loginUsernameInput, loginPasswordInput });
  showNotePanel();
});

// Not kaydetme işlevselliği
saveNoteBtn.addEventListener("click", function () {
  const title = noteTitleInput.value;
  const content = noteContentTextarea.value;

  if (!isInputsValid({ title, content })) {
    alert("Başlık ve içerik boş bırakılamaz.");
    return;
  }

  createNewNote({
    noteId: new Date().getTime(),
    userId: getSessionUser()?.id,
    title,
    content,
  });

  // Notları ekranda göster ve modalı kapat
  displayNotes();
  closeNoteModal();
});

// Not ekleme işlevselliği
addNoteBtn.addEventListener("click", function () {
  clearInputs({
    noteTitleInput,
    noteContentTextarea,
  });
  openNoteModal();
});

closeNoteModalBtn.addEventListener("click", function () {
  clearInputs({
    noteTitleInput,
    noteContentTextarea,
  });
  closeNoteModal();
});

// Çıkış butonlarına tıklandığında çıkış işlevselliğini çağır
logoutBtn.addEventListener("click", logoutHandler);
logoutBtnNotePanel.addEventListener("click", logoutHandler);
