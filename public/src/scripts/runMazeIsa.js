import { Game } from "./classes/MazeRenderizer.js";
import { mazeMatrix } from "./html-content/index.js";
import { exit } from "./exit.js";
import { keyDownHandler, keyUpHandler, move } from "./keys-control";
import { endGame, receivedData, sendWalk } from "./request-control.js";
import { rootDiv } from "./enter.js";
import { winnerPopUp } from "./winnerPopUp.js";
import { errorFeedback } from "./html-content/error.js";

const id = localStorage.getItem("id");
let game = undefined;
let playerInfo = {};

export const makeGame = () => {
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  document.querySelector(".buttonLogout").addEventListener("click", exit);
  game = new Game(canvas, context, keyUpHandler, keyDownHandler, mazeMatrix);
  game.setEndGame(winnerPopUp);

  game.setLoop(() => {
    game.update(move.left, move.up, move.right, move.down, move.space);
    game.renderizeCanvas();
    requestAnimationFrame(game.loop, canvas);
  });

  requestAnimationFrame(game.loop, canvas);

  game.setMoveRequest(function ({ move, direction = 32 }) {
    return sendWalk({ move, direction });
  });

  game.renderizeMaze();
  playerInfo = game.getPlayerInfo();
  game.setEndGame(endGame);
};

function readPaths(response) {
  const res = JSON.parse(response.data);

  if (res.path === "erro") {
    console.log(res.msg.text);
    rootDiv.append = errorFeedback;
  }

  if (res.path === "login" && res.ok) {
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
    console.log("end game");
    game.setWinner(res.name);
    game.keyBlocker();
    ws.sendWalk = function () {};
  }
}

window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);

receivedData(readPaths);
localStorage.clear();

export { game };
