class ControlGame {
  constructor(_canvas, _context, _keyUpHandler, _keyDownHandler, _matrix) {
    this.matrix = _matrix;
    this.keyUpHandler = _keyUpHandler;
    this.keyDownHandler = _keyDownHandler;
    this.canvas = _canvas;
    this.context = _context;
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.tileSize = 96;
    this.tileSrcSize = 96;
    this.background = new Image();
    this.sapinho = new Image();
    this.bgm = new Audio(
      "https://img.pikbest.com/houzi/audio/original/2020/09/28/e9d3a31f126f972f5217e905ac95c919.mp3"
    );
    this.alfrog = new Audio(
      "https://audio-previews.elements.envatousercontent.com/files/294506401/preview.mp3?response-content-disposition=attachment%3B+filename%3D%225EK8XSM-vibrant-game-frog-item.mp3%22"
    );
    this.finishGame = new Audio(
      "https://pic.pikbest.com/00/50/03/534888piCVWT.mp3"
    );
    this.sendMoves = function () {};
  }

  update(_left, _up, _right, _down, _space, _downListener, _upListener) {
    if (_left && !_right) {
      this.player.x -= this.player.speed;
      this.player.srcY = 32;
      this.doRequest();
    } else if (_right && !_left) {
      this.player.x += this.player.speed;
      this.player.srcY = 0;
      this.doRequest();
    } else if (_up && !_down) {
      this.player.y -= this.player.speed;
      this.doRequest();
    } else if (_down && !_up) {
      this.player.y += this.player.speed;
      this.doRequest();
    } else if (_space) {
      this.player.y -= 7;
      setTimeout(() => {
        this.player.y += 7;
        this.alfrog.play();
        _space = _down = _left = _right = _up = false;
      }, 200);
    }

    for (let i in this.walls) {
      const wall = this.walls[i];
      this.wallCollision(this.player, wall);
    }

    for (let i in this.exits) {
      const exit = this.exits[i];
      this.endCollision(this.player, exit);
    }

    if (this.player.x < this.camera.innerLeftBoundary()) {
      this.camera.x = this.player.x - this.camera.width * 0.25;
    }
    if (this.player.y < this.camera.innerTopBoundary()) {
      this.camera.y = this.player.y - this.camera.height * 0.25;
    }
    if (this.player.x + this.player.width > this.camera.innerRightBoundary()) {
      this.camera.x =
        this.player.x + this.player.width - this.camera.width * 0.75;
    }
    if (
      this.player.y + this.player.height >
      this.camera.innerBottomBoundary()
    ) {
      this.camera.y =
        this.player.y + this.player.height - this.camera.height * 0.75;
    }
    this.camera.x = Math.max(
      0,
      Math.min(this.mazeWidth - this.camera.width + 150, this.camera.x)
    );
    this.camera.y = Math.max(
      0,
      Math.min(this.mazeHeight - this.camera.height + 150, this.camera.y)
    );

    this.bgm.play();
    this.bgm.loop = true;
  }

  renderizeCanvas() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.save();

    this.context.translate(-this.camera.x, -this.camera.y);

    this.background.src =
      "https://user-images.githubusercontent.com/78851164/166344197-c76f686c-6fa9-4e59-a129-ed67d2dda4b3.png";
    this.sapinho.src =
      "https://user-images.githubusercontent.com/78851164/166346058-ff6fe5a5-3543-459d-8c4c-356b636df9c8.png";

    for (let row in this.matrix) {
      for (let column in this.matrix[row]) {
        const tile = this.matrix[row][column];
        if (tile === 3) {
          const x = column * this.tileSize;
          const y = row * this.tileSize;
          this.context.drawImage(
            this.background,
            0,
            0,
            this.tileSrcSize,
            this.tileSrcSize,
            x,
            y,
            this.tileSize,
            this.tileSize
          );
        } else {
          const x = column * this.tileSize;
          const y = row * this.tileSize;
          this.context.drawImage(
            this.background,
            tile * this.tileSrcSize,
            0,
            this.tileSrcSize,
            this.tileSrcSize,
            x,
            y,
            this.tileSize,
            this.tileSize
          );
        }
      }
    }

