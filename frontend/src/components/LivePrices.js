import React, { useState, useEffect } from 'react';
import { usePrices, CRYPTOS } from '../context/PricesContext';
import './LivePrices.css';

const COIN_META = {
  BTCUSDT:  { name: 'Bitcoin',  symbol: 'BTC' },
  ETHUSDT:  { name: 'Ethereum', symbol: 'ETH' },
  SOLUSDT:  { name: 'Solana',   symbol: 'SOL' },
  BNBUSDT:  { name: 'BNB',      symbol: 'BNB' },
  XRPUSDT:  { name: 'XRP',      symbol: 'XRP' },
  DOGEUSDT: { name: 'Dogecoin', symbol: 'DOGE' },
};

function formatPrice(price, symbol) {
  if (price === undefined) return '—';
  if (symbol === 'DOGEUSDT' || price < 1) return '$' + price.toFixed(5);
  if (price < 100) return '$' + price.toFixed(3);
  return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function LivePrices() {
  const { prices, flashState } = usePrices();
  const [favorite, setFavorite] = useState(
    () => localStorage.getItem('cpFavorite') || null
  );

  useEffect(() => {
    if (favorite) {
      localStorage.setItem('cpFavorite', favorite);
    } else {
      localStorage.removeItem('cpFavorite');
    }
  }, [favorite]);

  const downloadLivePrices = () => {
    const snapshot = Object.fromEntries(
      Object.entries(prices).map(([s, d]) => [s, { price: d.price, change24h: d.change }])
    );
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'live_prices.json';
    a.click();
  };

  const loaded = CRYPTOS.filter(s => prices[s]);

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title-row">
          <h2 className="panel-title">Live Prices</h2>
          <span className="live-badge"><span className="live-dot" />Live</span>
        </div>
        <button className="btn-ghost" onClick={downloadLivePrices} disabled={loaded.length === 0}>
          Export JSON
        </button>
      </div>

      <div className="prices-grid">
        {CRYPTOS.map(symbol => {
          const meta = COIN_META[symbol];
          const data = prices[symbol];
          const flash = flashState[symbol];
          const isFav = favorite === symbol;
          const changePositive = data?.change >= 0;

          return (
            <div
              key={symbol}
              className={`price-card${isFav ? ' favorite' : ''}${flash ? ' flash-' + flash : ''}`}
            >
              <div className="card-top">
                <div className="coin-meta">
                  <div className="coin-symbol">{meta.symbol}</div>
                  <div className="coin-name">{meta.name}</div>
                </div>
                <button
                  className={`star-btn${isFav ? ' starred' : ''}`}
                  onClick={() => setFavorite(isFav ? null : symbol)}
                  aria-label={isFav ? `Unstar ${meta.name}` : `Star ${meta.name}`}
                  title={isFav ? 'Remove from watchlist' : 'Add to watchlist'}
                >
                  {isFav ? '★' : '☆'}
                </button>
              </div>
              <div className="coin-price">
                {data ? formatPrice(data.price, symbol) : <span className="loading-dots">— — —</span>}
              </div>
              {data && (
                <div className={`change-badge ${changePositive ? 'up' : 'down'}`}>
                  {changePositive ? '+' : ''}{data.change.toFixed(2)}%
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LivePrices;
