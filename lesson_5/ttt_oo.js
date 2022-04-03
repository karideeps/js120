/*
Game design:
[] The program should display the welcome message before the first game starts. It should never display the message again.
[] The program should display the results after each game ends, but before asking whether the human player wants to play again.
[] After the game ends, the program should ask the human player whether they want to play again. If they do, then the program should start a new game of TTT. Otherwise, it should end the program.
[] Keep score by tracking how many times the player and computer each win. Don't use global or static variables. The first player to reach 3 wins is the winner of the match. Be sure to report the current score after each game, and make it clear when a player wins the match. For simplicity, end the program after playing one full match. You don't need a "play again" question for the match, just for individual games.
[] Change the game so that the human and computer take turns going first during a match. When the human goes first in one game, the computer should go first in the next, and vice versa. Don't worry about swapping the player's markers for each game: the human can always use `X` while the computer uses `O`.
[] The program should display the goodbye message when the human player decides that he doesn't want to play again. It should never display the goodbye message before that.

[] Computer choices:
  If any square is a potential winner, pick that square
  Else if any square is at risk, pick that square
  Else if the center square (5) is empty, pick it
  Else pick a random square

Minor revisions:
[] The program should accept `y` `yes` or `n`, `no` (in lowercase or uppercase) as valid answers at the "play again"; all other answers are invalid.

Use Classes to create this program

ScoreBoard
  this.playerWins = 0
  this.computerWins = 0
  this.ties = 0

  displayScoreBoard();

Square
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = 'X';
  static COMPUTER_MARKER = 'O';

GameBoard
  this.squares = {
  }
  use a loop to create this object

  displayBoard();
  reset();

Computer
  static MARKER = 'O'
  computerMakesMove() (this depend on and changes the state of Board);
  offensiveMove()
  defensiveMove()
  pickCentreSquare()
  pickRandomSquare()

Human
  static MARKER = 'X'
  Picks move (this depends on and changes the state of Board)

Match
  // The first to win 3 games wins the match.
  // The program terminates after the match is won or lost.

  static WINS_NEEDED_TO_WIN_MATCH = 3

  this.scoreBoard = new ScoreBoard();
  this.human = new HumanPlayer();
  this.computer = new ComputerPlayer();
  this.round = new Round();

  displayWelcomeMessage()
  display rounds won (computer, player, tie)
  displayGoodbyeMessage()
  getPlayAgain()
  iterateScoreBoard()
  play()
    displayWelcomeMessage
    while(this.scoreBoard.humanWins < Match.WINS_NEEDED_TO_WIN_MATCH && scoreBoard.computerWins < 3) {
      round.play();
      iterateScoreBoard(this.round.winner)
      playAgain = getPlayAgain();
      if (playAgain === 'n' or 'no') break
    }
    displayGoodbyeMessage()


Round
  static POSSIBLE_WINNING_ROWS = []

  this.roundNumber = 1;
  this.gameBoard = new GameBoard();
  this.winner  = null;

  calculateRoundWinner()

  play()
    while(true) {
      if (roundNumber is odd) {
        human makes move
        break if roundWinner()
        computer makes move
        break if roundWinner(/)
      }

      if (roundNumber is even) {
        computer makes move
        break if roundWinner()
        human makes move
        break if roundWinner()
      }
    }

    this.winner = calculateRoundWinner()
    gameBoard.reset();

Does the logic of Round work? How will I create
Fix logic behind players alternating per turn.


*/

// game = new Match();
// game.play();