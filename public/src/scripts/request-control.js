import Player from "./classes/Player";

const ws = new Player();

export function loginWS(_name) {
  ws.setName(_name);
  ws.init();
  ws.sendLogIn()
}

export function logoutWS(_name) {
  ws.sendLogOut();
  ws.exit();
}

export function exitWS() {
  ws.exit();
}

export function receivedData(_fun) {
  ws.receidDataMethod(_fun);
}

export function sendWalk({ move, id }) {
  ws.sendWalk({ move, id });
}

export function endGame() {
  ws.sendEndGame(localStorage.getItem("id"));
}
