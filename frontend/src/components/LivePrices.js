import React, { useState, useEffect } from 'react';
import { usePrices, CRYPTOS } from '../context/PricesContext';
import './LivePrices.css';

const COIN_META = {
  BTCUSDT:  { name: 'Bitcoin',  symbol: 'BTC',  icon: '₿', tint: 'amber'  },
  ETHUSDT:  { name: 'Ethereum', symbol: 'ETH',  icon: 'Ξ', tint: 'violet' },
  SOLUSDT:  { name: 'Solana',   symbol: 'SOL',  icon: '◎', tint: 'emerald'},
  BNBUSDT:  { name: 'BNB',      symbol: 'BNB',  icon: '⬡', tint: 'amber'  },
  XRPUSDT:  { name: 'XRP',      symbol: 'XRP',  icon: '✕', tint: 'cyan'   },
  DOGEUSDT: { name: 'Dogecoin', symbol: 'DOGE', icon: 'Ð', tint: 'pink'   },
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
    <div className="live-prices-wrapper">
      <div className="section-header">
        <h2 className="section-title">Live Prices</h2>
        <span className="live-badge">● LIVE</span>
        <button className="btn-outline" onClick={downloadLivePrices} disabled={loaded.length === 0}>
          ↓ Export JSON
        </button>
      </div>

      <div className="prices-grid">
        {CRYPTOS.map(symbol => {
          const meta = COIN_META[symbol];
          const data = prices[symbol];
          const flash = flashState[symbol];
          const isFav = favorite === symbol;
          const isShrunk = favorite && !isFav;
          const changePositive = data?.change >= 0;

          return (
            <div
              key={symbol}
              className={`price-card tint-${meta.tint}${isFav ? ' favorite' : ''}${isShrunk ? ' shrunk' : ''}${flash ? ' flash-' + flash : ''}`}
            >
              <div className="card-top">
                <div className="coin-icon">{meta.icon}</div>
                <button
                  className={`star-btn${isFav ? ' starred' : ''}`}
                  onClick={() => setFavorite(isFav ? null : symbol)}
                  aria-label="Toggle favorite"
                >
                  {isFav ? '★' : '☆'}
                </button>
              </div>
              <div className="coin-name">{meta.name}</div>
              <div className="coin-symbol">{meta.symbol}</div>
              <div className="coin-price">
                {data ? formatPrice(data.price, symbol) : <span className="loading-dots">···</span>}
              </div>
              {data && (
                <div className={`change-badge ${changePositive ? 'up' : 'down'}`}>
                  {changePositive ? '▲' : '▼'} {Math.abs(data.change).toFixed(2)}%
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
