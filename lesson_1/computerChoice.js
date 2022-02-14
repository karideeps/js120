/*

write an algorithm for computer choice:

If the human wins over 60% when computer chooses 'rock', decrease the likelyhood that the computer will choose 'rock'
Increase the chance that the computer makes a move if it wins with that move.

Input: array of arrays
Output: string

Algorithm:
  define `computerChoice()` with the parameter `matchHistory`

    declare `possibleChoices` and initialize it to []
    iterate through winTable
      if winRate > WIN_RATE_THRESHOLD
        add choice to `possibleChoices` 3 times
      if lossRate > LOSS_RATE_THRESHOLD
        add choice to `possibleChoices` 1 times
      else 
        add choice to `possibleChoices` 2 times

    return computerChoice[Math.floor(Math.random() * computerChoices.length)];

*/

function updateWinTable(winTable, matchHistory) {
  matchHistory.forEach(round => {
    winTable[round.computerChoice].chosen += 1;
    if (round.winner === 'computer') winTable[round.computerChoice].wins += 1;
    if (round.winner === 'player') winTable[round.playerChoice].wins += 1;
  });

  for (let choice in winTable) {
    if (winTable[choice].wins > 0) {
      winTable[choice].winRate = winTable[choice].wins / winTable[choice].chosen * 100;
    } else if (winTable[choice].loses > 1) {
      winTable[choice].lossRate = winTable[choice].lose / winTable[choice].chosen * 100;
    }
  }
}

function computerChoice(matchHistory) {

  // TO DO

}



// Test cases:

const WIN_RATE_THRESHOLD = 60;
const LOSS_RATE_THRESHOLD = 60;

let matchHistory = [
  {round: 1, playerChoice: 'rock', computerChoice: 'paper', winner: 'computer'},
  {round: 2, playerChoice: 'scissors', computerChoice: 'rock', winner: 'computer'},
  {round: 3, playerChoice: 'rock', computerChoice: 'paper', winner: 'computer'},
  {round: 4, playerChoice: 'lizard', computerChoice: 'lizard', winner: 'tie'},
  {round: 5, playerChoice: 'paper', computerChoice: 'paper', winner: 'tie'},
  {round: 6, playerChoice: 'lizard', computerChoice: 'lizard', winner: 'tie'},];

let winTable = {
  rock: {chosen: 0, wins: 0, loses: 0, winRate: 0, loseRate: 0},
  paper: {chosen: 0, wins: 0, loses: 0, winRate: 0, loseRate: 0},
  scissors: {chosen: 0, wins: 0, loses: 0, winRate: 0, loseRate: 0},
  lizard: {chosen: 0, wins: 0, loses: 0, winRate: 0, loseRate: 0},
  spock: {chosen: 0, wins: 0, loses: 0, winRate: 0, loseRate: 0}
};

updateWinTable(winTable, matchHistory);

console.log(winTable);