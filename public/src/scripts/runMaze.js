import { MatrixGenerator } from "./classes/MatrixGenerator.js";
import { MazeRenderizer } from "./classes/MazeRenderizer.js";
import { PathCreator } from "./classes/PathCreator.js";

const mazeMatrix = new MatrixGenerator(13, 13, 2);
const matrix = mazeMatrix.getMatrix();



const maze = new MazeRenderizer(matrix);
maze.renderizeMaze();