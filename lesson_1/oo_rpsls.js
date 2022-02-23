const readlineSync = require('readline-sync');

const RPSLSGame = {
  gameTitle: 'Rock Paper Scissors Lizard Spock',
  screenWidth: 80,
  prompt: '=>',
  matchesPlayed: 0,
  match: createMatch(),
  possibleMoves: {
    rock: {
      validMoves: ['r', 'ro', 'rock'],
      winsAgainst: ['scissors', 'lizard'],
    },
    paper: {
      validMoves: ['p', 'pa', 'paper'],
      winsAgainst: ['rock', 'spock'],
    },
    scissors: {
      validMoves: ['sc', 'scissors'],
      winsAgainst: ['paper', 'lizard'],
    },
    lizard: {
      validMoves: ['l', 'li', 'lizard'],
      winsAgainst: ['spock', 'paper'],
    },
    spock: {
      validMoves: ['sp', 'spock'],
      winsAgainst: ['rock', 'scissors'],
    },
  },
  playAgainChoices: {
    yes: ['y', 'yes'],
    no: ['n', 'no'],
  },
  playAgain: null,

  formatComputerMessage(string) {
    let formattedSentences = [];
    let currentSentence = '';

    string.split(' ').forEach(word => {
      if ((currentSentence + word).length > this.screenWidth) {
        formattedSentences.push(currentSentence);
        currentSentence = '';
      }
      currentSentence += ((!currentSentence) ? this.prompt + ' ' : '') + word + ' ';
    });

    formattedSentences.push(currentSentence);
    return formattedSentences.join('\n');
  },

  centerText(string, width) {
    if (!width) width = RPSLSGame.screenWidth;

    let padding = (width - string.length) / 2;

    if (string.length % 2 === 1) {
      return ' '.repeat(padding - 1) + string + ' '.repeat(padding + 1); // total of additional numbers needs to be 0
    } else {
      return ' '.repeat(padding - 1) + string + ' '.repeat(padding); // total of additional numbers needs to be -1
    }
  },

  drawLine() {
    console.log('-'.repeat(this.screenWidth));
  },

  pressEnterToContinue() {
    readlineSync.question(this.formatComputerMessage('Press Enter to continue...'));
  },

  displayWelcomeMessage() {
    console.clear();
    this.drawLine();
    console.log(this.centerText(`Welcome to ${this.gameTitle}!`));
    this.drawLine();
    console.log(this.formatComputerMessage('You will be playing against the computer.'));
    console.log('');
    console.log(this.formatComputerMessage(`You can pick either ${this.validMovesAsString()}.`));
    console.log('');
    console.log(this.formatComputerMessage('"Scissors cuts paper, paper covers rock, rock crushes lizard, lizard poisons Spock, Spock smashes scissors, scissors decapitates lizard, lizard eats paper, paper disproves Spock, Spock vaporizes rock, and as it always has, rock crushes scissors." - Sheldon Cooper'));
    console.log('');
    console.log(this.formatComputerMessage(`The first to win ${this.match.winsNeededToWinMatch} rounds wins the match!`));
    this.drawLine();
    this.pressEnterToContinue();
  },

  validMovesAsString() {
    let validMoves = [];
    for (let move in this.possibleMoves) {
      validMoves.push(`${move} (${this.joinOr(this.addQuotationMarks(this.possibleMoves[move].validMoves))})`);
    }
    return this.joinOr(validMoves);
  },

  joinOr(array) {
    switch (array.length) {
      case 1: return array[0];
      case 2: return array[0] + ' or ' + array[1];
      default: return (array.slice(0, array.length - 1).join(', ')) + ' or ' + array[array.length - 1];
    }
  },

  addQuotationMarks(array) {
    return array.map(element => `'${element}'`);
  },

  updateMatchesPlayed() {
    this.matchesPlayed += 1;
  },

  getPlayAgain() {
    let choice;
    while (true) {
      console.log(this.formatComputerMessage('Would you like to play another match?'));
      choice = readlineSync.prompt();
      if (this.isValidPlayAgainChoice(choice.toLowerCase())) break;
      console.log(this.formatComputerMessage(`'${choice}' is not a valid choice. Please choose ${this.validPlayAgainChoicesAsString()}.`));
    }
    this.playAgain = this.playAgainChoices.yes.includes(choice.toLowerCase()) ? 'yes' : 'no';
  },

  validPlayAgainChoicesAsString() {
    let resultArray = [];
    for (let choice in this.playAgainChoices) {
      resultArray.push(`${this.joinOr(this.addQuotationMarks(this.playAgainChoices[choice]))} for ${choice}`);
    }
    return this.joinOr(resultArray);
  },

  isValidPlayAgainChoice(choice) {
    let possibleChoices = Object.values(this.playAgainChoices);
    return possibleChoices.some(choices => choices.includes(choice));
  },

  displayGoodbyeMessage() {
    console.log(this.formatComputerMessage(`Thank you for playing ${this.gameTitle}!`));
    console.log(this.formatComputerMessage(`You played ${this.matchesPlayed} ${this.matchOrMatches(this.matchesPlayed)}.`));
  },

  matchOrMatches(number) {
    return number === 1 ? 'match' : 'matches';
  },

  play() {
    do {
      if (this.matchesPlayed === 0) this.displayWelcomeMessage();
      this.match.playMatch();
      this.updateMatchesPlayed();
      this.getPlayAgain();
      this.match = createMatch();
    } while (this.playAgain === 'yes');

    this.displayGoodbyeMessage();
  }
};

