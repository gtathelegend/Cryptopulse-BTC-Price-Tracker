import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import './PriceCharts.css';

const COINS = {
  BTCUSDT: 'Bitcoin',
  ETHUSDT: 'Ethereum',
  SOLUSDT: 'Solana',
  BNBUSDT: 'Binance Coin',
  XRPUSDT: 'XRP',
  DOGEUSDT: 'Dogecoin',
  ADAUSDT: 'Cardano',
  MATICUSDT: 'Polygon',
  DOTUSDT: 'Polkadot'
};


function PriceCharts() {
  const [history, setHistory] = useState({});
  const [selectedCoin, setSelectedCoin] = useState('BTCUSDT');

  useEffect(() => {
    const fetchHistory = async (symbol) => {
      const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=24`);
      const raw = await res.json();
      const formatted = raw.map(item => ({
        time: new Date(item[0]).getHours() + ":00",
        price: parseFloat(item[4]),
      }));
      setHistory((prev) => ({ ...prev, [symbol]: formatted }));
    };

    Object.keys(COINS).forEach(fetchHistory);
  }, []);

  const downloadReport = () => {
    const blob = new Blob([JSON.stringify(history[selectedCoin], null, 2)], {
      type: 'application/json',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${selectedCoin}_24h.json`;
    a.click();
  };

  return (
    <div className="chart-wrapper">
      <div className="toolbar">
        {Object.keys(COINS).map((s) => (
          <button key={s} onClick={() => setSelectedCoin(s)} className={selectedCoin === s ? 'active' : ''}>
            {COINS[s]}
          </button>
        ))}
        <button className="download" onClick={downloadReport}>⬇️ Download Report</button>
      </div>

      {history[selectedCoin] && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={history[selectedCoin]}>
            <XAxis dataKey="time" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#00bcd4" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default PriceCharts;
