// Kullanıcı giriş işlevselliği
function findUserByUsernameAndPassword(username, password) {
  const allUsers = getUsers();

  const enteredUsername = username.trim();
  const enteredPassword = password.trim();

  // Kullanıcıları kontrol et
  for (const user of allUsers) {
    if (
      user.username === enteredUsername &&
      user.password === enteredPassword
    ) {
      return user; // Eşleşen kullanıcıyı döndür
    }
  }

  return null;
}

function loginHandler(object) {
  const foundUser = findUserByUsernameAndPassword(
    object?.username,
    object?.password
  );
  if (foundUser === null) {
    return false;
  }
  setSessionUser(foundUser);
  return true;
}

function registerHandler(object) {
  if (isUserAlreadyExists(object?.username)) {
    return false;
  }
  // Kullanıcı bilgilerini localStorage'a kaydet (her kullanıcı için ayrı anahtarlar)
  const userObject = {
    id: new Date().getTime(), // Her kullanıcı için özel id değeri oluşturma senaryosu
    username: object?.username,
    password: object?.password, // !!!!
  };
  const allUsers = getUsers();
  allUsers.push(userObject);
  setUsers(allUsers);
  return true;
}

function isUserAlreadyExists(username) {
  const allUsers = getUsers();
  for (const user of allUsers) {
    if (user.username === username) {
      return true;
    }
  }
  return false;
}

// Kullanıcı çıkış işlevselliği
function logoutHandler() {
  removeSessionUser();
  showUserPanel();
}
