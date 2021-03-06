import { Game } from "./classes/MazeRenderizer.js";
import { mazeMatrix } from "./html-content/index.js";
import { exit } from "./exit.js";
import { keyDownHandler, keyUpHandler, move } from "./keys-control";
import { endGame, receivedData, sendWalk, ws } from "./request-control.js";
import { rootDiv, setMessage } from "./enter.js";
import { winnerPopUp } from "./winnerPopUp.js";
import { maze } from "./html-content";

const id = localStorage.getItem("id");
let game = undefined;
let playerInfo = {};
let animationFrame;
let loopAnimationFrame;

export const makeGame = () => {
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  document.querySelector(".buttonLogout").addEventListener("click", exit);

  game = new Game(canvas, context, keyUpHandler, keyDownHandler, mazeMatrix);

  game.setLoop(() => {
    game.update(move.left, move.up, move.right, move.down, move.space);
    game.renderizeCanvas();
    loopAnimationFrame = requestAnimationFrame(game.loop, canvas);
  });

  animationFrame = requestAnimationFrame(game.loop, canvas);

  game.setMoveRequest(function ({ move, direction = 32 }) {
    return sendWalk({ move, direction });
  });

  game.renderizeMaze();
  playerInfo = game.getPlayerInfo();
  game.setEndGame(endGame);
};

function readPaths(response) {
  const res = JSON.parse(response.data);

  if (res.path === "erro" && res.msg.text === "Repeated name") {
    return setMessage("Esse nome já está sendo usado.");
  }

  if (res.path === "login" && res.ok) {
    rootDiv.innerHTML = maze;
    makeGame();

    const receivedId = res.id;

    localStorage.setItem("id", receivedId);
    localStorage.setItem("nickname", res.name);
    game.setInfoPlayer({
      id: receivedId,
      name: res.name,
      move: [playerInfo.x, playerInfo.y],
    });
    sendWalk({ move: [playerInfo.x, playerInfo.y], direction: 32 });
  }

  if (res.path === "entry" && res.ok) {
    game.setMovesPlayers(res);
  }

  if (res.path === "walk" && res.id !== id) {
    game.setMovesPlayers(res);
  }

  if (res.path === "end" && res.id !== id) {
    game.setWinner(res.id);
    winnerPopUp(res.name);
    game.keyBlocker();
    window.cancelAnimationFrame(animationFrame);
    window.cancelAnimationFrame(loopAnimationFrame);
    animationFrame = undefined;
    loopAnimationFrame = undefined;
    game = null;
  }
}

window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);

receivedData(readPaths);
localStorage.clear();

export function gameInit() {
  window.addEventListener("keydown", keyDownHandler, false);
  window.addEventListener("keyup", keyUpHandler, false);

  move.left = false;
  move.up = false;
  move.right = false;
  move.down = false;
  move.space = false;
}

gameInit();

export { game, animationFrame, loopAnimationFrame };
