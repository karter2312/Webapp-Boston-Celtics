import React, { useEffect, useState } from 'react';
import './Homepage.css';

function HomePage() {
  const [players, setPlayers] = useState([]);
  const [teamLeaders, setTeamLeaders] = useState({
    pointsLeader: null,
    reboundsLeader: null,
    assistsLeader: null,
  });

  useEffect(() => {
    // Fetch player stats
    fetch('https://flask-backend-993204161958.us-central1.run.app/api/players')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPlayers(data);

        // Set team leaders for points, rebounds, assists
        const sortedByPoints = [...data].sort((a, b) => b.pointsPerGame - a.pointsPerGame);
        const sortedByRebounds = [...data].sort((a, b) => (b.rebounds || 0) - (a.rebounds || 0));
        const sortedByAssists = [...data].sort((a, b) => b.assists - a.assists);

        setTeamLeaders({
          pointsLeader: sortedByPoints[0],
          reboundsLeader: sortedByRebounds[0],
          assistsLeader: sortedByAssists[0],
        });
      })
      .catch(error => console.error('Error fetching player data:', error));
  }, []);

  return (
    <div className="homepage-container">
      <h1>Boston Celtics Player Stats</h1>

      {/* Team Leaders Section */}
      <div className="team-leaders">
        <h2 className="section-title">Team Leaders</h2>
        <div className="leader-card">
          <h3>Points Leader</h3>
          <h2>{teamLeaders.pointsLeader?.name || 'N/A'}</h2>
          <p>Points: {teamLeaders.pointsLeader?.pointsPerGame || 'N/A'}</p>
        </div>
        <div className="leader-card">
          <h3>Rebounds Leader</h3>
          <h2>{teamLeaders.reboundsLeader?.name || 'N/A'}</h2>
          <p>Rebounds: {teamLeaders.reboundsLeader?.rebounds || 'N/A'}</p>
        </div>
        <div className="leader-card">
          <h3>Assists Leader</h3>
          <h2>{teamLeaders.assistsLeader?.name || 'N/A'}</h2>
          <p>Assists: {teamLeaders.assistsLeader?.assists || 'N/A'}</p>
        </div>
      </div>

      {/* Player Stats Table */}
      <div className="player-stats">
        <h2 className="section-title">Player Stats - All Splits</h2>
        <table className="player-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Points Per Game</th>
              <th>Assists</th>
              <th>Rebounds</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.length === 0 ? (
              <tr>
                <td colSpan="5">No player data available</td>
              </tr>
            ) : (
              players.map((player) => (
                <tr key={player.id}>
                  <td>{player.name}</td>
                  <td>{player.pointsPerGame}</td>
                  <td>{player.assists}</td>
                  <td>{player.rebounds}</td>
                  <td className="select-button">
                    <button>Select as Player 1</button>
                    <button>Select as Player 2</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;
