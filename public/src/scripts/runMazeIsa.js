import { Game } from "./classes/MazeRenderizer.js";
import { mazeMatrix } from "./html-content/index.js";
import { exit } from "./exit.js";
import { keyDownHandler, keyUpHandler, move } from "./keys-control";
import { endGame, receivedData, sendWalk } from "./request-control.js";
import { rootDiv } from "./enter.js";

export let game = undefined;
const id = localStorage.getItem("id");

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

  game.setRequestTimeOut(function (move) {
    return sendWalk({ move, id });
  });

  game.renderizeMaze();
  game.setEndGame(endGame);
};

function readPaths(response) {
  const res = JSON.parse(response.data);
  console.log("run ws read paths");
  console.log(res);

  if (res.path === "erro") {
    console.log(res.msg.text);
    rootDiv.append = errorFeedback;
  }

  if (res.path === "login" && res.ok) {
    const receivedId = res.id;
    localStorage.setItem("id", receivedId);
    localStorage.setItem("name", res.name);
    game.setInfoPlayer({ id: receivedId, name: res.name });
  }

  if (res.path === "walk" && res.id !== id) {
    console.log("set moves");
    game.setMovesPlayers(res);
  }
}

window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);

receivedData(readPaths);
