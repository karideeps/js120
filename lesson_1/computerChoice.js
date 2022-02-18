const WIN_RATE_THRESHOLD = 60;
const LOSS_RATE_THRESHOLD = 60;

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

// Test cases:

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


updateWinTable(winTable, matchHistory);
console.log(computerChoice(winTable));

