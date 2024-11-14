
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlayerProfile from './pages/PlayerProfile';
import PredictPlayer from './components/PredictPlayer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/predict">Predict Player Performance</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/player/:id" element={<PlayerProfile />} />
          <Route path="/predict" element={<PredictPlayer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
