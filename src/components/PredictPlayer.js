
import React, { useState } from 'react';

function PredictPlayer() {
  const [formData, setFormData] = useState({
    points: '',
    assists: '',
    rebounds: ''
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5001/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => setPrediction(data.prediction))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Predict Player Performance</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Points:
          <input
            type="number"
            name="points"
            value={formData.points}
            onChange={handleChange}
          />
        </label>
        <label>
          Assists:
          <input
            type="number"
            name="assists"
            value={formData.assists}
            onChange={handleChange}
          />
        </label>
        <label>
          Rebounds:
          <input
            type="number"
            name="rebounds"
            value={formData.rebounds}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Predict</button>
      </form>
      {prediction !== null && (
        <div>
          <h3>Prediction:</h3>
          <p>{prediction ? 'High Scorer' : 'Not a High Scorer'}</p>
        </div>
      )}
    </div>
  );
}

export default PredictPlayer;
