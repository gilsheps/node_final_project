function jsonParse() {
  return JSON.parse(localStorage.getItem("user"));
}

function getUserNameFromLocalStorage() {
  return jsonParse().username;
}

function getUserIdFromLocalStorage() {
    return jsonParse().id;
  }
  
function getUserFromLocalStorage() {
  return jsonParse();
}
function getTokenFromLocalStorage() {
  return jsonParse().token;
}
function setInLocalStorage(key, value) {
  // console.log("setUserInLocalStorage", key, value);
  localStorage.setItem(key, value);
}

export {
  getUserNameFromLocalStorage,
  getUserFromLocalStorage,
  getTokenFromLocalStorage,
  setInLocalStorage,
  getUserIdFromLocalStorage
};
