import { ControlGame } from "./Control-game";

export class Game extends ControlGame {
  constructor(_canvas, _context, _keyUpHandler, _keyDownHandler, _matrix) {
    super(_canvas, _context, _keyUpHandler, _keyDownHandler, _matrix);
    this.winner = undefined;
    this.movesPlayers = [];
    this.moves = [];
    this.keyUpHandler;
    this.keyDownHandler;
    this.finishGame;
    this.player;
    this.endGame = function () {};
    this.loop = function () {};
    this.sendMoves = function () {};
    this.timeOut = function () {};
  }

  setLoop(_loop) {
    super.loop = _loop;
  }

  renderizeMaze() {
    super.renderizeMaze();
  }

  renderizeCanvas() {
    super.renderizeCanvas();
  }

  update(_left, _up, _right, _down, _space, _downListener, _upListener) {
    super.update(_left, _up, _right, _down, _space, _downListener, _upListener);
  }

  setWinner(winnerPlayer) {
    this.winner = winnerPlayer;
  }

  setEndGame(fun) {
    super.setEndGame(fun);
  }

  setRequestTimeOut(request) {
    super.setMoveRequest(request);
  }
}
