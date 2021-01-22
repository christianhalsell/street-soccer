import React, { useState } from 'react'

const TeamCreator = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(16);
  const [numberOfTeams, setNumberOfTeams] = useState(4);
  const [teams, setTeams] = useState([]);
  const [gameRound, setGameRound] = useState([]);
  const [error, setError] = useState(null);

  let tempRoster = [];
  let tempTeams = [];
  let tempGameRound = [];
  let randomRoster;

  const addPlayers = () => {
    tempRoster = [];
    for (let i = 1; i <= numberOfPlayers; i++) {
      tempRoster.push(i);
    }
  };

  const createRound = () => {
    tempTeams = [];
    for (let i = 0; i < numberOfTeams; i++) {
      tempTeams.push([]);
    }

    for (let i = 0; i < numberOfTeams / 2; i++) {
      tempGameRound.push([])
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

  const generateTeams = e => {
    e.preventDefault();
    
    addPlayers();
    createRound();
    
    randomRoster = randomizePlayers(tempRoster);
    
    // create team
    let i = 0;
    for (let j = 0; j < tempRoster.length / numberOfTeams; j++) {
      for (let k = 0; k < numberOfTeams; k++) {
        if (i < tempRoster.length) {
          tempTeams[k].push(randomRoster[i])
          i++;
        }
      }    
    }

    // create gameRound    
    let j = 0;
    for (let i = 0; i < tempTeams.length; i++) {      
      let tempIdx = j
      if ((i !== 0) && (i % 2 !== 0)) {
        j++
      }
      tempGameRound[tempIdx].push(tempTeams[i])
    }
    
    if (tempRoster.length < tempTeams.length) {
      setError(`You need more players than number of teams: Players: ${tempRoster.length}, Teams: ${tempTeams.length}`);
      return;
    }

    if (numberOfTeams % 2 !== 0) {
      setError("You need an even number of teams");
      return;
    }

    setError(null)
    setTeams(tempTeams);
    setGameRound(tempGameRound);
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
          <div key={team} className={(idx + 1) % 2 !== 0 ? 'teamRowTop' : 'teamRowBottom'}>
            <div className="inputRow" key={team}><b>Team {idx + 1}:</b> {' '}
            {team.map((player, i) => (
              <span key={player}>{player}{i < team.length - 1 ? ', ' : null}</span>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamCreator
