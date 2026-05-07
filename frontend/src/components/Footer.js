import React from 'react';
import './Footer.css';

const TECH = ['React', 'Binance API', 'Recharts', 'WebSocket', 'Node.js', 'Express'];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-logo">⚡ CryptoPulse</span>
          <span className="footer-sep">·</span>
          <span className="footer-by">
            Built by{' '}
            <a
              href="https://github.com/gtathelegend"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Vedaang Sharma
            </a>
          </span>
          <span className="footer-sep">·</span>
          <a
            href="https://www.linkedin.com/in/vedaangsharma2006/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="Vedaang Sharma on LinkedIn"
          >
            LinkedIn
          </a>
        </div>
        <div className="footer-stack">
          {TECH.map(t => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
