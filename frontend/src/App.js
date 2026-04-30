import React, { useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import LivePrices from './components/LivePrices';
import PriceCharts from './components/PriceCharts';
import PortfolioTracker from './components/PortfolioTracker';
import MarketStats from './components/MarketStats';
import Footer from './components/Footer';
import { ThemeContext } from './context/ThemeContext';
import { PricesProvider } from './context/PricesContext';
import './App.css';

function App() {
  const [view, setView] = useState('live');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme: () => setDarkMode(!darkMode) }}>
      <PricesProvider>
        <div className={darkMode ? 'app dark' : 'app'}>
          <Navbar view={view} setView={setView} />
          <MarketStats />
          <main className="content">
            {view === 'live' && <LivePrices />}
            {view === 'chart' && <PriceCharts />}
            {view === 'portfolio' && <PortfolioTracker />}
          </main>
          <Footer />
        </div>
      </PricesProvider>
      <SpeedInsights />
    </ThemeContext.Provider>
  );
}

export default App;
