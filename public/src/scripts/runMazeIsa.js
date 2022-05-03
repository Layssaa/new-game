import { Game } from "./classes/MazeRenderizer.js";
import { exit } from "./logoutGame.js";

let game = undefined;

export const makeGame = () => {
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");
  document.querySelector(".buttonLogout").addEventListener("click", exit);
  game = new Game(canvas, context);
  game.loop = () => {
    game.update(move.left, move.up, move.right, move.down);
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
};

const move = {
  left: false,
  up: false,
  right: false,
  down: false,
};

window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(_e) {
  let key = _e.keyCode;

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
  }
}

function keyUpHandler(_e) {
  let key = _e.keyCode;

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
  }
}
