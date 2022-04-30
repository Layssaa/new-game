export class MatrixGenerator
{
    #numberOfRows;
    #numberOfColumns;
    #matrix;
    #numberOfPlayers;

    constructor(_numberOfRows, _numberOfColumns, _numberOfPlayers)
    {
        this.#numberOfRows = _numberOfRows;
        this.#numberOfColumns = _numberOfColumns;
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

        for (let rowIndex = 0; rowIndex < this.#numberOfRows; rowIndex++)
        {
            for (let columnIndex = 0; columnIndex < this.#numberOfColumns; columnIndex++)
            {

                let tileObject = {
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
        // matrix[0][0].tileType = "start";
        // matrix[this.#numberOfRows - 1][this.#numberOfColumns - 1].tileType = "end";

        console.log("Start positions are: ", matrix[0][0]);
        console.log("End Is: ", matrix[this.#numberOfRows - 1][this.#numberOfColumns - 1]);

        this.#matrix = matrix;

        console.log("Matrix: ", this.#matrix);
    }

    #chooseEndTile(_matrix)
    {
        _matrix[this.#numberOfRows - 1][this.#getRandomNumber(0, this.#numberOfColumns - 1)].tileType = "end";
    }

    #chooseStartTile(_matrix)
    {
        for (let player = 1; player <= this.#numberOfPlayers; player++)
        {
            let numberGetRandomly = this.#getRandomNumber(0, this.#numberOfColumns - 1);

            if(_matrix[0][numberGetRandomly].tileType === "start")
            {
                player--;
            }

            _matrix[0][numberGetRandomly].tileType = "start";
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
            console.log("Please pass as parameter numbers that  are equal or bigger than 0");
            console.log("Number Selected: ", min);
            return;
        }

        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}