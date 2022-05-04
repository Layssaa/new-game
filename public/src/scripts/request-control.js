import Player from "./classes/Player";

export let ws = new Player();

export function loginWS(_nickname) {
  ws.setNickname(_nickname);
  ws.init();
  ws.sendLogIn();
}

export function logoutWS() {
  ws.sendLogOut();
  ws.exit();
}

export function exitWS() {
  ws.exit();
}

export function receivedData(_fun) {
  ws.receidDataMethod(_fun);
}

export function sendWalk({ move, direction }) {
  const id = localStorage.getItem("id");
  ws.sendWalk({ move, id, direction });
}

export function endGame() {
  ws.sendEndGame(localStorage.getItem("id"));
}
