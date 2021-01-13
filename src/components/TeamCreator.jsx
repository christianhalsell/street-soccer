import React, {useState, useEffect} from 'react'

const TeamCreator = () => {
  const numberOfPlayers = 18;
  const numberOfTeams = 4;
  let teamRoster = []
  let tempTeams = [];

  const [teams, setTeams] = useState([])

  useEffect(() => {
      console.log(`Teams: ${teams}`);
      console.log(`Team 1: ${teams[0]}`);
      console.log(`Team 2: ${teams[1]}`);
      console.log(`Team 3: ${teams[2]}`);
      console.log(`Team 4: ${teams[3]}`);
    }, [teams])  

  const addPlayers = () => {
    teamRoster = [];
    for (let i = 1; i <= numberOfPlayers; i++) {
      teamRoster.push(i);
    }
    console.log(`Team Roster: ${teamRoster}`)
  };

  const createRound = () => {
    tempTeams = []; // clear teams
    for (let i = 0; i < numberOfTeams; i++) {
      tempTeams.push([]);
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
          tempTeams[k].push(randomRoster[i])
          i++;
        }
      }    
    }

    setTeams(tempTeams);  
  };

  // console.log(`Number of Players: ${numberOfPlayers}`);
  // console.log(`Number of Teams: ${numberOfTeams}`);

  return (
    <div>
      <div><b>Number of Players:</b> {numberOfPlayers}</div>
      <div><b>Number of Teams:</b> {numberOfTeams}</div>
      <br />
      <div><button onClick={generateTeams}>Click to generate teams</button></div>
      <br />
      <div>
        {teams.map((team, idx) => (
          <div key={team}><b>Team {idx + 1}:</b> {' '}
          {team.map((player, i) => (
            <span key={player}>{player}{i < team.length - 1 ? ', ' : null}</span>
          ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamCreator
