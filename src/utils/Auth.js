let users = {};

export function registerUser(username, password) {
  if (!users[username]) {
    users[username] = { password, products: [] };
    return true;
  }
  return false;
}

export function loginUser(username, password) {
  return users[username] && users[username].password === password;
}

export function hasRegisteredUsers() {
  return Object.keys(users).length > 0;
}
