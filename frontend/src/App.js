import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Landing from './pages/Landing';
import Tracker from './pages/Tracker';
import { ThemeContext } from './context/ThemeContext';
import { PricesProvider } from './context/PricesContext';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('cpTheme');
    if (saved) return saved === 'dark';
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  useEffect(() => {
    localStorage.setItem('cpTheme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme: () => setDarkMode(d => !d) }}>
      <PricesProvider>
        <div className={darkMode ? 'app dark' : 'app'}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/app" element={<Tracker />} />
              <Route path="*" element={<Landing />} />
            </Routes>
          </BrowserRouter>
        </div>
      </PricesProvider>
      <SpeedInsights />
    </ThemeContext.Provider>
  );
}

export default App;
