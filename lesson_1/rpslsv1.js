const readlineSync = require('readline-sync');
const BOARD_WIDTH = 80;
const WINS_NEEDED = 5;

const MOVES = {
  rock: {
    validChoices: ['r', 'ro', 'rock'],
    winsAgainst: ['scissors', 'lizard'],
  },
  paper: {
    valideChoices: ['p', 'pa', 'paper'],
    winsAgainst: ['rock', 'spock'],
  },
  scissors: {
    validChoices: ['sc', 'scissors'],
    winsAgainst: ['paper', 'lizard'],
  },
  lizard: {
    validChoices: ['l', 'li', 'lizard'],
    winsAgainst: ['spock', 'paper'],
  },
  spock: {
    validChoices: ['sp', 'spock'],
    winsAgainst: ['rock', 'scissors'],
  },
}

const PLAY_AGAIN_CHOICES = {
  'yes': ['y', 'yes'],
  'no': ['n', 'no'],
}


let matchHistory = [
  {round: 1, playerChoice: 'rock', computerChoice: 'paper', winner: 'computer'},
  {round: 2, playerChoice: 'scissors', computerChoice: 'rock', winner: 'computer'},
  {round: 3, playerChoice: 'rock', computerChoice: 'lizard', winner: 'player'},
  {round: 4, playerChoice: 'paper', computerChoice: 'rock', winner: 'player'},
  {round: 5, playerChoice: 'lizard', computerChoice: 'spock', winner : 'player'},
  {round: 6, playerChoice: 'spock', computerChoice: 'spock', winner: 'tie'},
  {round: 7, playerChoice: 'rock', computerChoice: 'spock', winner: 'computer'},
  {round: 8, playerChoice: 'rock', computerChoice: 'paper', winner: 'computer'},
  {round: 9, playerChoice: 'lizard', computerChoice: 'lizard', winner: 'tie'},
  {round: 10, playerChoice: 'paper', computerChoice: 'paper', winner: 'tie'},
  {round: 11, playerChoice: 'lizard', computerChoice: 'lizard', winner: 'tie'},
  {round: 12, playerChoice: 'paper', computerChoice: 'rock', winner: 'player'},
  {round: 13, playerChoice: 'spock', computerChoice: 'rock', winner: 'player'},
  {round: 14, playerChoice: 'rock', computerChoice: 'rock', winner: 'tie'},
  {round: 15, playerChoice: 'paper', computerChoice: 'rock', winner: 'player'},
  {round: 16, playerChoice: 'paper', computerChoice: 'scissors', winner: 'computer'},
  {round: 17, playerChoice: 'lizard', computerChoice: 'scissors', winner: 'computer'},
  {round: 18, playerChoice: 'scissors', computerChoice: 'lizard', winner: 'player'},
  {round: 19, playerChoice: 'scissors', computerChoice: 'lizard', winner: 'player'},
  {round: 20, playerChoice: 'scissors', computerChoice: 'lizard', winner: 'player'},
];

let winTable = {
  rock: {chosen: 0, wins: 0, loses: 0, winRate: 0, loseRate: 0},
  paper: {chosen: 0, wins: 0, loses: 0, winRate: 0, loseRate: 0},
  scissors: {chosen: 0, wins: 0, loses: 0, winRate: 0, loseRate: 0},
  lizard: {chosen: 0, wins: 0, loses: 0, winRate: 0, loseRate: 0},
  spock: {chosen: 0, wins: 0, loses: 0, winRate: 0, loseRate: 0}
};

function centralize(string, lineLength) {
  let padding = (lineLength - string.length) / 2;
  if (string.length % 2 === 1) {
    return ' '.repeat(padding - 1) + string + ' '.repeat(padding + 1); // total of additional numbers needs to be 0
  } else {
    return ' '.repeat(padding - 1) + string + ' '.repeat(padding); // total of additional numbers needs to be -1
  }
}

function printScoreBoard(scoreBoard) {
  console.clear();
  console.log(('-'.repeat(BOARD_WIDTH)));
  console.log(`Rounds Player Won: ${scoreBoard.playerWins}`);
  console.log(`Rounds Computer Won: ${scoreBoard.computerWins}`);
  console.log(`Number of Ties: ${scoreBoard.ties}`);
  console.log(('-'.repeat(BOARD_WIDTH)));
}

