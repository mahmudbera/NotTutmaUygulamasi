function isInputsValid(object) {
  return Object.keys(object).every((key) => {
    if (object[key].trim() === "") {
      return false;
    }
    return true;
  });
}

function clearInputs(object) {
  // Object parametresi kesinlikle bir HTML elementinden oluşan bir obje olmalı.
  // TODO: Object parametresinin HTML elementinden oluşup oluşmadığını kontrol et.
  for (let key in object) {
    object[key].value = "";
  }
}
