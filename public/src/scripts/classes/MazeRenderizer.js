export class MazeRenderizer
{
    #matrix;

    constructor(_matrix)
    {
        this.#matrix = _matrix;
    }

    renderizeMaze()
    {
        this.#renderizeMaze();
    }

    #renderizeMaze()
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
}