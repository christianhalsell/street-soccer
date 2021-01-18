import React, {useState, useEffect} from 'react'

const TeamCreator = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(12);
  const [numberOfTeams, setNumberOfTeams] = useState(4);
  const [teams, setTeams] = useState([])

  let teamRoster = []
  let tempTeams = [];
  

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
    if (numberOfPlayers < numberOfTeams) {
      alert("You need more players than number of teams");
      return;
    }

    if (numberOfTeams % 2 !== 0) {
      alert("You need an even numer of teams");
      return;
    }
    
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

  return (
    <div>
      <form>
        <div className="inputRow">
          <label><b>Number of Players:</b></label>
          <input type="number" min="1" value={numberOfPlayers} onChange={e => setNumberOfPlayers(e.target.value)} />
        </div>
        <div className="inputRow">
          <label><b>Number of Teams:</b></label>
          <input type="number" min="1" value={numberOfTeams} onChange={ e => setNumberOfTeams(e.target.value) } />
        </div>
      </form>
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
