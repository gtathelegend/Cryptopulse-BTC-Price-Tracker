# 🪙 CryptoPulse – Real-Time Cryptocurrency Tracker

CryptoPulse is a full-stack application that provides real-time cryptocurrency price tracking and historical insights using WebSocket and REST APIs. It is designed with scalability in mind, evolving from a simple dashboard into a comprehensive fintech analytics platform.

🔗 **Live Demo:** [https://cryptopulse-zwtw.onrender.com](https://cryptopulse-zwtw.onrender.com)

---

## 🚀 Current Features

- Real-time cryptocurrency price updates using Binance WebSocket API
- 24-hour historical price charts using Binance REST API
- Downloadable reports (live + historical data)
- Favorite coin highlighting with interactive UI
- Light/Dark mode toggle
- Responsive UI for desktop and mobile

---

## 🧑‍💻 Tech Stack

### Frontend

- React.js
- Recharts
- CSS (Responsive UI)

### Backend

- Node.js
- Express.js

### APIs

- Binance WebSocket API
- Binance REST API

### Deployment

- Render

---

## 📱 Next Phase: Mobile App Expansion

CryptoPulse is planned to expand into a **mobile-first application** with:

- Cross-platform app using **Flutter or React Native**
- Push notifications for price alerts
- Real-time portfolio tracking
- Biometric-secured user accounts
- Offline chart caching

---

## 💳 Fintech Features (Upcoming)

To evolve into a fintech product, the following features are planned:

### 📊 Portfolio & Wealth Tracking

- Track user crypto holdings
- Profit/Loss calculation
- Asset allocation visualization

### 🔔 Smart Alerts

- Price alerts (threshold-based)
- Volatility alerts
- AI-based trend notifications

### 🧾 Reports & Insights

- Daily/weekly financial summaries
- Export to CSV / PDF
- Investment performance analytics

### 🔐 Security & User Accounts

- Authentication (JWT / OAuth)
- Encrypted user data storage
- Secure API handling

### 🌐 Multi-Asset Support (Future)

- Stocks
- Commodities
- Forex

---

## 🧠 Long-Term Vision: Bloomberg Terminal Inspired Platform

CryptoPulse is envisioned to evolve into a **data-driven financial intelligence platform**, similar to a lightweight Bloomberg Terminal.

### Planned Advanced Features

- Multi-market real-time data dashboard
- Advanced charting (indicators, overlays)
- AI-based sentiment analysis (news + social media)
- Custom watchlists and dashboards
- Institutional-grade data visualization
- Terminal-style UI for power users

---

## 📁 Project Structure

```text
CryptoPulse/
├── frontend/        → React client
├── backend/         → Express server
├── server.js        → Entry point
└── README.md
```

---

## ⚙️ Local Setup

```bash
git clone https://github.com/gtathelegend/Cryptopulse-BTC-Price-Tracker.git
cd CryptoPulse-BTC-Price-Tracker
cd frontend
npm install
npm run build
cd ..
npm install
node server.js
```

App runs at: `http://localhost:3001`

---

## 📦 APIs Used

WebSocket:

```text
wss://stream.binance.com:9443/ws/{symbol}@miniTicker
```

REST (Klines):

```text
https://api.binance.com/api/v3/klines
```

---

## 📌 Roadmap Summary

| Phase   | Focus                                    |
| ------- | ---------------------------------------- |
| Phase 1 | Real-time crypto tracker ✅              |
| Phase 2 | UI/UX + charts + downloads ✅            |
| Phase 3 | Mobile app + user accounts               |
| Phase 4 | Fintech features (portfolio, alerts)     |
| Phase 5 | Bloomberg-style analytics platform       |

---

## 🤝 Contributing

Contributions are welcome. Please open an issue before making major changes.

---

## 👤 Author

**Vedaang Sharma**
GitHub: [https://github.com/gtathelegend](https://github.com/gtathelegend)
