// Notları ekranda gösterme işlevselliği
function displayNotes() {
  noteList.innerHTML = "";
  const sessionUserNotes = getNoteBySessionUser();

  sessionUserNotes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = `note relative w-full bg-white px-4 pt-4 pb-8 text-left rounded-md shadow-lg flex flex-col items-start justify-start border-l-8 border-${note?.categoryColor} mb-4`;
    noteDiv.innerHTML = `
                    <h3 class="font-bold text-lg mb-1">${note.title}</h3>
                    <p class="mb-4">${note.content}</p>
                    
                    <span class="text-sm text-gray-500 absolute bottom-4 left-4">${note.categoryName}</span>
                    
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

  userImage.src =
    "https://api.dicebear.com/7.x/initials/svg?seed=" + sessionUser.fullName;
  userFullName.innerText = sessionUser.fullName;
  userUsername.innerText = "@" + sessionUser.username;
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

function closeNoteModal() {
  noteModal.style.display = "none";
}

function openNoteModal() {
  generateCategories();
  noteModal.style.display = "flex";
}

function closeCategoryModal() {
  categoryModal.style.display = "none";
}

function openCategoryModal() {
  generateColors();
  categoryModal.style.display = "flex";
}

function openRegisterPanel() {
  registerPanel.style.display = "flex";
  loginPanel.style.display = "none";
}

function openLoginPanel() {
  registerPanel.style.display = "none";
  loginPanel.style.display = "flex";
}

const colors = [
  "red-500",
  "orange-500",
  "amber-500",
  "yellow-500",
  "lime-500",
  "green-500",
  "emerald-500",
  "teal-500",
  "cyan-500",
  "sky-500",
  "blue-500",
  "indigo-500",
];

function generateColors() {
  const colorsContent = document.getElementById("colorsContent");
  colorsContent.innerHTML = "";
  colors.forEach((color) => {
    colorsContent.innerHTML += `
    <input type="radio" id="${color}" name="color" value="${color}"  class="hidden peer/${color}">
    <label for="${color}" class="bg-${color} w-full aspect-square rounded-md cursor-pointer opacity-30 peer-checked/${color}:opacity-100 hover:opacity-90 transition-opacity"></label>
    `;
  });
}

function generateCategories() {
  const noteCategory = document.getElementById("noteCategory");
  const categories = getCategoryBySessionUser();
  noteCategory.innerHTML = "";
  categories.forEach((category) => {
    noteCategory.innerHTML += `
    <option value="${category.categoryId}">${category.categoryName}</option>
    `;
  });
}
