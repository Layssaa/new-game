import { Game } from "./classes/MazeRenderizer.js";
import { receivedData, sendWalk } from "./controls.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const game = new Game(canvas, context, keyUpHandler, keyDownHandler);

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

game.setRequestTimeOut(function (move) {
  return sendWalk({ move, id });
});

receivedData(readPaths);

window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);

export const makeGame = () => {
  game.loop = () => {
    game.update(move.left, move.up, move.right, move.down, move.space);
    game.renderizeCanvas();
    requestAnimationFrame(game.loop, canvas);
  };
  requestAnimationFrame(game.loop, canvas);
  game.renderizeMaze();

  document.querySelector("canvas").display = "block";
  document.querySelector("#exit-button").display = "block";
};
