export class MatrixGenerator
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

    getMatrix()
    {
        this.#generateMatrix();
        return this.#matrix;
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
                    validDirections: [],
                    visited: false
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
            console.log("Please pass as parameter numbers that  are equal or bigger than 0");
            console.log("Number Selected: ", min);
            return;
        }

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}