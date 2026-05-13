import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { usePrices } from '../context/PricesContext';
import './Landing.css';

const COIN_META = {
  BTCUSDT:  { name: 'Bitcoin',  symbol: 'BTC',  icon: '₿', gradient: 'linear-gradient(135deg, #f59e0b, #ec4899)' },
  ETHUSDT:  { name: 'Ethereum', symbol: 'ETH',  icon: 'Ξ', gradient: 'linear-gradient(135deg, #06b6d4, #a855f7)' },
  SOLUSDT:  { name: 'Solana',   symbol: 'SOL',  icon: '◎', gradient: 'linear-gradient(135deg, #10d999, #06b6d4)' },
};

const FEATURES = [
  {
    icon: '⚡',
    title: 'Live Streaming Prices',
    desc: 'Sub-second updates straight from the Binance WebSocket feed. Six top assets, with visual green/red flashes on every tick.',
    accent: 'cyan',
  },
  {
    icon: '📈',
    title: 'Multi-Timeframe Charts',
    desc: '1H, 24H, 7D, 30D historical charts with smooth gradient lines and interactive tooltips. Cached for instant switching.',
    accent: 'violet',
  },
  {
    icon: '💼',
    title: 'Portfolio Tracker',
    desc: 'Add your holdings and watch their live USD value update in real time. Persists across sessions with localStorage.',
    accent: 'pink',
  },
  {
    icon: '🌐',
    title: 'Global Market Stats',
    desc: 'Total market cap, 24h volume, BTC and ETH dominance — pulled live from CoinGecko on every load.',
    accent: 'emerald',
  },
  {
    icon: '⭐',
    title: 'Watchlist',
    desc: 'Star your favorite coin to scale it up and dim the rest. Saved to your device so it sticks around between visits.',
    accent: 'amber',
  },
  {
    icon: '🌓',
    title: 'Light & Dark Mode',
    desc: 'A polished glassmorphism UI that respects your system preference and remembers your choice.',
    accent: 'cyan',
  },
];

const TECH_STACK = [
  { name: 'React 19',         desc: 'UI library',          accent: 'cyan' },
  { name: 'React Router',     desc: 'Client routing',      accent: 'violet' },
  { name: 'Recharts',         desc: 'Interactive charts',  accent: 'pink' },
  { name: 'Binance WebSocket',desc: 'Live price stream',   accent: 'emerald' },
  { name: 'CoinGecko API',    desc: 'Global market data',  accent: 'amber' },
  { name: 'Node + Express',   desc: 'Backend on Render',   accent: 'cyan' },
  { name: 'Vercel',           desc: 'Frontend hosting',    accent: 'violet' },
];

function formatPrice(price, symbol) {
  if (price === undefined) return '—';
  if (symbol === 'DOGEUSDT' || price < 1) return '$' + price.toFixed(5);
  if (price < 100) return '$' + price.toFixed(3);
  return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function LiveTicker({ symbol }) {
  const { prices, flashState } = usePrices();
  const data = prices[symbol];
  const meta = COIN_META[symbol];
  const flash = flashState[symbol];
  const up = data && data.change >= 0;

  return (
    <div className={`ticker-chip${flash ? ' flash-' + flash : ''}`}>
      <span className="ticker-icon" style={{ background: meta.gradient }}>{meta.icon}</span>
      <div className="ticker-info">
        <span className="ticker-symbol">{meta.symbol}</span>
        <span className="ticker-price">
          {data ? formatPrice(data.price, symbol) : <span className="ticker-loading">···</span>}
        </span>
      </div>
      {data && (
        <span className={`ticker-change ${up ? 'up' : 'down'}`}>
          {up ? '▲' : '▼'} {Math.abs(data.change).toFixed(2)}%
        </span>
      )}
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
          <div className="hero-orbs" aria-hidden="true">
            <span className="orb orb-cyan" />
            <span className="orb orb-violet" />
            <span className="orb orb-pink" />
          </div>

          <div className="hero-inner">
            <span className="hero-badge">
              <span className="pulse-dot" /> Live data · WebSocket powered
            </span>
            <h1 className="hero-title">
              The crypto dashboard{' '}
              <span className="gradient-text">that pulses with the market.</span>
            </h1>
            <p className="hero-sub">
              Track Bitcoin and top crypto assets in real time. Streaming prices, multi-timeframe charts,
              and a live portfolio tracker — all wrapped in a clean, modern interface.
            </p>

            <div className="hero-cta">
              <Link to="/app" className="btn-hero-primary">
                Launch the App <span className="arrow">→</span>
              </Link>
              <a
                href="https://github.com/gtathelegend/Cryptopulse-BTC-Price-Tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hero-ghost"
              >
                <span className="gh-mark">◆</span> View on GitHub
              </a>
            </div>

            <div className="hero-tickers">
              <LiveTicker symbol="BTCUSDT" />
              <LiveTicker symbol="ETHUSDT" />
              <LiveTicker symbol="SOLUSDT" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section section-features">
          <div className="section-head">
            <span className="kicker kicker-cyan">Features</span>
            <h2 className="section-h2">Everything you need to read the market at a glance.</h2>
            <p className="section-lead">
              Built with a focus on speed, clarity, and real-time accuracy. Every component talks to a single
              WebSocket connection, so the whole dashboard updates in lockstep.
            </p>
          </div>

          <div className="features-grid">
            {FEATURES.map(f => (
              <div key={f.title} className={`feature-card accent-${f.accent}`}>
                <div className="feature-icon-wrap">
                  <span className="feature-icon">{f.icon}</span>
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="section section-how">
          <div className="section-head">
            <span className="kicker kicker-violet">How it works</span>
            <h2 className="section-h2">A single WebSocket feeds the entire UI.</h2>
            <p className="section-lead">
              One stream from Binance, fanned out through React Context. Every tab — prices, charts, portfolio —
              consumes the same source of truth, so nothing ever drifts out of sync.
            </p>
          </div>

          <div className="how-grid">
            <div className="how-step">
              <span className="how-num">01</span>
              <h4>Connect</h4>
              <p>Open a single WebSocket to Binance's combined ticker stream for six top assets.</p>
            </div>
            <div className="how-arrow" aria-hidden="true">→</div>
            <div className="how-step">
              <span className="how-num">02</span>
              <h4>Distribute</h4>
              <p>A React Context fans the live ticks out to every component without extra connections.</p>
            </div>
            <div className="how-arrow" aria-hidden="true">→</div>
            <div className="how-step">
              <span className="how-num">03</span>
              <h4>Render</h4>
              <p>Cards flash green or red on price changes; charts and portfolio values update instantly.</p>
            </div>
          </div>

          <div className="tech-stack">
            <span className="tech-stack-label">Built with</span>
            <div className="tech-pills">
              {TECH_STACK.map(t => (
                <div key={t.name} className={`tech-pill accent-${t.accent}`}>
                  <span className="tech-pill-name">{t.name}</span>
                  <span className="tech-pill-desc">{t.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section section-cta">
          <div className="cta-card">
            <h2 className="cta-title">Ready to watch the market move?</h2>
            <p className="cta-sub">Jump straight into the dashboard — no sign-up, no friction.</p>
            <Link to="/app" className="btn-hero-primary btn-hero-primary-lg">
              Launch the App <span className="arrow">→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Landing;
