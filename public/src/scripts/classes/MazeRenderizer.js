import { move, keys } from "../runMazeIsa";

export class Game {
  canvas;
  context;
  canvasWidth;
  canvasHeight;
  matrix;
  mazeWidth;
  mazeHeight;
  tileSize;
  walls;
  exits;
  starts;
  startRandom;
  camera;
  player;
  left;
  up;
  right;
  down;
  moveLeft;
  moveUp;
  moveRight;
  moveDown;
  loop;

  constructor(_canvas, _context) {
    this.canvas = _canvas;
    this.context = _context;
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.tileSize = 192;
    this.left = 37;
    this.up = 38;
    this.right = 39;
    this.down = 40;
    this.moveDown = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.moveUp = false;
    this.loop = function () {};
  }

  renderizeMaze() {
    this.createMaze();
    this.createCamera();
    this.createPlayer();
    this.createPlayerControler();
  }

  renderizeCanvas() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.save();

    this.context.translate(-this.camera.x, -this.camera.y);

    for (let row in this.matrix) {
      for (let column in this.matrix[row]) {
        let tile = this.matrix[row][column];
        if (tile === 1) {
          let x = column * this.tileSize;
          let y = row * this.tileSize;
          this.context.fillRect(x, y, this.tileSize, this.tileSize);
        }
      }
    }

    this.context.fillStyle = "#00f";
    this.context.fillRect(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height
    );
    this.context.restore();
  }

  createMaze() {
    this.matrix = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 2],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    this.walls = [];
    this.exits = [];

    this.mazeWidth = this.matrix[0].length * this.tileSize;
    this.mazeHeight = this.matrix.length * this.tileSize;

    for (let row in this.matrix) {
      for (let column in this.matrix[row]) {
        let tile = this.matrix[row][column];

        if (tile === 1) {
          let wall = {
            x: this.tileSize * column,
            y: this.tileSize * row,
            width: this.tileSize,
            height: this.tileSize,
          };

          this.walls.push(wall);
        }

        if (tile === 2) {
          let exit = {
            x: this.tileSize * column,
            y: this.tileSize * row,
            width: this.tileSize,
            height: this.tileSize,
          };

          this.exits.push(exit);
        }
      }
    }

    this.selectStart();
  }

  createCamera() {
    this.camera = {
      x: 0,
      y: 0,
      width: this.canvasWidth,
      height: this.canvasHeight,
      innerLeftBoundary: function () {
        return this.x + this.width * 0.25;
      },
      innerTopBoundary: function () {
        return this.y + this.height * 0.25;
      },
      innerRightBoundary: function () {
        return this.x + this.width * 0.75;
      },
      innerBottomBoundary: function () {
        return this.y + this.height * 0.75;
      },
    };
  }

  createPlayer() {
    this.player = {
      x: this.starts[this.startRandom].x - (this.tileSize / 2 + 56 / 2),
      y: this.starts[this.startRandom].y - (this.tileSize / 2 + 56 / 2),
      width: this.tileSize / 2,
      height: this.tileSize / 2,
      speed: 8,
    };
  }

  createPlayerControler() {
    window.addEventListener("keydown", this.keyDownHandler, false);
    window.addEventListener("keyup", this.keyUpHandler, false);
  }

  keyDownHandler(_e) {
    let key = _e.keyCode;

    switch (key) {
      case 37:
        this.moveLeft = true;
        break;

      case 38:
        console.log("cima down")
        this.moveUp = true;
        break;

      case 39:
        console.log("direita down")
        this.moveRight = true;
        break;

      case 40:
        console.log("baixo down")
        this.moveDown = true;
        break;
    }
  }

  keyUpHandler(_e) {
    let key = _e.keyCode;
    console.log(key.left, key.right, key.up, key.down);

    switch (key) {
      case this.left:
        console.log("esquerda up")
        this.moveLeft = false;
        break;

      case this.up:
        console.log("cima up")
        this.moveUp = false;
        break;

      case this.right:
        console.log("direita up")
        this.moveRight = false;
        break;

      case 40:
        console.log("baixo up")
        this.moveDown = false;
        break;
    }
  }

  update() {
    console.log(this.moveDown)
    if (this.moveLeft && !this.moveRight) {
      this.player.x -= this.player.speed;
    } else if (this.moveRight && !this.moveLeft) {
      this.player.x += this.player.speed;
    } else if (this.moveUp && !this.moveDown) {
      this.player.y -= this.player.speed;
    } else if (this.moveDown && !this.moveUp) {
      this.player.y += this.player.speed;
    }

    if (this.player.x < this.camera.innerLeftBoundary()) {
      this.camera.x = this.player.x - this.camera.width * 0.25;
    }
    if (this.player.y < this.camera.innerTopBoundary()) {
      this.camera.y = this.player.y - this.camera.height * 0.25;
    }
    if (this.player.x + this.player.width > this.camera.innerRightBoundary()) {
      this.camera.x = this.player.x + this.player.width - this.camera.width * 0.75;
    }
    if (this.player.y + this.player.height > this.camera.innerBottomBoundary()) {
      this.camera.y = this.player.y + this.player.height - this.camera.height * 0.75;
    }
    this.camera.x = Math.max(0, Math.min(this.mazeWidth - this.camera.width + 150, this.camera.x));
    this.camera.y = Math.max(0, Math.min(this.mazeHeight - this.camera.height + 150, this.camera.y));
  }

  selectStart() {
    this.starts = [
      {
        x: this.tileSize * 2,
        y: this.tileSize * 2,
      },

      {
        x: this.tileSize * 2,
        y: this.tileSize * 11,
      },

      {
        x: this.tileSize * 6,
        y: this.tileSize * 2,
      },

      {
        x: this.tileSize * 6,
        y: this.tileSize * 7,
      },

      {
        x: this.tileSize * 11,
        y: this.tileSize * 6,
      },

      {
        x: this.tileSize * 2,
        y: this.tileSize * 2,
      },
    ];

    this.startRandom = Math.floor(Math.random() * this.starts.length);
  }
}
