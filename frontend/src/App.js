import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Landing from './pages/Landing';
import Tracker from './pages/Tracker';
import { ThemeContext } from './context/ThemeContext';
import { PricesProvider } from './context/PricesContext';
import './App.css';

function Splash({ hide }) {
  return (
    <div className={`app-splash${hide ? ' hide' : ''}`} aria-hidden={hide}>
      <div className="splash-mark">
        <span className="splash-dot" />
        CryptoPulse
      </div>
      <div className="splash-bar" />
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('cpTheme');
    if (saved) return saved === 'dark';
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });
  const [splashHide, setSplashHide] = useState(false);
  const [splashGone, setSplashGone] = useState(false);

  useEffect(() => {
    localStorage.setItem('cpTheme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const t1 = setTimeout(() => setSplashHide(true), 900);
    const t2 = setTimeout(() => setSplashGone(true), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme: () => setDarkMode(d => !d) }}>
      <PricesProvider>
        <div className={darkMode ? 'app dark' : 'app'}>
          {!splashGone && <Splash hide={splashHide} />}
            <div className="app-shell">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/app" element={<Tracker />} />
                  <Route path="*" element={<Landing />} />
                </Routes>
              </BrowserRouter>
            </div>
        </div>
      </PricesProvider>
      <SpeedInsights />
    </ThemeContext.Provider>
  );
}

export default App;
