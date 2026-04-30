// backend/server.js

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5050;

const cors = require('cors');
const axios = require('axios');


app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Vercel Speed Insights expects this script path in production builds when no DSN/basePath is configured.
// On non-Vercel deployments (e.g. Render), our SPA catch-all would otherwise return index.html here,
// which the browser then tries to parse as JS ("Unexpected token '<'").
app.get('/_vercel/speed-insights/script.js', (req, res) => {
  res.redirect(302, 'https://va.vercel-scripts.com/v1/speed-insights/script.js');
});

app.get('/_vercel/speed-insights/script.debug.js', (req, res) => {
  res.redirect(302, 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js');
});

// If the client posts vitals to this endpoint on non-Vercel hosting, accept and no-op.
app.post('/_vercel/speed-insights/vitals', express.json({ limit: '50kb' }), (req, res) => {
  res.sendStatus(204);
});

// REST endpoint: Get 24h history from CoinCap
app.get('/api/history/:coin', async (req, res) => {
  const { coin } = req.params;
  const end = Date.now();
  const start = end - 24 * 60 * 60 * 1000;

  const url = `https://api.coincap.io/v2/assets/${coin}/history?interval=h1&start=${start}&end=${end}`;

  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    res.json(response.data.data);
  } catch (err) {
    console.error('CoinCap API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch price history' });
  }
});

// Catch-all to serve React frontend
// Serve frontend for all routes except those starting with /api
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
