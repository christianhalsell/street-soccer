import React, { useEffect, useState } from 'react'

const TeamCreator = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(16);
  const [numberOfTeams, setNumberOfTeams] = useState(4);
  const [gameRound, setGameRound] = useState([]);
  const [error, setError] = useState(null);
  const [roundNumber, setRoundNumber] = useState(0);
  const [roundScore, setRoundScore] = useState([]);
  const [totalScore, setTotalScore] = useState([]);
  const [finalScores, setFinalScores] = useState({});
  const [finalScoresOrdered, setFinalScoresOrdered] = useState([]);
  const [startRoundDisabled, setStartRoundDisabled] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  // const [endGameDisabled, setEndGameDisabled] = useState(true);
  const [highestScore, setHighestScore] = useState(-1);

  const SCORE_WIN = 3;
  const SCORE_TIE = 2;
  const SCORE_LOSS = 1

  let tempRoster = [];
  let tempTeams = [];
  let tempScores = [];
  let tempGameRound = [];
  let randomRoster;

  // Find highest score
  useEffect(() => {
    let highestScore = Object.values(finalScores).sort((a, b) => a - b);
    setHighestScore(highestScore[highestScore.length - 1]);
  }, [finalScores]);

  useEffect(() => {
    console.log(finalScoresOrdered)
  }, [finalScoresOrdered])

  // Add score to roundScore while entering
  const addScore = e => {
    e.preventDefault();
    const newScoreArray = [...roundScore];
    newScoreArray[e.target.getAttribute('data-field')][e.target.getAttribute('data-team')] = parseInt(e.target.value, 10);

    setRoundScore([...newScoreArray])
    checkForEmptyScores();
  }

  const checkForEmptyScores = () => {
    let emptyScoreCheck = false;

    for (let i = 0; i < roundScore.length; i++) {       
        if (roundScore[i].length < 2) {
          emptyScoreCheck = true
        }  
    }
    
    setSubmitDisabled(emptyScoreCheck);
  }

  const addPlayers = () => {
    tempRoster = [];
    for (let i = 1; i <= numberOfPlayers; i++) {
      tempRoster.push(i);
    }
  };

  const createRound = () => {
    // clear tempteams and scores when creating a new round    
    tempTeams = [];
    tempScores = [];

    for (let i = 0; i < numberOfTeams; i++) {
      tempTeams.push([]);
    }

    for (let i = 0; i < numberOfTeams / 2; i++) {
      tempGameRound.push([])
      tempScores.push([]);
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

  const sortFinalScores = scoreObj => {
    let sortable = [];
    for (let key in scoreObj) {
      sortable.push([key, scoreObj[key]])
    }
    
    const sorted = sortable.sort((a, b) => b[1] - a[1]);
    return sorted;
  }

  // Add round scores to gamesheet
  const addScores = e => {
    e.preventDefault();
    const teamObj = {};
    const tempFinalObj = {...finalScores};
    const tempArray = [...totalScore];
    let sortedScores;

    for (let x = 0; x < numberOfPlayers; x++) {
      teamObj["Player #" + (x + 1)] = {};
      
      if (!tempFinalObj["Player #" + (x + 1)]) {
        tempFinalObj["Player #" + (x + 1)] = 0
      }
    }
  
    for (let i = 0; i < roundScore.length; i++) {
      if (roundScore[i][0] === roundScore[i][1]) {
        console.log('It\'s a tie');

        for (let j = 0; j < gameRound[i][0].length; j++) {
          const firstTeam = gameRound[i][0][j];
          teamObj["Player #" + firstTeam].score = SCORE_TIE;
          tempFinalObj["Player #" + firstTeam] += SCORE_TIE;
        }
        for (let j = 0; j < gameRound[i][1].length; j++) {
          const secondTeam = gameRound[i][1][j];
          teamObj["Player #" + secondTeam].score = SCORE_TIE;
          tempFinalObj["Player #" + secondTeam] += SCORE_TIE;
        }
      } else if (roundScore[i][0] < roundScore[i][1]) {
        console.log('Second Team Won');

        for (let j = 0; j < gameRound[i][0].length; j++) {
          const firstTeam = gameRound[i][0][j];
          teamObj["Player #" + firstTeam].score = SCORE_LOSS;
          tempFinalObj["Player #" + firstTeam] += SCORE_LOSS;
        }
        for (let j = 0; j < gameRound[i][1].length; j++) {
          const secondTeam = gameRound[i][1][j];
          teamObj["Player #" + secondTeam].score = SCORE_WIN;
          tempFinalObj["Player #" + secondTeam] += SCORE_WIN;
        }
      } else if (roundScore[i][0] > roundScore[i][1]) {
        console.log('First Team won');

        for (let j = 0; j < gameRound[i][0].length; j++) {
          const firstTeam = gameRound[i][0][j];          
          teamObj["Player #" + firstTeam].score = SCORE_WIN;
          tempFinalObj["Player #" + firstTeam] += SCORE_WIN;
        }
        for (let j = 0; j < gameRound[i][1].length; j++) {
          const secondTeam = gameRound[i][1][j];
          teamObj["Player #" + secondTeam].score = SCORE_LOSS;
          tempFinalObj["Player #" + secondTeam] += SCORE_LOSS;
        }
      }
    }  
    
    tempArray.push(teamObj);
    setTotalScore(tempArray);
    setFinalScores(tempFinalObj);

    sortedScores = sortFinalScores(tempFinalObj)
    setFinalScoresOrdered(sortedScores);

    // orderFinalScores
    // let sortable = [];
    // for (let key in tempFinalObj) {
    //   sortable.push([key, tempFinalObj[key]])
    // }
    
    // const sorted = sortable.sort((a, b) => b[1] - a[1]);
    // END

    setSubmitDisabled(true);
    setStartRoundDisabled(false);
  }

  // check for errors. If no errors, begin round
  const checkForErrorsAndBeginRound = () => {
    if (tempRoster.length < tempTeams.length) {
      setError(`You need more players than number of teams: Players: ${tempRoster.length}, Teams: ${tempTeams.length}`);
      return;
    }

    if (numberOfTeams % 2 !== 0) {
      setError("You need an even number of teams.");
      return;
    }

    setRoundNumber(roundNumber + 1);
    setRoundScore(tempScores)
    setGameRound(tempGameRound);
    setStartRoundDisabled(true);
    return setError(null);
  };

  const generateTeams = e => {
    e.preventDefault();
    addPlayers();
    createRound();
    
    randomRoster = randomizePlayers(tempRoster);

    createTeam();
    createGameRound();
    checkForErrorsAndBeginRound();
  };

  return (
    <div style={{padding: 10}}>
      <form onSubmit={generateTeams}>
        <div className="inputRow">
          <label><b>Number of Players: </b></label>
          <input disabled={startRoundDisabled} type="number" min="1" value={numberOfPlayers} onChange={e => setNumberOfPlayers(parseInt(e.target.value))} />
        </div>
        <div className="inputRow">
          <label><b>Number of Teams: </b></label>
          <input disabled={startRoundDisabled} type="number" min="1" value={numberOfTeams} onChange={ e => setNumberOfTeams(parseInt(e.target.value)) } />
        </div>
        <div className="inputRow">
          <button disabled={startRoundDisabled} style={{ fontSize: 24, marginBottom: 10, fontWeight: 700}} type="submit">Start Round</button>
        </div>
      </form>
      <br />
      {error && (
        <div className="inputRow" style={{color: 'red'}}>{error}</div>
      )}
  
      {!error && gameRound.length > 0 &&
        <div>
          <form onSubmit={addScores}>
            <div style={{display: 'flex', marginBottom: 10}}>
              <div style={{ fontSize: 30, marginBottom: 10, fontWeight: 700, flex: 1 }}>Round {roundNumber}</div>
            </div>

            {!error && gameRound.map((game, idx) => (
              <div key={game} style={{ background: '#eee', padding: 10, marginBottom: 10}}>
                <div style={{ fontSize: 26, fontWeight: 700, paddingBottom: 10 }}>
                  Field {idx + 1}
                </div>
                {game.map((team, i) => (
                  <div key={team} style={{display: 'flex', alignItems: 'center', padding: 10, backgroundColor: i === 0 ? '#f66' : '#aaf' }}>
                    <div style={{flex: 4}}>  
                      <span style={{ fontSize: 22, fontWeight: 'bold' }}>Team {i + 1}: </span>
                      {team.map((player, i) => (
                        <span key={player}>{player}{i < team.length - 1 ? ', ' : null}</span>
                      ))}
                    </div>
                    <div style={{flex: 1, textAlign: 'right'}}>
                      <input 
                        style={{fontSize: 28, width: 50, height:50, textAlign: 'center'}}
                        data-field={idx}
                        data-team={i}
                        type="number" 
                        min="0"
                        onChange={addScore}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div style={{display: 'flex', marginBottom: 10}}>
              <div style={{ fontSize: 30, marginBottom: 10, fontWeight: 700, flex: 1 }}></div>
              <button style={{ fontSize: 24, marginBottom: 10, fontWeight: 700}} type="submit" disabled={submitDisabled}>Submit Scores</button>
            </div>
          </form>
          
          {/* TODO: change how this is displayed...eventually */}
          {!startRoundDisabled && (
            <div style={{display: 'flex'}}>
              <div style={{flex: 1}}>
                <h3>Ordered by Player:</h3>
                {
                  Object.keys(finalScores).map(item => {
                    const highlight = finalScores[item] === highestScore ? 'highlight' : '';
                    return <div key={item}><span className={highlight}>{item}: {finalScores[item]}</span></div>
                  })
                }
              </div>
              <div style={{flex: 1}}>
                <h3>Ordered by Points:</h3>
                {
                  finalScoresOrdered.map(item => (
                    <div key={item[0]}>{item[0]}: {item[1]}</div>
                  ))
                }
              </div>
            </div>
          )}
        </div>
      }
    </div>
  )
};

export default TeamCreator
