import Player from "./classes/Player";
import { animationFrame, game, loopAnimationFrame } from "./runMazeIsa";

export const ws = new Player();

export function loginWS(_nickname) {
  ws.setNickname(_nickname);
  ws.init();
  ws.sendLogIn();
}

export function logoutWS() {
  const id = localStorage.getItem("id");
  ws.sendLogOut(id);
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
  game.setLoop(()=>{});
  cancelAnimationFrame(animationFrame);
  cancelAnimationFrame(loopAnimationFrame);
}
