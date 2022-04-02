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


I will use constructor and prototype

ScoreBoard
  States:
    roundNumber:
    playerWins:
    computerWins:
    ties:
  displayScoreBoard();

GameBoard
  State of Board (free tiles, computer tiles, human titles)
  displayBoard()

ComputerPlayer
  Computer Marker
  computerMakesMove() (this depend on and changes the state of Board);
  offensiveMove()
  defensiveMove()
  pickCentreSquare()
  pickRandomSquare()

HumanPlayer
  Human Marker
  Picks move (this depends on and changes the state of Board)

Match
  // The first to win 3 games wins the match.
  // The program terminates after the match is won or lost.

  displayWelcomeMessage()
  display rounds won (computer, player, tie)
  displayGoodbyeMessage
  play()
    displayWelcomeMessage
    scoreBoard = new ScoreBoard();
    human = new HumanPlayer();
    computer = new ComputerPlayer();
    while(scoreBoard.humanWins < 3 || scoreBoard.computerWins < 3) {
      round = new Round();
      round.play();
    }

Round
   // Players have to choose [y, yes, n, no] if they want to play the next game.
    // No terminates the program.
    // Yes plays the next game

    roundWinner()

    play()
      while(true) {
        human makes move
        break if roundWinner()
        computer makes move
        break if roundWinner()
      }
      playAgain = getPlayAgain()
      if playAgain === n
        terminate program??
        where should I iterate the scoreboard? How can I access scoreboard from inside Round?
        how do I alternate players? Can I use scoreBoard.roundNumber to alternate players?

*/

game = new Match();
game.play();