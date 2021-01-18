import React, {useState} from 'react'

const TeamCreator = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(16);
  const [numberOfTeams, setNumberOfTeams] = useState(4);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  let teamRoster = []
  let tempTeams = [];
  

  const addPlayers = () => {
    teamRoster = [];
    for (let i = 1; i <= numberOfPlayers; i++) {
      teamRoster.push(i);
    }
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

  const generateTeams = (e) => {
    e.preventDefault();
    
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
    
    if (teamRoster.length < tempTeams.length) {
      setError(`You need more players than number of teams: Players: ${teamRoster.length}, Teams: ${tempTeams.length}`);
      return;
    }

    if (numberOfTeams % 2 !== 0) {
      setError("You need an even number of teams");
      return;
    }
    setError(null)
    setTeams(tempTeams);  
  };

  return (
    <div>
      <form onSubmit={generateTeams}>
        <div className="inputRow">
          <label><b>Number of Players: </b></label>
          <input type="number" min="1" value={numberOfPlayers} onChange={e => setNumberOfPlayers(e.target.value)} />
        </div>
        <div className="inputRow">
          <label><b>Number of Teams: </b></label>
          <input type="number" min="1" value={numberOfTeams} onChange={ e => setNumberOfTeams(e.target.value) } />
        </div>
        <div className="inputRow">
          <button type="submit">Click to generate teams</button>
        </div>
      </form>
      <br />
      {error && (
        <div className="inputRow" style={{color: 'red'}}>{error}</div>
      )}
      <div>
        {teams.map((team, idx) => (
          <div className="inputRow" key={team}><b>Team {idx + 1}:</b> {' '}
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
