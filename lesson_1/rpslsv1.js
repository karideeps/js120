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

let scoreBoard = {
  playerWins: 3,
  computerWins: 4,
  ties: 3,
  roundsPlayed: 11,
}

let matchHistory = [
  ['1', 'ROCK', 'PAPER', 'COMPUTER'],
  ['2', 'SCISSORS', 'ROCK', 'COMPUTER'],
  ['3', 'ROCK', 'PAPER', 'COMPUTER'],
  ['4', 'LIZARD', 'SPOCK', 'PLAYER'],
  ['5', 'PAPER', 'PAPER', 'TIE'],
  ['6', 'LIZARD', 'LIZARD', 'TIE'],
  ['7', 'SCISSORS', 'SCISSORS', 'TIE'],
  ['8', 'SCISSORS', 'SCISSORS', 'TIE'],
  ['9', 'SCISSORS', 'SCISSORS', 'TIE'],
  ['10', 'SCISSORS', 'SCISSORS', 'TIE'],
  ['11', 'SCISSORS', 'SCISSORS', 'TIE'],
]

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

function computerMakesChoice() {
  console.log('=> The computer chose PAPER.');
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