// eslint-disable-next-line max-lines-per-function
function createMatch() {
  return {
    roundHistory: [],
    round: createRound(),
    winsNeededToWinMatch: 5,
    matchWinner: null,

    calculateRoundsWon(string) {
      return this.roundHistory.filter(round => {
        return round.roundWinner === string;
      }).length;
    },

    displayRoundHistory() {
      console.clear();
      RPSLSGame.drawLine();
      console.log(this.scoreBoard());
      RPSLSGame.drawLine();
      console.log(this.roundHistoryTitle());
      RPSLSGame.drawLine();
      console.log(this.roundHistoryTopRow());
      RPSLSGame.drawLine();
      console.log(this.roundHistoryIndividualRows());
      RPSLSGame.drawLine();
    },

    scoreBoard() {
      return `Rounds Human Won: ${this.calculateRoundsWon('human')}\n` +
             `Rounds Computer Won: ${this.calculateRoundsWon('computer')}\n` +
             `Number of Ties: ${this.calculateRoundsWon('tie')}`;
    },

    roundHistoryTitle() {
      return RPSLSGame.centerText('ROUND HISTORY');
    },

    roundHistoryTopRow() {
      let columnWidth = RPSLSGame.screenWidth / 4;
      return RPSLSGame.centerText('ROUND #', columnWidth) + '|' +
             RPSLSGame.centerText('HUMAN MOVE', columnWidth) + '|' +
             RPSLSGame.centerText('COMPUTER MOVE', columnWidth) + '|' +
             RPSLSGame.centerText('WINNER', columnWidth);
    },

    roundHistoryIndividualRows() {
      let columnWidth = RPSLSGame.screenWidth / 4;
      let resultString = '';
      this.roundHistory.forEach(round => {
        resultString += RPSLSGame.centerText(String(round.roundNumber), columnWidth) + '|' +
                        RPSLSGame.centerText(round.humanMove.toUpperCase(), columnWidth) + '|' +
                        RPSLSGame.centerText(round.computerMove.toUpperCase(), columnWidth) + '|' +
                        RPSLSGame.centerText(round.roundWinner.toUpperCase(), columnWidth) + '\n';
      });
      return resultString.trimEnd();
    },

    updateRoundHistory() {
      this.roundHistory.push({
        roundNumber: this.roundHistory.length + 1,
        humanMove: this.round.human.move,
        computerMove: this.round.computer.move,
        roundWinner: this.round.roundWinner,
      });
    },

    calculateMatchWinner() {
      this.matchWinner = this.calculateRoundsWon('human') === this.winsNeededToWinMatch ? 'human' : 'computer';
    },

    displayMatchWinner() {
      if (this.matchWinner === 'human') {
        console.log(RPSLSGame.formatComputerMessage('Congratulations, you won the match!'));
      } else {
        console.log(RPSLSGame.formatComputerMessage('The computer won the match, better luck next time.'));
      }
    },

    playMatch() {
      while (this.calculateRoundsWon('human') < this.winsNeededToWinMatch && this.calculateRoundsWon('computer') < this.winsNeededToWinMatch) {
        this.displayRoundHistory();
        this.round.playRound();
        this.updateRoundHistory();
      }
      this.displayRoundHistory();
      this.calculateMatchWinner();
      this.displayMatchWinner();
    }
  };
}

