import { Board } from "./chessBoard.js";
import { Piece } from "./Pieces.js";
import { initialPosition } from "./initialPosition.js";
class Engine {
  constructor() {
    this.board = new Board();
    this.initialPosition = initialPosition;
  }
  runGame() {
    this.board.renderChessBoard();
    this.renderAllPiece();
  }
  renderAllPiece() {
    this.initialPosition.map((profile) => {
      const { color, name, image, position } = profile;
      new Piece(position, color, name, image).renderPiece();
    });
  }
}
export { Engine };
