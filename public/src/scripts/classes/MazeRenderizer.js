// column + 1 = right
// column - 1 = left
// row + 1 = bottom
// row - 1 = top

export class MazeRenderizer
{
    #matrix;
    #path;

    constructor(_matrix, _path)
    {
        this.#matrix = _matrix;
        this.#path = _path;
    }

    renderizeMaze()
    {
        this.#renderizeGrid();
        this.#removeWalls();
    }

    #renderizeGrid()
    {
        for (let rowIndex = 0; rowIndex < this.#matrix.length; rowIndex++)
        {
            let rowId = `maze-row-${rowIndex}`;

            document.querySelector(`#maze`).appendChild(document.createElement("div")).id = rowId;
            document.querySelector(`#${rowId}`).className = "maze-row";

            for (let columnIndex = 0; columnIndex < this.#matrix[rowIndex].length; columnIndex++)
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
    }

    #removeWalls()
    {
        let currentTile = this.#matrix[0].find(tile => tile.tileType === "start");

        for (let pathIndex = 0; pathIndex < this.#path.length; pathIndex++)
        {
            document.querySelector(`#tile-${currentTile.rowIndex}-${currentTile.columnIndex}`).style[`border-${this.#path[pathIndex]}`] = "solid 3px white";

            switch (this.#path[pathIndex])
            {
                case "right":
                    currentTile = this.#matrix[currentTile.rowIndex][currentTile.columnIndex + 1];
                    document.querySelector(`#tile-${currentTile.rowIndex}-${currentTile.columnIndex}`).style["border-left"] = "solid 3px white";
                    break;

                case "bottom":
                    currentTile = this.#matrix[currentTile.rowIndex + 1][currentTile.columnIndex];
                    document.querySelector(`#tile-${currentTile.rowIndex}-${currentTile.columnIndex}`).style["border-top"] = "solid 3px white";
                    break;

                case "left":
                    currentTile = this.#matrix[currentTile.rowIndex][currentTile.columnIndex - 1];
                    document.querySelector(`#tile-${currentTile.rowIndex}-${currentTile.columnIndex}`).style["border-right"] = "solid 3px white";
                    break;

                case "top":
                    currentTile = this.#matrix[currentTile.rowIndex - 1][currentTile.columnIndex];
                    document.querySelector(`#tile-${currentTile.rowIndex}-${currentTile.columnIndex}`).style["border-bottom"] = "solid 3px white";
                    break;
            }
        }
    }
}