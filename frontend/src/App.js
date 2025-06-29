import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LivePrices from './components/LivePrices';
import PriceCharts from './components/PriceCharts';
import { ThemeContext } from './context/ThemeContext';
import './App.css';

function App() {
  const [view, setView] = useState('live');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme: () => setDarkMode(!darkMode) }}>
      <div className={darkMode ? 'app dark' : 'app'}>
        <Navbar view={view} setView={setView} />
        <main className="content">
          {view === 'live' ? <LivePrices /> : <PriceCharts />}
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
