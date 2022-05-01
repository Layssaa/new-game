export class MazeRenderizer
{
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

    constructor(_canvas, _context)
    {
        this.canvas = _canvas;
        this.context = _context;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.tileSize = 192;
    }

    renderizeMaze()
    {
        this.createMaze();
        this.createCamera();
        requestAnimationFrame(this.renderizeCanvas, this.canvas);
    }

    renderizeCanvas()
    {
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
    }

    createMaze()
    {
        this.matrix = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        this.walls = [];
        this.exits = [];

        this.mazeWidth = this.matrix[0].length * this.tileSize;
        this.mazeHeight = this.matrix.length * this.tileSize;

        for (let row in this.matrix)
        {
            for (let column in this.matrix[row])
            {
                let tile = this.matrix[row][column];

                if (tile === 1)
                {
                    let wall = {
                        x: this.tileSize * column,
                        y: this.tileSize * row,
                        width: this.tileSize,
                        height: this.tileSize
                    };

                    this.walls.push(wall);
                }

                if (tile === 2)
                {
                    let exit = {
                        x: this.tileSize * column,
                        y: this.tileSize * row,
                        width: this.tileSize,
                        height: this.tileSize
                    };

                    this.exits.push(exit);
                }
            }
        }

        this.selectStart();
    }

    createCamera()
    {
        this.camera = {
            x: 0,
            y: 0,
            width: this.canvasWidth,
            height: this.canvasHeight,
            innerLeftBoundary: function(){
                return this.x + (this.width*0.25);
            },
            innerTopBoundary: function(){
                return this.y + (this.height*0.25);
            },
            innerRightBoundary: function(){
                return this.x + (this.width*0.75);
            },
            innerBottomBoundary: function(){
                return this.y + (this.height*0.75);
            }
        };
    }

    this

    selectStart()
    {
        this.starts = [
            {
               x: this.tileSize * 2,
               y: this.tileSize * 2
            },
    
            {
               x: this.tileSize * 2,
               y: this.tileSize * 11
            },
    
            {
               x: this.tileSize * 6,
               y: this.tileSize * 2
            },
    
            {
               x: this.tileSize * 6,
               y: this.tileSize * 7
            },
    
            {
               x: this.tileSize * 11,
               y: this.tileSize * 6
            },
    
            {
               x: this.tileSize * 2,
               y: this.tileSize * 2
            }
        ];

        this.startRandom = Math.floor(Math.random() * this.starts.length);
    }
}