import React, { useEffect, useState } from 'react';
import './MarketStats.css';

function fmt(n, decimals = 2) {
  if (n === null || n === undefined) return '—';
  if (n >= 1e12) return '$' + (n / 1e12).toFixed(decimals) + 'T';
  if (n >= 1e9)  return '$' + (n / 1e9).toFixed(decimals) + 'B';
  return '$' + n.toLocaleString();
}

function MarketStats() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/global')
      .then(r => r.json())
      .then(data => {
        const d = data.data;
        setStats({
          marketCap: d.total_market_cap?.usd,
          volume: d.total_volume?.usd,
          btcDominance: d.market_cap_percentage?.btc,
          ethDominance: d.market_cap_percentage?.eth,
          activeCryptos: d.active_cryptocurrencies,
          marketCapChange: d.market_cap_change_percentage_24h_usd,
        });
      })
      .catch(() => setError(true));
  }, []);

  if (error) return null;

  return (
    <div className="market-stats-bar">
      <div className="stats-inner">
        {stats ? (
          <>
            <StatItem label="Market Cap" value={fmt(stats.marketCap)} change={stats.marketCapChange} />
            <div className="stat-divider" />
            <StatItem label="24h Volume" value={fmt(stats.volume)} />
            <div className="stat-divider" />
            <StatItem label="BTC Dominance" value={stats.btcDominance?.toFixed(1) + '%'} />
            <div className="stat-divider" />
            <StatItem label="ETH Dominance" value={stats.ethDominance?.toFixed(1) + '%'} />
            <div className="stat-divider" />
            <StatItem label="Active Cryptos" value={stats.activeCryptos?.toLocaleString()} />
          </>
        ) : (
          <span className="stats-loading">Loading market data…</span>
        )}
      </div>
    </div>
  );
}

function StatItem({ label, value, change }) {
  return (
    <div className="stat-item">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      {change !== undefined && change !== null && (
        <span className={`stat-change ${change >= 0 ? 'up' : 'down'}`}>
          {change >= 0 ? '+' : ''}{change.toFixed(2)}%
        </span>
      )}
    </div>
  );
}

export default MarketStats;
