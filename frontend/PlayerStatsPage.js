import React, { useState, useEffect } from 'react';

function PlayerStatsPage() {
  const [playerStats, setPlayerStats] = useState([]);

  useEffect(() => {
    fetch('/api/stats')
      .then(response => response.json())
      .then(data => setPlayerStats(data))
      .catch(error => console.error('Error fetching player stats:', error));
  }, []);

  return (
    <div>
      <h2>Player Stats - All Splits</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Points Per Game</th>
            <th>Assists</th>
            <th>FG%</th>
            <th>3P%</th>
            <th>Minutes Played</th>
          </tr>
        </thead>
        <tbody>
          {playerStats.map((player, index) => (
            <tr key={index}>
              <td>{player.Player}</td>
              <td>{player['PTS/G']}</td>
              <td>{player.AST}</td>
              <td>{player['FG%']}</td>
              <td>{player['3P%']}</td>
              <td>{player.MP}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerStatsPage;
