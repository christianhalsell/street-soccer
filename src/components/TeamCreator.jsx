import React from 'react'

const TeamCreator = () => {
  let teamRoster = []
  const numberOfTeams = 4;
  const numberOfPlayers = 17;
  let teams = [];

  const addPlayers = () => {
    teamRoster = [];
    for (let i = 1; i <= numberOfPlayers; i++) {
      teamRoster.push(i);
    }
    console.log(`Team Roster: ${teamRoster}`)
  };

  const createRound = () => {
    teams = []; // clear teams
    for (let i = 0; i < numberOfTeams; i++) {
      teams.push([]);
    }
  };

  const randomizePlayers = (originalPlayers) => {
    const randomPlayers = originalPlayers
    for (var i = randomPlayers.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = randomPlayers[i];
      randomPlayers[i] = randomPlayers[j];
      randomPlayers[j] = temp;
    }
    
    return randomPlayers;
  };

  const generateTeams = () => {
    addPlayers();
    createRound();

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
    console.log(`Random Team Roster: ${randomRoster}`)
    console.log(`Teams: ${teams}`);
    console.log(`Team 1: ${teams[0]}`);
    console.log(`Team 2: ${teams[1]}`);
    console.log(`Team 3: ${teams[2]}`);
    console.log(`Team 4: ${teams[3]}`);
  };

  console.log(`Number of Players: ${numberOfPlayers}`);
  console.log(`Number of Teams: ${numberOfTeams}`);

  return (
    <div>
      <button onClick={generateTeams}>Click to generate teams</button>
    </div>
  )
}

export default TeamCreator