    this.context.drawImage(
      this.sapinho,
      this.player.srcX,
      this.player.srcY,
      this.player.width,
      this.player.height,
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height
    );
    this.context.restore();
  }

  renderizeMaze() {
    this.createMaze();
    this.createCamera();
    this.createPlayer();
  }

  createMaze() {
    this.walls = [];
    this.exits = [];
    this.starts = [];

    this.mazeWidth = this.matrix[0].length * this.tileSize;
    this.mazeHeight = this.matrix.length * this.tileSize;

    for (let row in this.matrix) {
      for (let column in this.matrix[row]) {
        const tile = this.matrix[row][column];

        if (tile === 1) {
          const wall = {
            x: this.tileSize * column,
            y: this.tileSize * row,
            width: this.tileSize,
            height: this.tileSize,
          };

          this.walls.push(wall);
        }

        if (tile === 2) {
          const exit = {
            x: this.tileSize * column,
            y: this.tileSize * row,
            width: this.tileSize,
            height: this.tileSize,
          };

          this.exits.push(exit);
        }

        if (tile === 3) {
          const start = {
            x: this.tileSize * column,
            y: this.tileSize * row,
            width: this.tileSize,
            height: this.tileSize,
          };

          this.starts.push(start);
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
      x:
        this.starts[this.startRandom].x +
        (this.tileSize / 2 - this.tileSize / 4),
      y:
        this.starts[this.startRandom].y +
        (this.tileSize / 2 - this.tileSize / 4),
      width: 32,
      height: 32,
      speed: 5,
      srcX: 0,
      srcY: 0,
    };
  }

  wallCollision(objA, objB) {
    const distX = objA.x + objA.width / 2 - (objB.x + objB.width / 2);
    const distY = objA.y + objA.height / 2 - (objB.y + objB.height / 2);

    const sumWidth = (objA.width + objB.width) / 2;
    const sumHeight = (objA.height + objB.height) / 2;

    if (Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight) {
      const overlapX = sumWidth - Math.abs(distX);
      const overlapY = sumHeight - Math.abs(distY);

      if (overlapX > overlapY) {
        objA.y = distY > 0 ? objA.y + overlapY : objA.y - overlapY;
      } else {
        objA.x = distX > 0 ? objA.x + overlapX : objA.x - overlapX;
      }
    }
  }

  endCollision(objA, objB) {
    if (this.winner) {
      return;
    }

    const distX = objA.x + objA.width / 2 - (objB.x + objB.width / 2);
    const distY = objA.y + objA.height / 2 - (objB.y + objB.height / 2);

    const sumWidth = (objA.width + objB.width) / 2;
    const sumHeight = (objA.height + objB.height) / 2;

    if (Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight) {
      const overlapX = sumWidth - Math.abs(distX);
      const overlapY = sumHeight - Math.abs(distY);

      if (overlapX > overlapY || !(overlapX > overlapY)) {
        this.keyBlocker();
        this.setWinner("idMock");
      }
    }
  }

  selectStart() {
    this.startRandom = Math.floor(Math.random() * this.starts.length);
  }

  keyBlocker() {
    window.removeEventListener("keyup", this.keyUpHandler);
    window.removeEventListener("keydown", this.keyDownHandler);
    this.finishGame.play();
    console.log("ganhouu");
    this.endGame();
  }

  setEndGame(fun) {
    this.endGame = fun;
  }

  doRequest() {
    clearTimeout(this.timeOut);

    this.moves.push([this.player.x, this.player.y]);

    this.timeOut = setTimeout(this.sendMoves(this.moves), 200);
  }

  setMoveRequest(fun) {
    this.sendMoves = fun;
  }
}

export { ControlGame };
