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
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" aria-label="CryptoPulse home">
          <span className="brand-dot" aria-hidden="true" />
          <span className="brand-name">CryptoPulse</span>
        </Link>

        {variant === 'app' && setView && (
          <div className="navbar-tabs" role="tablist">
            {TABS.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={view === tab.id}
                className={`nav-tab ${view === tab.id ? 'active' : ''}`}
                onClick={() => setView(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          {variant === 'landing' && (
            <button
              className="nav-launch-btn"
              onClick={() => navigate('/app')}
            >
              Launch app
              <span className="nav-arrow" aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
