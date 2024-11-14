
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PlayerProfile() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5002/api/players/${id}`)
      .then((response) => response.json())
      .then((data) => setPlayer(data))
      .catch((error) => console.error('Error fetching player data:', error));
  }, [id]);

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{player.name}</h1>
      <p>Points Per Game: {player.pointsPerGame}</p>
      <p>Assists: {player.assists}</p>
      <p>Rebounds: {player.rebounds}</p>
    </div>
  );
}

export default PlayerProfile;
