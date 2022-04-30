import { MatrixGenerator } from "./classes/MatrixGenerator.js";
import { MazeRenderizer } from "./classes/MazeRenderizer.js";
import { PathCreator } from "./classes/PathCreator.js";

const mazeMatrix = new MatrixGenerator(20, 30, 2);
const matrix = mazeMatrix.getMatrix();

const mazePath = new PathCreator(matrix);
const path = mazePath.getPath();

const maze = new MazeRenderizer(matrix, path);
maze.renderizeMaze();