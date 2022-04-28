const { Login } = require("../controllers/index");
const { Logout } = require("../controllers/index");
const { Walk } = require("../controllers/walk");

function login(data, ws, wss, WebSocket) {
  const loginUser = new Login(data, ws, wss, WebSocket);
  loginUser.login();
}

function walk(data, ws, wss, WebSocket) {
  console.log("walk");
  const playerWalk = new Walk(data, ws, wss, WebSocket);
}

function logout(data, ws, wss, WebSocket) {
  const logoutUser = new Logout(data, ws, wss, WebSocket);
  logoutUser.logout();
}

// ------------- ACTIONS  & ROUTERS -----------
module.exports = {
  login,
  walk,
  logout,
};
