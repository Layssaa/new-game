export class Game {
  constructor(_canvas, _context) {
    this.canvas = _canvas;
    this.context = _context;
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.tileSize = 96;
    this.tileSrcSize = 96;
    this.background = new Image();
    this.sapinho = new Image();
    this.loop = function () {};
    this.fundo = new Audio('https://img.pikbest.com/houzi/audio/original/2020/09/28/e9d3a31f126f972f5217e905ac95c919.mp3');
    this.alfrog = new Audio('https://audio-previews.elements.envatousercontent.com/files/294506401/preview.mp3?response-content-disposition=attachment%3B+filename%3D%225EK8XSM-vibrant-game-frog-item.mp3%22')
  }          

  renderizeMaze() {
    this.createMaze();
    this.createCamera();
    this.createPlayer();
  }

  renderizeCanvas() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.save();

    this.context.translate(-this.camera.x, -this.camera.y);

    this.background.src = 'https://user-images.githubusercontent.com/78851164/166344197-c76f686c-6fa9-4e59-a129-ed67d2dda4b3.png';
    this.sapinho.src = 'https://user-images.githubusercontent.com/78851164/166346058-ff6fe5a5-3543-459d-8c4c-356b636df9c8.png'

    for (let row in this.matrix) {
      for (let column in this.matrix[row]) {
        let tile = this.matrix[row][column];
          let x = column * this.tileSize;
          let y = row * this.tileSize;
          this.context.drawImage(
            this.background,
            tile * this.tileSrcSize, 0, this.tileSrcSize, this.tileSrcSize,
            x, y, this.tileSize, this.tileSize
          );
          
      }
    }

    this.context.drawImage(
      this.sapinho,
      this.player.srcX, this.player.srcY, this.player.width, this.player.height,
      this.player.x, this.player.y, this.player.width, this.player.height
    );
    this.context.restore();
  }

  createMaze() {
    this.matrix = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
      [1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
      [1, 3, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    this.walls = [];
    this.exits = [];
    this.starts = [];

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
            height: this.tileSize
          };

          this.walls.push(wall);
        }

        if (tile === 2) {
          let exit = {
            x: this.tileSize * column,
            y: this.tileSize * row,
            width: this.tileSize,
            height: this.tileSize
          };

          this.exits.push(exit);
        }

        if (tile === 3) {
          let start = {
            x: this.tileSize * column,
            y: this.tileSize * row,
            width: this.tileSize,
            height: this.tileSize
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
      x: this.starts[this.startRandom].x + (this.tileSize / 2 - this.tileSize / 4),
      y: this.starts[this.startRandom].y + (this.tileSize / 2 - this.tileSize / 4),
      width: 32,
      height: 32,
      speed: 10,
      srcX: 0,
      srcY: 0,
    };
  }

  update(_left, _up, _right, _down,  _space, _downListener, _upListener) {
    if (_left && !_right) {
      this.player.x -= this.player.speed;
      this.player.srcY = 32;
    } else if (_right && !_left) {
      this.player.x += this.player.speed;
      this.player.srcY = 0;
    } else if (_up && !_down) {
      this.player.y -= this.player.speed;
    } else if (_down && !_up) {
      this.player.y += this.player.speed;
    } else if(_space){
      this.player.y -= 7;
      setTimeout(() => {
        this.player.y +=7;
        this.alfrog.play();
        _space = _down = _left = _right = _up = false
      }, 200)
    }

    for (let i in this.walls) {
      let wall = this.walls[i];
      this.wallCollision(this.player, wall);
    }

    for(let i in this.exits){
      let exit = this.exits[i];
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

    this.fundo.play();
    this.fundo.loop = true;
  }

  wallCollision(objA, objB) {
    let distX = objA.x + objA.width / 2 - (objB.x + objB.width / 2);
    let distY = objA.y + objA.height / 2 - (objB.y + objB.height / 2);

    let sumWidth = (objA.width + objB.width) / 2;
    let sumHeight = (objA.height + objB.height) / 2;

    if (Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight) {
      let overlapX = sumWidth - Math.abs(distX);
      let overlapY = sumHeight - Math.abs(distY);

      if (overlapX > overlapY) {
        objA.y = distY > 0 ? objA.y + overlapY : objA.y - overlapY;
      } else {
        objA.x = distX > 0 ? objA.x + overlapX : objA.x - overlapX;
      }
    }
  }

  endCollision(objA, objB) {
    let distX = objA.x + objA.width / 2 - (objB.x + objB.width / 2);
    let distY = objA.y + objA.height / 2 - (objB.y + objB.height / 2);

    let sumWidth = (objA.width + objB.width) / 2;
    let sumHeight = (objA.height + objB.height) / 2;

    if (Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight) {
      let overlapX = sumWidth - Math.abs(distX);
      let overlapY = sumHeight - Math.abs(distY);

      if (overlapX > overlapY || !(overlapX > overlapY)) {
        window.removeEventListener("keyup");
        window.removeEventListener("keydown");
      }
    }
  }

  selectStart() {
    this.startRandom = Math.floor(Math.random() * this.starts.length);
  }
}
