import React, { useState, useEffect } from 'react';
import { usePrices, CRYPTOS } from '../context/PricesContext';
import './PortfolioTracker.css';

const COIN_NAMES = {
  BTCUSDT: 'Bitcoin', ETHUSDT: 'Ethereum', SOLUSDT: 'Solana',
  BNBUSDT: 'BNB', XRPUSDT: 'XRP', DOGEUSDT: 'Dogecoin',
};

function PortfolioTracker() {
  const { prices } = usePrices();
  const [holdings, setHoldings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cpHoldings')) || []; }
    catch { return []; }
  });
  const [form, setForm] = useState({ symbol: 'BTCUSDT', qty: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('cpHoldings', JSON.stringify(holdings));
  }, [holdings]);

  const addHolding = (e) => {
    e.preventDefault();
    const qty = parseFloat(form.qty);
    if (!qty || qty <= 0) { setError('Enter a valid quantity.'); return; }
    setHoldings(prev => {
      const existing = prev.findIndex(h => h.symbol === form.symbol);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { ...updated[existing], qty: updated[existing].qty + qty };
        return updated;
      }
      return [...prev, { symbol: form.symbol, qty }];
    });
    setForm(f => ({ ...f, qty: '' }));
    setError('');
  };

  const removeHolding = (symbol) => {
    setHoldings(prev => prev.filter(h => h.symbol !== symbol));
  };

  const totalValue = holdings.reduce((sum, h) => {
    const price = prices[h.symbol]?.price || 0;
    return sum + price * h.qty;
  }, 0);

  const formatValue = (v) =>
    v >= 1000
      ? '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : '$' + v.toFixed(2);

  return (
    <div className="portfolio-wrapper">
      <div className="section-header">
        <h2 className="section-title">Portfolio</h2>
        <span className="portfolio-subtitle">Track your crypto holdings in real-time</span>
      </div>

      <div className="portfolio-layout">
        {/* Add holding form */}
        <div className="portfolio-card add-card">
          <h3 className="card-heading">Add Holding</h3>
          <form onSubmit={addHolding} className="add-form">
            <div className="form-row">
              <label className="form-label">Coin</label>
              <select
                className="form-select"
                value={form.symbol}
                onChange={e => setForm(f => ({ ...f, symbol: e.target.value }))}
              >
                {CRYPTOS.map(s => (
                  <option key={s} value={s}>{COIN_NAMES[s] || s} ({s.replace('USDT', '')})</option>
                ))}
              </select>
            </div>
            <div className="form-row">
              <label className="form-label">Quantity</label>
              <input
                className="form-input"
                type="number"
                step="any"
                min="0"
                placeholder="e.g. 0.5"
                value={form.qty}
                onChange={e => setForm(f => ({ ...f, qty: e.target.value }))}
              />
            </div>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn-primary">+ Add to Portfolio</button>
          </form>
        </div>

        {/* Holdings table */}
        <div className="portfolio-card holdings-card">
          <div className="holdings-header">
            <h3 className="card-heading">Holdings</h3>
            {holdings.length > 0 && (
              <div className="total-value">
                <span className="total-label">Total Value</span>
                <span className="total-amount">{formatValue(totalValue)}</span>
              </div>
            )}
          </div>

          {holdings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📊</div>
              <p>No holdings yet. Add your first coin above.</p>
            </div>
          ) : (
            <div className="holdings-table">
              <div className="table-header">
                <span>Coin</span>
                <span>Qty</span>
                <span>Price</span>
                <span>Value</span>
                <span></span>
              </div>
              {holdings.map(h => {
                const price = prices[h.symbol]?.price;
                const value = price ? price * h.qty : null;
                const change = prices[h.symbol]?.change;
                return (
                  <div className="table-row" key={h.symbol}>
                    <span className="holding-coin">
                      <strong>{h.symbol.replace('USDT', '')}</strong>
                      <span className="holding-name">{COIN_NAMES[h.symbol]}</span>
                    </span>
                    <span className="holding-qty">{h.qty}</span>
                    <span className="holding-price">
                      {price ? formatValue(price) : '—'}
                      {change !== undefined && (
                        <span className={`inline-change ${change >= 0 ? 'up' : 'down'}`}>
                          {change >= 0 ? '▲' : '▼'}{Math.abs(change).toFixed(2)}%
                        </span>
                      )}
                    </span>
                    <span className="holding-value">{value ? formatValue(value) : '—'}</span>
                    <button
                      className="remove-btn"
                      onClick={() => removeHolding(h.symbol)}
                      aria-label={`Remove ${h.symbol}`}
                    >×</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PortfolioTracker;
