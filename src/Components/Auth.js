// src/utils/Auth.js
export const registerUser = (users, setUsers, username, password) => {
    if (!users.some(user => user.username === username)) {
      setUsers([...users, { username, password }]);
      return true;
    }
    return false;
  };
  
  export const loginUser = (users, username, password) => {
    return users.some(user => user.username === username && user.password === password);
  };
  