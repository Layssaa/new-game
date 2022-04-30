export class MazeGenerator
{
    #numberOfRows;
    #numberOfColumns;
    #lastRowIndex;
    #lastColumnIndex;
    #matrix;
    #startTiles;
    #endTile;
    #numberOfPlayers;

    constructor(_numberOfRows, _numberOfColumns, _numberOfPlayers)
    {
        this.#numberOfRows = _numberOfRows;
        this.#numberOfColumns = _numberOfColumns;
        this.#lastRowIndex = this.#numberOfRows - 1;
        this.#lastColumnIndex = this.#numberOfColumns - 1;
        this.#numberOfPlayers = _numberOfPlayers;
    }

    generateMaze()
    {
        this.#generateMatrix();
        this.#renderizeMaze(this.#matrix);
    }

    #generateMatrix()
    {
        let matrix = [];
        let matrixRow = [];

        for (let rowIndex = 0; rowIndex <= this.#lastRowIndex  ; rowIndex++)
        {
            for (let columnIndex = 0; columnIndex <= this.#lastColumnIndex; columnIndex++)
            {

                let tileObject = {
                    row: rowIndex + 1,
                    column: columnIndex + 1,
                    rowIndex: rowIndex,
                    columnIndex: columnIndex,
                    tileType: "path",
                    validDirections: []
                };

                matrixRow.push(tileObject);
            }

            matrix.push(matrixRow);
            matrixRow = [];
        }

        this.#chooseEndTile(matrix);
        this.#chooseStartTile(matrix);

        this.#matrix = matrix;

        console.log(this.#matrix);
        console.log("Start positions are: ", this.#startTiles);
        console.log("End Is: ", this.#endTile);
    }

    #chooseEndTile(_matrix)
    {
        _matrix[this.#lastRowIndex][this.#getRandomNumber(0, this.#lastColumnIndex)].tileType = "end";

        this.#endTile = _matrix[this.#lastRowIndex].find(end => end.tileType === "end");
    }

    #chooseStartTile(_matrix)
    {
        for (let player = 1; player <= this.#numberOfPlayers; player++)
        {
            let numberGetRandomly = this.#getRandomNumber(0, this.#lastColumnIndex);

            if(_matrix[0][numberGetRandomly].tileType === "start")
            {
                player--;
            }

            _matrix[0][numberGetRandomly].tileType = "start";
        }

        this.#startTiles = _matrix[0].filter((_start) => {
            return _start.tileType === "start";
        });
    }

    // method needs goes to front class 
    #renderizeMaze()
    {
        for (let rowIndex = 0; rowIndex <= this.#lastRowIndex; rowIndex++)
        {
            let rowId = `maze-row-${rowIndex}`;

            document.querySelector(`#maze`).appendChild(document.createElement("div")).id = rowId;
            document.querySelector(`#${rowId}`).className = "maze-row";

            for (let columnIndex = 0; columnIndex <= this.#lastColumnIndex; columnIndex++)
            {
                let tileId = `tile-${rowIndex}-${columnIndex}`;
                let currentTile = this.#matrix[rowIndex][columnIndex];
                
                document.querySelector(`#${rowId}`).appendChild(document.createElement("div")).id = tileId;
                document.querySelector(`#${tileId}`).className = "maze-tile";

                if (currentTile.tileType === "start") 
                {
                    document.querySelector(`#${tileId}`).style.backgroundColor = "#f99";
                }
                
                if (currentTile.tileType === "end")
                {
                    document.querySelector(`#${tileId}`).style.backgroundColor = "#9f9";
                }
            }
        }

        this.#createSamplePath();
    }

    // Method needs goes to front
    #createSamplePath()
    {
        for (let startIndex = 0; startIndex < this.#startTiles.length; startIndex++)
        {
            let exitDirection = [];

            for (let directionIndex = 0; directionIndex < 10; directionIndex++)
            {
                exitDirection.push("right");
                exitDirection.push("bottom");
            }

            this.#colorizePath(exitDirection, this.#startTiles[startIndex]);
        }
    }

    // Temporary method for tests
    #colorizePath(_directionArray, _tile)
    {
        for (let directionIndex = 0; directionIndex < _directionArray.length; directionIndex++)
        {
            document.querySelector(`#tile-${_tile.rowIndex}-${_tile.columnIndex}`).style[`border-${_directionArray[directionIndex]}`] = "solid 1px #99f";

            switch(_directionArray[directionIndex])
            {
                case "right":

                    _tile.columnIndex++;

                    document.querySelector(`#tile-${_tile.rowIndex}-${_tile.columnIndex}`).style["border-left"] = "solid 1px #99f";

                    break;
                
                case "bottom":

                    _tile.rowIndex++;

                    document.querySelector(`#tile-${_tile.rowIndex}-${_tile.columnIndex}`).style["border-top"] = "solid 1px #99f";

                    break;
            }

            document.querySelector(`#tile-${_tile.rowIndex}-${_tile.columnIndex}`).style.backgroundColor = "#99f";
        }
    }

    #getRandomNumber(_min, _max)
    {
        let min = _min;
        let max = _max;

        if (_max < _min) 
        {
            min = _max;
            max = _min;
        }

        if (min < 0)
        {
            console.log("Please pass as parameter numbers that are equal or bigger than 0");
            console.log("Number Selected: ", min);
            return;
        }

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}