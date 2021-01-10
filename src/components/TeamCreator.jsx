import React from 'react'

const TeamCreator = () => {
  const teamRoster = []
  const numberOfTeams = 4;
  const numberOfPlayers = 17;
  const teams = [];

  const addPlayers = () => {
    for (let i = 1; i <= numberOfPlayers; i++) {
      teamRoster.push(i);
    }
  }

  const createRound = () => {
    for (let i = 0; i < numberOfTeams; i++) {
      teams.push([]);
    }
  };

  const randomizePlayers = (originalPlayers) => {
    const arr = originalPlayers
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    
    return arr;
  }

  const generateTeams = () => {
    const randomRoster = randomizePlayers(teamRoster);
    let i = 0;
    for (let j = 0; j < teamRoster.length / numberOfTeams; j++) {
      for (let k = 0; k < numberOfTeams; k++) {
        if (i < teamRoster.length) {
          teams[k].push(randomRoster[i])
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
  console.log(`Number of Teams: ${numberOfTeams}`);
  console.log(teams);

  return (
    <div>
      //
    </div>
  )
}

export default TeamCreator