function printMatchHistory(matchHistory) {
  console.log(matchHistoryTitle());
  console.log('-'.repeat(BOARD_WIDTH));
  console.log(matchHistoryTopRow());
  console.log('-'.repeat(BOARD_WIDTH));
  console.log(matchHistoryIndividualRows(matchHistory));
  console.log('-'.repeat(BOARD_WIDTH));
}

function matchHistoryTitle() {
  return centralize('MATCH HISTORY', BOARD_WIDTH);
}

function matchHistoryTopRow() {
  return centralize('ROUND #', BOARD_WIDTH / 4) + '|' +
         centralize('PLAYER CHOICE', BOARD_WIDTH / 4) + '|' +
         centralize('COMPUTER_CHOICE', BOARD_WIDTH / 4) + '|' +
         centralize('WINNER', BOARD_WIDTH / 4);
}

function matchHistoryIndividualRows(matchHistory) {
  let resultString = '';

  matchHistory.forEach((round, index) => {
    round.forEach((element, index) => {
      resultString += centralize(element, BOARD_WIDTH / 4);
      if (index != round.length - 1) resultString += '|';
    });
    if (index != matchHistory.length - 1) resultString += '\n'
  });
  return resultString;
}

function printCurrentRound() {
  console.log(currentRoundTitle());
  console.log('-'.repeat(BOARD_WIDTH));
  getPlayerChoice();
  computerMakesChoice();
  displayWinner();
}

function currentRoundTitle() {
  let currentRound = String(scoreBoard.roundsPlayed += 1);
  return centralize('Round Number: ' + currentRound, BOARD_WIDTH);
}

function getPlayerChoice() {
  console.log('=> Please choose rock, paper, scissors, lizard, or spock. (r, ro, or rock for rock; p, pa, or paper for paper; sc, or scissors for scissors, l, li, or lizard for lizard; sp for spock)');
  readlineSync.prompt();
  console.log('=> You chose ROCK.');
  console.log('=> \'asdf \' is an invalid choice please chose r, ro, or rock for rock; p, pa, or paper for paper; sc, or scissors for scissors, l, li, or lizard for lizard; sp for spock')
}

function updateWinTable(winTable, matchHistory) {

  matchHistory.forEach(round => {
    winTable[round.computerChoice].chosen += 1;
    if (round.winner === 'computer') winTable[round.computerChoice].wins += 1;
    if (round.winner === 'player') winTable[round.computerChoice].loses += 1;
  });

  for (let choice in winTable) {
    if (winTable[choice].chosen) {
      winTable[choice].winRate = winTable[choice].wins / winTable[choice].chosen * 100;
      winTable[choice].loseRate = winTable[choice].loses / winTable[choice].chosen * 100;
    }
  }

}

function computerChoice(winTable) {

  let possibleChoices = [];

  for (let choice in winTable) {
    if (winTable[choice].winRate > WIN_RATE_THRESHOLD) {
      possibleChoices.push(choice, choice, choice);
    } else if (winTable[choice].loseRate > LOSS_RATE_THRESHOLD) {
      possibleChoices.push(choice);
    } else {
      possibleChoices.push(choice, choice);
    }
  }

  let randomIndex = Math.floor(Math.random() * possibleChoices.length);

  return possibleChoices[randomIndex];
}

function displayComputerChoice(computerChoice) {
  console.log(`=> The computer chose ${computerChoice.toUpperCase()}`);
}

function displayWinner() {
  console.log('=> The computer wins this round.');
  readlineSync.question('=> Press Enter to continue...');
}

function printMatchWinner() {
  console.clear();
  console.log('=> The computer has won the match in 15 rounds, better luck next time! Here is the match history');
  console.log('-'.repeat(BOARD_WIDTH));

}

function getPlayAgain() {
  console.log('=> Would you like to play another match? (y or yes for yes; n or no for no)');
  console.log('=> That is not a valid choice');

}

function displayGoodbyeMessage() {
  console.log('=> Thank you for playing RPS, you played X matches');
}

function displayWelcomeMessage() {
  console.log('=> Welcome to RPSLS');
  console.log('First to win 5 rounds, wins the match');
  console.log('Here are the rules as taken from BBT');
}

printScoreBoard(scoreBoard);
printMatchHistory(matchHistory);
printCurrentRound();

printMatchWinner();
printMatchHistory(matchHistory);
getPlayAgain();

// Todo:
// displayWelcomeMessage();
// displayGoodeByeMessage();


