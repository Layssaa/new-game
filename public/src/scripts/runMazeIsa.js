import { Game } from "./classes/MazeRenderizer.js";
import mazeMatrix from "./html-content/maze-matrix.js";
import { exit } from "./logoutGame.js";
import { keyDownHandler, keyUpHandler, move } from "./keys-control"

let game = undefined;

export const makeGame = () => {
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  document.querySelector(".buttonLogout").addEventListener("click", exit);
  game = new Game(canvas, context, keyUpHandler, keyDownHandler, mazeMatrix);

  game.setLoop(() => {
    game.update(move.left, move.up, move.right, move.down, move.space);
    game.renderizeCanvas();
    requestAnimationFrame(game.loop, canvas);
  });

  requestAnimationFrame(game.loop, canvas);
  game.renderizeMaze();
};

window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);