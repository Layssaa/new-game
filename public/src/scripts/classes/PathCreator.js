// column + 1 = right
// column - 1 = left
// row + 1 = bottom
// row - 1 = top

export class PathCreator
{
    #matrix;
    #path;

    constructor(_matrix)
    {
        this.#matrix = _matrix;
    }

    getPath()
    {
        // this.#createPath();
        this.#path = ["right", "right", "right", "bottom", "left", "left", "left", "bottom", "right", "right", "right", "left", "left", "left", "bottom", "right", "left", "bottom", "right", "right", "top"]
        return this.#path;
    }

    #createPath()
    {
        const startTile = this.#matrix[0].find(tile => tile.tileType === "start");


    }
}