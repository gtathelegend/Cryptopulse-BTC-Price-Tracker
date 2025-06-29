import React, { useContext } from 'react';
import './Navbar.css';
import { ThemeContext } from '../context/ThemeContext';

function Navbar({ view, setView }) {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <h2 className="logo">CryptoPulse</h2>
      <div className="tabs">
        <button className={view === 'live' ? 'active' : ''} onClick={() => setView('live')}>Live Prices</button>
        <button className={view === 'chart' ? 'active' : ''} onClick={() => setView('chart')}>24h Charts</button>
        <button onClick={toggleTheme}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
