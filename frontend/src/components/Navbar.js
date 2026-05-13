import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { ThemeContext } from '../context/ThemeContext';

const TABS = [
  { id: 'live', label: 'Live Prices' },
  { id: 'chart', label: 'Charts' },
  { id: 'portfolio', label: 'Portfolio' },
];

function Navbar({ view, setView, variant = 'app' }) {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <nav className={`navbar navbar-${variant}`}>
      <Link to="/" className="navbar-brand">
        <span className="navbar-logo-icon">⚡</span>
        <span className="navbar-logo-text">CryptoPulse</span>
      </Link>

      {variant === 'app' && setView && (
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
      )}

      <div className="navbar-actions">
        {variant === 'landing' && (
          <button
            className="nav-launch-btn"
            onClick={() => navigate('/app')}
          >
            Launch App <span className="nav-arrow">→</span>
          </button>
        )}
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {darkMode ? '☀️' : '🌙'}
          <span>{darkMode ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
