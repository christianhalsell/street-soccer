import React, { Fragment, useState } from 'react'

const TeamCreator = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(16);
  const [numberOfTeams, setNumberOfTeams] = useState(4);
  const [gameRound, setGameRound] = useState([]);
  const [error, setError] = useState(null);
  const [scoreKeeping, setScoreKeeping] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(false)

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

  const createTeam = () => {
    let i = 0;
    for (let j = 0; j < tempRoster.length / numberOfTeams; j++) {
      for (let k = 0; k < numberOfTeams; k++) {
        if (i < tempRoster.length) {
          tempTeams[k].push(randomRoster[i])
          i++;
        }
      }    
    }
  }

  const createGameRound = () => {
    let j = 0;
    for (let i = 0; i < tempTeams.length; i++) {      
      let tempIdx = j
      if ((i !== 0) && (i % 2 !== 0)) {
        j++
      }
      tempGameRound[tempIdx].push(tempTeams[i])
    }
  }

  // TODO: continue here
  const addScores = e => {
    e.preventDefault();
    alert('TEST: Scores submitted')
  }

  const checkForErrors = () => {
    if (tempRoster.length < tempTeams.length) {
      setError(`You need more players than number of teams: Players: ${tempRoster.length}, Teams: ${tempTeams.length}`);
      return;
    }

    if (numberOfTeams % 2 !== 0) {
      setError("You need an even number of teams.");
      return;
    }

    return setError(null);
  }

  const generateTeams = e => {
    e.preventDefault();
    
    addPlayers();
    createRound();
    
    randomRoster = randomizePlayers(tempRoster);

    createTeam();
    createGameRound();
    checkForErrors();
    setGameRound(tempGameRound);
  };

  return (
    <div style={{padding: 10}}>
      <form onSubmit={generateTeams}>
        <div className="inputRow">
          <label><b>Number of Players: </b></label>
          <input type="number" min="1" value={numberOfPlayers} onChange={e => setNumberOfPlayers(parseInt(e.target.value))} />
        </div>
        <div className="inputRow">
          <label><b>Number of Teams: </b></label>
          <input type="number" min="1" value={numberOfTeams} onChange={ e => setNumberOfTeams(parseInt(e.target.value)) } />
        </div>
        <div className="inputRow">
          <button type="submit">Click to generate teams</button>
        </div>
      </form>
      <br />
      {error && (
        <div className="inputRow" style={{color: 'red'}}>{error}</div>
      )}
  
      {!error && gameRound.length > 0 && <div>
        <form onSubmit={addScores}>
          <div style={{display: 'flex', marginBottom: 10}}>
            <div style={{ fontSize: 30, marginBottom: 10, fontWeight: 700, flex: 1 }}>Game 1</div>
            <button type="submit" disabled={submitDisabled}>Submit Scores</button>
          </div>

          {!error && gameRound.map((game, idx) => (
            <div key={game} style={{ background: '#eee', padding: 10, marginBottom: 10}}>
              <div style={{ fontSize: 26, fontWeight: 700, paddingBottom: 10 }}>
                Field {idx + 1}
              </div>
              {game.map((team, i) => (
                <div key={team} style={{display: 'flex', alignItems: 'center', padding: 10, backgroundColor: i === 0 ? '#f66' : '#aaf' }}>
                  <div style={{flex: 1}}>  
                    <span style={{ fontSize: 22, fontWeight: 'bold' }}>Team {i + 1}: </span>
                    {team.map((player, i) => (
                      <span key={player}>{player}{i < team.length - 1 ? ', ' : null}</span>
                    ))}
                  </div>
                  <div style={{flex: 1, textAlign: 'right'}}>
                    <input style={{fontSize: 28, width: 50, height:50, textAlign: 'center'}} name={`player${i}`} type="number" min="0" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </form>
      </div>}
    </div>
  )
};

export default TeamCreator