// eslint-disable-next-line max-lines-per-function
function createRound() {
  return {
    human: createHuman(),
    computer: createComputer(),
    roundWinner: null,

    displayMoves() {
      console.log(RPSLSGame.formatComputerMessage(`You chose ${this.human.move.toUpperCase()}.`));
      console.log(RPSLSGame.formatComputerMessage(`The computer chose ${this.computer.move.toUpperCase()}.`));
    },

    calculateRoundWinner() {
      if (this.human.move === this.computer.move) {
        this.roundWinner = 'tie';
      } else if (RPSLSGame.possibleMoves[this.human.move]
        .winsAgainst.includes(this.computer.move)) {
        this.roundWinner = 'human';
      } else {
        this.roundWinner = 'computer';
      }
    },

    displayRoundWinner() {
      switch (this.roundWinner) {
        case 'human':
          console.log(RPSLSGame.formatComputerMessage('You won this round!'));
          break;
        case 'computer':
          console.log(RPSLSGame.formatComputerMessage('The computer won this round.'));
          break;
        case 'tie':
          console.log(RPSLSGame.formatComputerMessage('It\'s a tie.'));
          break;
      }
    },

    playRound() {
      this.human.getMove();
      this.computer.calculateMove();
      this.displayMoves();
      RPSLSGame.drawLine();
      this.calculateRoundWinner();
      this.displayRoundWinner();
      RPSLSGame.pressEnterToContinue();
    },
  };
}

function createPlayer() {
  return {
    move: null,
  };
}

// eslint-disable-next-line max-lines-per-function
function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    getMove() {
      let move;
      while (true) {
        console.log(RPSLSGame.formatComputerMessage(`Please make your move. You can choose ${RPSLSGame.joinOr(Object.keys(RPSLSGame.possibleMoves))}.`));
        move = readlineSync.prompt();
        if (this.isValidMove(move.toLowerCase())) break;
        console.log(RPSLSGame.formatComputerMessage(`'${move}' is not a valid move. Please choose ${RPSLSGame.validMovesAsString()}.`));
      }
      this.move = this.convertMoveToFullWord(move.toLowerCase());
    },

    isValidMove(move) {
      let validMoves = [];
      for (let move in RPSLSGame.possibleMoves) {
        validMoves.push(...RPSLSGame.possibleMoves[move].validMoves);
      }
      return validMoves.includes(move);
    },

    convertMoveToFullWord(humanMove) {
      let fullLengthMove;
      for (let move in RPSLSGame.possibleMoves) {
        if (RPSLSGame.possibleMoves[move].validMoves.includes(humanMove)) {
          fullLengthMove = move;
        }
      }
      return fullLengthMove;
    },
  };

  return Object.assign(playerObject, humanObject);
}

// eslint-disable-next-line max-lines-per-function
function createComputer() {

  let playerObject = createPlayer();

  let computerObject = {
    winTable: {
      rock: {timesChosen: 0, wins: 0, loss: 0, winRate: 0, lossRate: 0},
      paper: {timesChosen: 0, wins: 0, loss: 0, winRate: 0, lossRate: 0},
      scissors: {timesChosen: 0, wins: 0, loss: 0, winRate: 0, lossRate: 0},
      lizard: {timesChosen: 0, wins: 0, loss: 0, winRate: 0, lossRate: 0},
      spock: {timesChosen: 0, wins: 0, loss: 0, winRate: 0, lossRate: 0}
    },
    winRateThreshold: 60,
    lossRateThreshold: 60,

    updateWinTable() {
      let roundHistory = RPSLSGame.match.roundHistory;
      let lastRound = roundHistory[roundHistory.length - 1];

      if (lastRound) {
        this.winTable[lastRound.computerMove].timesChosen += 1;
        if (lastRound.roundWinner === 'computer') this.winTable[lastRound.computerMove].wins += 1;
        if (lastRound.roundWinner === 'human') this.winTable[lastRound.computerMove].loss += 1;
      }

      for (let move in this.winTable) {
        if (this.winTable[move].timesChosen) {
          this.winTable[move].winRate =
          this.winTable[move].wins / this.winTable[move].timesChosen * 100;
          this.winTable[move].lossRate =
          this.winTable[move].loss / this.winTable[move].timesChosen * 100;
        }
      }
    },

    calculateMove() {
      this.updateWinTable();
      let possibleMoves = [];

      for (let move in this.winTable) {
        if (this.winTable[move].winRate > this.winRateThreshold) {
          this.addMoveToPossibleMoves(possibleMoves, move, 3);
        } else if (this.winTable[move].lossRate > this.lossRateThreshold) {
          this.addMoveToPossibleMoves(possibleMoves, move, 1);
        } else {
          this.addMoveToPossibleMoves(possibleMoves, move, 2);
        }
      }

      let randomIndex = Math.floor(Math.random() * possibleMoves.length);
      this.move = possibleMoves[randomIndex];
    },

    addMoveToPossibleMoves(possibleMoves, move, numberOfTimes) {
      for (let counter = 1; counter <= numberOfTimes; counter += 1) {
        possibleMoves.push(move);
      }
    },
  };

  return Object.assign(playerObject, computerObject);
}

RPSLSGame.play();