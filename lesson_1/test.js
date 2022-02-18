let RPSLSGame = {
  match: {
    roundHistory: ['player', 'computer'],

    round: {
      updateRoundHistory() {
        RPSLSGame.match.roundHistory.push('spock')
      }
    },



    calculatePlayerWins() {
      console.log(this.roundHistory);
    },

  },
}


RPSLSGame.match.round.updateRoundHistory();
RPSLSGame.match.calculatePlayerWins();

