let pieceInMovement = null;
function changePieceInMovement(value) {
  pieceInMovement = value;
}
class Piece {
  constructor(position, color, name, image) {
    this.position = position;
    this.image = image;
    this.color = color;
    this.name = name;
    this.firstMovement = true;
  }
  renderPiece() {
    const square = document.getElementById(this.position);
    const imageElement = document.createElement("img");
    imageElement.src = this.image;
    imageElement.id = this.name;
    imageElement.addEventListener("click", this.handlePieceMovement);
    imageElement.addEventListener("click", this.showPossibleMovement);

    imageElement.classList.add("piece");

    square.appendChild(imageElement);
    square.classList.remove("emptysqr");
    square.classList.add("occupiedsqr");
  }

  handlePieceMovement(event) {
    let selectedPiece = document.getElementById(event.target.id);
    console.log(event.target);
    event.stopPropagation();
    console.log(selectedPiece.id + " piece clicked");
    document.querySelectorAll(".box").forEach((box) => {
      if (box.classList.contains("activeBox")) {
        box.classList.remove("activeBox");
      }
    });
    selectedPiece.parentElement.classList.add("activeBox");
    pieceInMovement = selectedPiece;
  }

  showPossibleMovement(event) {
    let pieceToMove = document.getElementById(event.target.id);
    let potentialDestination = [];
    // black pawn movement
    if (pieceToMove.id.split("_")[0] === "blackpawn") {
      let numOfSteps = 1;
      let initialSteps = this.firstMovement ? 0 : 1;
      let initisqr = pieceToMove.parentElement.id;
      console.log(initisqr);
      let column = initisqr.split("")[0];
      let row = Number(initisqr.split("")[1]);
      let counter = row + initialSteps;
      console.log(initialSteps);
      for (let index = row; index <= counter; index++) {
        potentialDestination.push(`${column}${index + 1}`);
      }
      document.querySelectorAll(".box").forEach((box) => {
        if (box.classList.contains("possiblesqr")) {
          box.removeChild(box.firstChild);
          box.classList.remove("possiblesqr");
        }
      });
      console.log(potentialDestination);
      potentialDestination.map((destination) => {
        let square = document.getElementById(destination);
        square.classList.add("possiblesqr");
        let icon = document.createElement("img");
        icon.src = "/images/diamonds.png";
        icon.classList.add("possible-sqr-icon");
        square.appendChild(icon);
      });
    }
  }
}

export { Piece, pieceInMovement, changePieceInMovement };
