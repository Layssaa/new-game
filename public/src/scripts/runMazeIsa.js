import { Game } from "./classes/MazeRenderizer.js";
import Player from "./classes/Player.js";

export const makeGame = () => {
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");
  game = new Game(canvas, context, keyUpHandler, keyDownHandler);
  game.loop = () => {
    game.update(move.left, move.up, move.right, move.down, move.space);
    game.renderizeCanvas();
    requestAnimationFrame(game.loop, canvas);
  };
  requestAnimationFrame(game.loop, canvas);
  game.renderizeMaze();
};

const keys = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  space: 32,
};

const move = {
  left: false,
  up: false,
  right: false,
  down: false,
  space: false,
};

window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(_e) {
  const key = _e.keyCode;

  switch (key) {
    case keys.left:
      move.left = true;
      break;

    case keys.up:
      move.up = true;
      break;

    case keys.right:
      move.right = true;
      break;

    case keys.down:
      move.down = true;
      break;

    case keys.space:
      move.space = true;
      break;
  }
}

function keyUpHandler(_e) {
  const key = _e.keyCode;

  switch (key) {
    case keys.left:
      move.left = false;
      break;

    case keys.up:
      move.up = false;
      break;

    case keys.right:
      move.right = false;
      break;

    case keys.down:
      move.down = false;
      break;

    case keys.space:
      move.space = false;
      break;
  }
}
const id = localStorage.getItem("id");
const game = new Game(canvas, context);
const mockName = "nickname";
const ws = new Player(mockName);

// TESTE DE LOGIN ---- TEMPORARIO
setTimeout(() => {
  ws.sendLogIn();
}, 5000);

game.loop = () => {
  game.update(move.left, move.up, move.right, move.down);
  game.renderizeCanvas();
  requestAnimationFrame(game.loop, canvas);
};

requestAnimationFrame(game.loop, canvas);
game.renderizeMaze();

game.setRequestTimeOut(function (move) {
  return ws.sendWalk({ move, id });
});

function readPaths(response) {
  const res = JSON.parse(response.data);
  console.log("run ws read paths");
  console.log(res);

  if (res.path === "login") {
    console.log("set id from login");
    const receivedId = res.id;
    localStorage.setItem("id", receivedId);
    game.setInfoPlayer({ id: receivedId, name: mockName });
  }

  if (res.path === "walk" && res.id !== id) {
    console.log("set moves");
    game.setMovesPlayers(res);
  }
}

ws.receidDataMethod(readPaths);
ws.init();
