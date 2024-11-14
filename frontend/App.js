import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlayerStatsPage from './pages/PlayerStatsPage';
import PredictPlayer from './pages/PredictPlayer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">NBA Stats</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/players">Player Stats</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/predict">Predict Matchup</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/players" element={<PlayerStatsPage />} />
            <Route path="/predict" element={<PredictPlayer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
