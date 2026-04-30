import React, { useContext } from 'react';
import './Navbar.css';
import { ThemeContext } from '../context/ThemeContext';

const TABS = [
  { id: 'live', label: 'Live Prices' },
  { id: 'chart', label: 'Charts' },
  { id: 'portfolio', label: 'Portfolio' },
];

function Navbar({ view, setView }) {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo-icon">⚡</span>
        <span className="navbar-logo-text">CryptoPulse</span>
      </div>
      <div className="navbar-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${view === tab.id ? 'active' : ''}`}
            onClick={() => setView(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {darkMode ? '☀️' : '🌙'}
        <span>{darkMode ? 'Light' : 'Dark'}</span>
      </button>
    </nav>
  );
}

export default Navbar;
