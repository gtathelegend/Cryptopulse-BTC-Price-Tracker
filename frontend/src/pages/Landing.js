import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { usePrices } from '../context/PricesContext';
import './Landing.css';

const TICKER_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];

const COIN_META = {
  BTCUSDT: { name: 'Bitcoin',  symbol: 'BTC' },
  ETHUSDT: { name: 'Ethereum', symbol: 'ETH' },
  SOLUSDT: { name: 'Solana',   symbol: 'SOL' },
};

const FEATURES = [
  {
    label: '01',
    title: 'Live streaming prices',
    desc: 'Sub-second price updates from the Binance WebSocket feed. Six top assets, with visual indicators for every tick.',
  },
  {
    label: '02',
    title: 'Multi-timeframe charts',
    desc: '1H, 24H, 7D, and 30D historical charts. Cached for instant switching between assets and ranges.',
  },
  {
    label: '03',
    title: 'Portfolio tracker',
    desc: 'Add your holdings, see live USD value in real time. Persists across sessions on your device.',
  },
  {
    label: '04',
    title: 'Global market stats',
    desc: 'Total market cap, 24h volume, BTC and ETH dominance — fetched live from CoinGecko.',
  },
  {
    label: '05',
    title: 'Watchlist',
    desc: 'Star your preferred asset to elevate it on the dashboard. Saved locally between visits.',
  },
  {
    label: '06',
    title: 'Light & dark mode',
    desc: 'A restrained, readable interface that respects your system theme and remembers your choice.',
  },
];

const TECH_STACK = [
  { name: 'React 19',          desc: 'UI framework' },
  { name: 'React Router',      desc: 'Client routing' },
  { name: 'Recharts',          desc: 'Charting library' },
  { name: 'Binance WebSocket', desc: 'Live price stream' },
  { name: 'CoinGecko API',     desc: 'Global market data' },
  { name: 'Node + Express',    desc: 'Backend on Render' },
  { name: 'Vercel',            desc: 'Frontend hosting' },
];

function formatPrice(price, symbol) {
  if (price === undefined) return '—';
  if (symbol === 'DOGEUSDT' || price < 1) return '$' + price.toFixed(5);
  if (price < 100) return '$' + price.toFixed(3);
  return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function LiveTickerRow() {
  const { prices, flashState } = usePrices();
  return (
    <div className="ticker-row" role="list">
      {TICKER_SYMBOLS.map(symbol => {
        const data = prices[symbol];
        const meta = COIN_META[symbol];
        const flash = flashState[symbol];
        const up = data && data.change >= 0;
        return (
          <div key={symbol} className={`ticker-cell${flash ? ' flash-' + flash : ''}`} role="listitem">
            <div className="ticker-cell-head">
              <span className="ticker-cell-symbol">{meta.symbol}</span>
              <span className="ticker-cell-name">{meta.name}</span>
            </div>
            <div className="ticker-cell-price">
              {data ? formatPrice(data.price, symbol) : <span className="ticker-loading">— — —</span>}
            </div>
            <div className={`ticker-cell-change ${data ? (up ? 'up' : 'down') : 'neutral'}`}>
              {data ? `${up ? '+' : ''}${data.change.toFixed(2)}%` : '—'}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Landing() {
  return (
    <>
      <Navbar variant="landing" />

      <main className="landing">
        {/* Hero */}
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <span className="eyebrow-dot" />
              <span>Live · WebSocket powered</span>
            </div>
            <h1 className="hero-title">
              A real-time crypto<br />
              dashboard, made simple.
            </h1>
            <p className="hero-sub">
              Track Bitcoin and top crypto assets in real time. Streaming prices,
              multi-timeframe charts, and a live portfolio tracker — in a clean,
              focused interface.
            </p>

            <div className="hero-cta">
              <Link to="/app" className="btn-primary">
                Launch the app
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
              <a
                href="https://github.com/gtathelegend/Cryptopulse-BTC-Price-Tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View source
              </a>
            </div>
          </div>

          <div className="hero-ticker-wrap">
            <div className="ticker-label">
              <span className="pulse-dot" /> Live now
            </div>
            <LiveTickerRow />
          </div>
        </section>

        {/* Features */}
        <section className="section" id="features">
          <div className="section-head">
            <span className="section-kicker">Features</span>
            <h2 className="section-title">Everything you need to read the market at a glance.</h2>
            <p className="section-lead">
              Built around a single WebSocket connection, so every part of the
              dashboard updates in lockstep. No polling. No drift.
            </p>
          </div>

          <div className="features-grid">
            {FEATURES.map(f => (
              <article key={f.title} className="feature">
                <div className="feature-num">{f.label}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="section" id="how">
          <div className="section-head">
            <span className="section-kicker">How it works</span>
            <h2 className="section-title">One stream. Distributed to the whole UI.</h2>
            <p className="section-lead">
              A single connection to Binance's combined ticker stream, fanned out
              through React Context — so prices, charts and portfolio share one
              source of truth.
            </p>
          </div>

          <ol className="how-steps">
            <li className="how-step">
              <span className="how-num">01</span>
              <div>
                <h4>Connect</h4>
                <p>Open a single WebSocket to Binance's combined ticker stream for the six tracked assets.</p>
              </div>
            </li>
            <li className="how-step">
              <span className="how-num">02</span>
              <div>
                <h4>Distribute</h4>
                <p>React Context fans live ticks out to every component — without extra network connections.</p>
              </div>
            </li>
            <li className="how-step">
              <span className="how-num">03</span>
              <div>
                <h4>Render</h4>
                <p>Cards animate on price changes; charts and portfolio totals stay in perfect sync.</p>
              </div>
            </li>
          </ol>

          <div className="tech-stack">
            <span className="tech-stack-label">Built with</span>
            <ul className="tech-list">
              {TECH_STACK.map(t => (
                <li key={t.name} className="tech-item">
                  <span className="tech-name">{t.name}</span>
                  <span className="tech-dot" aria-hidden="true">·</span>
                  <span className="tech-desc">{t.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="section section-cta">
          <div className="cta-inner">
            <h2 className="cta-title">Ready to watch the market move?</h2>
            <p className="cta-sub">Jump straight into the dashboard — no sign-up.</p>
            <Link to="/app" className="btn-primary">
              Launch the app
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Landing;
