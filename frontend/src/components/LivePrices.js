import React, { useEffect, useState } from 'react';
import './LivePrices.css';

const CRYPTOS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'XRPUSDT', 'DOGEUSDT'];

function LivePrices() {
  const [prices, setPrices] = useState({});
  const [favorite, setFavorite] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(
      'wss://stream.binance.com:9443/stream?streams=' +
        CRYPTOS.map(c => c.toLowerCase() + '@ticker').join('/')
    );

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const symbol = msg.data.s;
      const price = parseFloat(msg.data.c);
      setPrices((prev) => ({ ...prev, [symbol]: price }));
    };

    return () => ws.close();
  }, []);
  const downloadLivePrices = () => {
    const blob = new Blob([JSON.stringify(prices, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'live_prices.json';
    a.click();
  };

  return (
    <div className="grid">
        {Object.keys(prices).map((symbol) => (
          <div
            key={symbol}
            className={`card ${favorite === symbol ? 'favorite' : favorite ? 'shrunk' : ''}`}
          >
            <div className="card-header">
              <h3>{symbol}</h3>
              <button className="star" onClick={() => setFavorite(favorite === symbol ? null : symbol)}>
                {favorite === symbol ? '⭐' : '☆'}
              </button>
            </div>
            <p>${prices[symbol]?.toFixed(2) || 'Loading...'}</p>
          </div>
        ))}
      
      <button className="download-btn" onClick={downloadLivePrices}>⬇️ Download Prices</button>

    </div>
  );
}

export default LivePrices;
