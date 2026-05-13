import React, { useEffect, useState, useCallback } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import './PriceCharts.css';

const COINS = {
  BTCUSDT:  'Bitcoin',
  ETHUSDT:  'Ethereum',
  SOLUSDT:  'Solana',
  BNBUSDT:  'BNB',
  XRPUSDT:  'XRP',
  DOGEUSDT: 'Dogecoin',
  ADAUSDT:  'Cardano',
  MATICUSDT:'Polygon',
  DOTUSDT:  'Polkadot',
};

const TIMEFRAMES = [
  { id: '1H',  label: '1H',  interval: '1m',  limit: 60  },
  { id: '24H', label: '24H', interval: '1h',  limit: 24  },
  { id: '7D',  label: '7D',  interval: '4h',  limit: 42  },
  { id: '30D', label: '30D', interval: '1d',  limit: 30  },
];

function formatLabel(timestamp, tfId) {
  const d = new Date(timestamp);
  if (tfId === '1H')  return d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
  if (tfId === '24H') return d.getHours() + ':00';
  if (tfId === '7D')  return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + 'h';
  return (d.getMonth() + 1) + '/' + d.getDate();
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const formatted = val >= 1000
    ? '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '$' + val.toFixed(val < 1 ? 5 : 4);
  return (
    <div className="chart-tooltip">
      <div className="tooltip-time">{label}</div>
      <div className="tooltip-price">{formatted}</div>
    </div>
  );
}

function PriceCharts() {
  const [history, setHistory] = useState({});
  const [selectedCoin, setSelectedCoin] = useState('BTCUSDT');
  const [timeframe, setTimeframe] = useState('24H');
  const [loading, setLoading] = useState(false);

  const fetchHistory = useCallback(async (symbol, tf) => {
    const { interval, limit } = TIMEFRAMES.find(t => t.id === tf);
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
      );
      const raw = await res.json();
      const formatted = raw.map(item => ({
        time: formatLabel(item[0], tf),
        price: parseFloat(item[4]),
      }));
      setHistory(prev => ({ ...prev, [`${symbol}_${tf}`]: formatted }));
    } catch (e) {
      console.error('Chart fetch error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const key = `${selectedCoin}_${timeframe}`;
    if (!history[key]) {
      fetchHistory(selectedCoin, timeframe);
    }
  }, [selectedCoin, timeframe, history, fetchHistory]);

  const chartKey = `${selectedCoin}_${timeframe}`;
  const chartData = history[chartKey];

  const downloadReport = () => {
    if (!chartData) return;
    const blob = new Blob([JSON.stringify(chartData, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${selectedCoin}_${timeframe}.json`;
    a.click();
  };

  const priceChange = chartData && chartData.length >= 2
    ? ((chartData[chartData.length - 1].price - chartData[0].price) / chartData[0].price) * 100
    : null;

  return (
    <div className="charts-wrapper">
      <div className="section-header">
        <h2 className="section-title">Price Charts</h2>
        <button className="btn-outline" onClick={downloadReport} disabled={!chartData}>
          ↓ Export JSON
        </button>
      </div>

      <div className="charts-layout">
        <div className="coin-selector">
          {Object.entries(COINS).map(([s, name]) => (
            <button
              key={s}
              className={`coin-btn${selectedCoin === s ? ' active' : ''}`}
              onClick={() => setSelectedCoin(s)}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="chart-panel">
          <div className="chart-header">
            <div className="chart-coin-info">
              <span className="chart-coin-name">{COINS[selectedCoin]}</span>
              {priceChange !== null && (
                <span className={`chart-change ${priceChange >= 0 ? 'up' : 'down'}`}>
                  {priceChange >= 0 ? '▲' : '▼'} {Math.abs(priceChange).toFixed(2)}%
                </span>
              )}
            </div>
            <div className="timeframe-selector">
              {TIMEFRAMES.map(tf => (
                <button
                  key={tf.id}
                  className={`tf-btn${timeframe === tf.id ? ' active' : ''}`}
                  onClick={() => setTimeframe(tf.id)}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          <div className="chart-container">
            {loading && <div className="chart-loading">Loading chart data…</div>}
            {!loading && chartData && (
              <ResponsiveContainer width="100%" height={360}>
                <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%"   stopColor="#22d3ee" />
                      <stop offset="55%"  stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#a855f7" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(168,85,247,0.12)" />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'Inter' }}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    domain={['auto', 'auto']}
                    tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'Inter' }}
                    tickLine={false}
                    axisLine={false}
                    width={72}
                    tickFormatter={v => v >= 1000 ? '$' + (v / 1000).toFixed(1) + 'k' : '$' + v.toFixed(2)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="url(#lineGrad)"
                    strokeWidth={2.75}
                    dot={false}
                    activeDot={{ r: 5, fill: '#a855f7', stroke: '#22d3ee', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
            {!loading && !chartData && (
              <div className="chart-loading">Select a coin to view its chart.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceCharts;
