import React, { useState } from 'react';

function PredictPlayer() {
  const [player1Stats, setPlayer1Stats] = useState({});
  const [player2Stats, setPlayer2Stats] = useState({});
  const [prediction, setPrediction] = useState('');

  const handlePredict = () => {
    fetch('/api/predict_matchup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player1: player1Stats,
        player2: player2Stats,
      }),
    })
      .then(response => response.json())
      .then(data => setPrediction(data.prediction))
      .catch(error => console.error('Error predicting matchup:', error));
  };

  return (
    <div>
      <h2>Predict Player Matchup</h2>
      <p>Select players to compare their stats:</p>
      {/* Add inputs to gather player stats - dropdowns, etc */}
      <button className="btn btn-primary" onClick={handlePredict}>Predict Matchup</button>
      {prediction && <div className="mt-4"><strong>Prediction:</strong> {prediction}</div>}
    </div>
  );
}

export default PredictPlayer;
