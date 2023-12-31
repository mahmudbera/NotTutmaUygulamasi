// app.js
const userPanel = document.getElementById("userPanel");
const loginPanel = document.getElementById("loginPanel");
const registerPanel = document.getElementById("registerPanel");
const notePanel = document.getElementById("notePanel");
const loginUsernameInput = document.getElementById("loginUsername");
const loginPasswordInput = document.getElementById("loginPassword");
const registerUsernameInput = document.getElementById("registerUsername");
const registerPasswordInput = document.getElementById("registerPassword");
const registerFullNameInput = document.getElementById("registerFullName");
const registerEmailInput = document.getElementById("registerEmail");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const addNoteBtn = document.getElementById("addNoteBtn");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const noteList = document.getElementById("noteList");
const noteModal = document.getElementById("noteModal");
const categoryModal = document.getElementById("categoryModal");
const noteTitleInput = document.getElementById("noteTitle");
const noteContentTextarea = document.getElementById("noteContent");
const categoryText = document.getElementById("categoryText");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const saveCateBtn = document.getElementById("saveCateBtn");
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
  const fullName = registerFullNameInput.value;
  const email = registerEmailInput.value;

  if (!isInputsValid({ username, password })) {
    alert("Kullanıcı adı ve şifre boş bırakılamaz.");
    return;
  }

  const status = registerHandler({ username, password, fullName, email });
  if (!status) {
    alert("Kullanıcı adı zaten alınmış.");
    return;
  }
  clearInputs({
    registerUsernameInput,
    registerPasswordInput,
    registerFullNameInput,
    registerEmailInput,
  });
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
  const categorySelect = document.getElementById("noteCategory");

  var value = categorySelect.value;

  const category = getCategoryById(value);

  console.log(value, category);

  if (!isInputsValid({ title, content })) {
    alert("Başlık ve içerik boş bırakılamaz.");
    return;
  }

  createNewNote({
    noteId: new Date().getTime(),
    userId: getSessionUser()?.id,
    title,
    content,
    categoryColor: category?.categoryColor,
    categoryId: category?.categoryId,
    categoryName: category?.categoryName,
  });

  // Notları ekranda göster ve modalı kapat
  displayNotes();
  closeNoteModal();
});

saveCateBtn.addEventListener("click", function () {
  const categoryTextValue = categoryText.value;
  const categoryColorValue = document.querySelector(
    'input[name="color"]:checked'
  )?.value;

  if (
    !isInputsValid({ categoryTextValue }) ||
    !!!document.querySelector('input[name="color"]:checked')
  ) {
    alert("Kategori ve renk boş bırakılamaz.");
    return;
  }

  createNewCategory({
    categoryId: new Date().getTime(),
    userId: getSessionUser()?.id,
    categoryName: categoryTextValue,
    categoryColor: categoryColorValue,
  });

  clearInputs({
    categoryText,
  });
  displayNotes();
  closeCategoryModal();
});

// Not ekleme işlevselliği
addNoteBtn.addEventListener("click", function () {
  clearInputs({
    noteTitleInput,
    noteContentTextarea,
  });
  openNoteModal();
});

addCategoryBtn.addEventListener("click", function () {
  clearInputs({
    noteTitleInput,
    noteContentTextarea,
  });
  openCategoryModal();
});

// Çıkış butonlarına tıklandığında çıkış işlevselliğini çağır
logoutBtnNotePanel.addEventListener("click", logoutHandler);
