const { EndGame } = require("../controllers/end");
const { Login, Logout, Walk } = require("../controllers/index");
const { winner, listUsers, moves } = require("../__mock__/data-mock");

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
  const walk = new Walk(data, ws, wss, WebSocket);
  
  walk.sendLogoutMoves();
  logoutUser.logout();
}

function endGame(data, ws, wss, WebSocket) {
  const game = new EndGame(data, ws, wss, WebSocket);

  const list = Object.keys(listUsers);

  game.setResetTimeOut(resetGame);
  game.notifyEndGame(list);
}

function resetGame(chatList) {
  winner.id = undefined;
  winner.name = undefined;

  chatList.forEach((id) => {
    delete moves[`${id}`];
  });
}

// ------------- ACTIONS  & ROUTERS -----------
module.exports = {
  login,
  walk,
  logout,
  end: endGame,
  reset: resetGame,
};
