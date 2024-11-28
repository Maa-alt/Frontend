let users = {};
export function addProduct(username, product) {
  if (users[username]) {
    users[username].products.push(product);
  }
}

export function getUserProducts(username) {
  return users[username] ? users[username].products : [];
}
