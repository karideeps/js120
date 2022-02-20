const readlineSync = require('readline-sync');

const SCREEN_WIDTH = 80;

const PROMPT = '=>';

function pressEnterToContinue() {
  readlineSync.question(`${PROMPT} Press Enter to continue...`);
}

function formatComputerMessage(string) {
  let formattedSentences = [];
  let currentSentence = '';

  string.split(' ').forEach(word => {
    if ((currentSentence + word).length > SCREEN_WIDTH) {
      formattedSentences.push(currentSentence);
      currentSentence = '';
    }
    currentSentence += ((!currentSentence) ? PROMPT + ' ' : '') + word + ' ';
  });

  formattedSentences.push(currentSentence);

  return formattedSentences.join('\n');
}

function centerText(string) {
  let padding = (SCREEN_WIDTH - string.length) / 2;
  return ' '.repeat(padding) + string;
}

function drawLine() {
  console.log('-'.repeat(SCREEN_WIDTH));
}

function createMatch() {
  return {
    roundHistory: [],
    round: createRound(),
    winsNeededToWinMatch: 5,
    matchWinner: null,

    playMatch() {
      // to do;
    }
  };
}

function createRound() {
  return {

  };
}

const RPSLSGame = {
  gameTitle: 'Rock, Paper, Scissors, Lizard, Spock',
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

  displayWelcomeMessage() {
    console.clear();
    drawLine();
    console.log(centerText(`Welcome to ${this.gameTitle}!`));
    drawLine();
    console.log(formatComputerMessage(`You can pick either ${this.validMovesAsString()}.`));
    console.log('');
    console.log(formatComputerMessage('"Scissors cuts paper, paper covers rock, rock crushes lizard, lizard poisons Spock, Spock smashes scissors, scissors decapitates lizard, lizard eats paper, paper disproves Spock, Spock vaporizes rock, and as it always has, rock crushes scissors." - Sheldon Cooper'));
    console.log('');
    console.log(formatComputerMessage(`The first to win ${this.match.winsNeededToWinMatch} rounds wins the match!`));
    drawLine();
    pressEnterToContinue();
  },

  validMovesAsString() {
    let resultArray = [];
    for (let move in this.possibleMoves) {
      resultArray.push(`${move} (${this.joinOr(this.addQuotationMarks(this.possibleMoves[move].validMoves))})`);
    }
    return this.joinOr(resultArray);
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
    while (!this.isValidPlayAgainChoice(choice)) {
      console.log(formatComputerMessage(`Would you like to play another match? ${this.validPlayAgainChoicesAsString()}.`));
      choice = readlineSync.question().toLowerCase();
    }

    this.playAgain = this.playAgainChoices.yes.includes(choice) ? 'yes' : 'no';
  },

  isValidPlayAgainChoice(choice) {
    let possibleChoices = Object.values(this.playAgainChoices);
    return possibleChoices.some(choices => choices.includes(choice));
  },

  validPlayAgainChoicesAsString() {
    let resultArray = [];
    for (let choice in this.playAgainChoices) {
      resultArray.push(`${this.joinOr(this.addQuotationMarks(this.playAgainChoices[choice]))} for ${choice}`);
    }
    return this.joinOr(resultArray);
  },

  displayGoodbyeMessage() {
    console.log(formatComputerMessage(`Thank you for playing ${this.gameTitle}!`));
    console.log(formatComputerMessage(`You played ${this.matchesPlayed} ${this.matchOrMatches(this.matchesPlayed)}.`));
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
    } while (this.playAgain === 'yes');

    this.displayGoodbyeMessage();
  }
};

RPSLSGame.play();