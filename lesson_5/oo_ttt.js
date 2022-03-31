class Square {
  constructor(marker = " ") {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }
}

Square.UNUSED_SQUARE = " ";
Square.HUMAN_MARKER = "X";
Square.COMPUTER_MARKER = "O";

class Board {
  constructor() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
    }
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }
}



class Row {
  constructor() {

  }
}

class Marker {
  constructor() {

  }
}

class Player {
  constructor() {

  }

  mark() {

  }

  play() {

  }
}

class Human extends Player {
  constructor() {

  }
}

class Computer extends Player {
  constructor() {

  }
}

class TTTGame {
  constructor() {
    this.board = new Board();
  }

  play() {

    this.displayWelcomeMessage();

    while (true) {
      this.board.display();

      this.firstPlayerMoves();
      if (this.gameOver()) break;

      this.secondPlayerMoves();
      if (this.gameOver()) break;
      break;
    }

    this.displayResults();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.log("Welcome to Tic Tac Toe!");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {

  }

  firstPlayerMoves() {

  }

  secondPlayerMoves() {

  }

  gameOver() {
    return false;
  }
}

let game = new TTTGame();
game.play();