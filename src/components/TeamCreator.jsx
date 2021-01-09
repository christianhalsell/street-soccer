import React from 'react'
// import PropTypes from 'prop-types'

const TeamCreator = () => {
  const teamRoster = []
  // const teamRoster = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const teams = 4;
  const numberOfPlayers = 17;
  const round = [];

  const addPlayers = () => {
    for (let i = 1; i <= numberOfPlayers; i++) {
      teamRoster.push(i);
    }
  }

  const createRound = () => {
    for (let i = 0; i < teams; i++) {
      round.push([]);
    }
  };

  const generateTeams = () => {
    let i = 0;
    for (let j = 0; j < teamRoster.length / teams; j++) {
      for (let k = 0; k < teams; k++) {
        if (i < teamRoster.length) {
          round[k].push(teamRoster[i])
          i++;
        }
      }    
    }
  };

  addPlayers();
  createRound();
  generateTeams();

  console.log(`Team Roster: ${teamRoster}`)
  console.log(`Number of Players: ${teamRoster.length}`);
  console.log(`Number of Teams: ${teams}`);
  console.log(round);

  return (
    <div>
      //
    </div>
  )
}

TeamCreator.propTypes = {

}

export default TeamCreator
