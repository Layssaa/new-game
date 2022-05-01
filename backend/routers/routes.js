const { EndGame } = require("../controllers/end");
const { Login, Logout, Walk } = require("../controllers/index");

function login(data, ws, wss, WebSocket) {
  const loginUser = new Login(data, ws, wss, WebSocket);
  loginUser.login();
}

function walk(data, ws, wss, WebSocket) {
  const playerWalk = new Walk(data, ws, wss, WebSocket);
  playerWalk.sendMovesPlayer();
}

function logout(data, ws, wss, WebSocket) {
  const logoutUser = new Logout(data, ws, wss, WebSocket);
  logoutUser.logout();
}

function endGame(data, ws, wss, WebSocket){
  const game = new EndGame(data, ws, wss, WebSocket);
  game.notifyEndGame();
}

// ------------- ACTIONS  & ROUTERS -----------
module.exports = {
  login,
  walk,
  logout,
  end: endGame
};
