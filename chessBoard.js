import { pieceInMovement, changePieceInMovement } from "./Pieces.js";
class Board {
  constructor() {
    this.sqrArray = [];
    this.numbering = [8, 7, 6, 5, 4, 3, 2, 1];
    this.letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    this.coloredBox = [
      "b8",
      "d8",
      "f8",
      "h8",
      "a7",
      "c7",
      "e7",
      "g7",
      "b6",
      "d6",
      "f6",
      "h6",
      "a5",
      "c5",
      "e5",
      "g5",
      "b4",
      "d4",
      "f4",
      "h4",
      "a3",
      "c3",
      "e3",
      "g3",
      "b2",
      "d2",
      "f2",
      "h2",
      "a1",
      "c1",
      "e1",
      "g1",
    ];
  }

  renderChessBoard() {
    const board = document.getElementById("board");
    for (let index = 0; index < this.numbering.length; index++) {
      for (let j = 0; j < this.letters.length; j++) {
        this.sqrArray.push(`${this.letters[j]}${this.numbering[index]}`);
      }
    }
    this.sqrArray.map((item) => {
      let sqr = document.createElement("div");
      board.appendChild(sqr);
      sqr.classList.add(`box`);
      sqr.classList.add("emptysqr");
      sqr.setAttribute("id", item);
      sqr.addEventListener("click", this.handlePieceMovementEnd);
      this.coloredBox.includes(item)
        ? sqr.classList.add(`blackbox`)
        : sqr.classList.add(`whitebox`);
    });
  }
  handlePieceMovementEnd(event) {
    if (pieceInMovement) {
      const classes = pieceInMovement.parentElement.classList;
      classes.remove("occupiedsqr");
      classes.add("emptysqr");
      if (event.target.classList.contains("possiblesqr")) {
        document.querySelectorAll(".box").forEach((box) => {
          if (box.classList.contains("possiblesqr")) {
            box.removeChild(box.firstChild);
            box.classList.remove("possiblesqr");
          }
        });
        event.target.appendChild(pieceInMovement);
        event.target.classList.add("occupiedsqr");
        event.target.classList.remove("emptysqr");
        console.log(pieceInMovement.id + " piece moved");
        classes.remove("activeBox");
        changePieceInMovement(null);
      }
    }
  }
}

export { Board };
