import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import LivePrices from '../components/LivePrices';
import PriceCharts from '../components/PriceCharts';
import PortfolioTracker from '../components/PortfolioTracker';
import MarketStats from '../components/MarketStats';
import Footer from '../components/Footer';

function Tracker() {
  const [view, setView] = useState('live');

  return (
    <>
      <Navbar view={view} setView={setView} variant="app" />
      <MarketStats />
      <main className="content">
        {view === 'live' && <LivePrices />}
        {view === 'chart' && <PriceCharts />}
        {view === 'portfolio' && <PortfolioTracker />}
      </main>
      <Footer />
    </>
  );
}

export default Tracker;
