# 🪙 CryptoPulse – Real-Time Cryptocurrency Tracker

**CryptoPulse** is a full-stack web application that provides real-time cryptocurrency prices and 24-hour historical chart data using the Binance WebSocket and REST APIs. Built with a clean, minimalist interface and responsive layout, this project was created to showcase practical use of React.js, Node.js, and WebSocket technology.

## 🚀 Live Demo

[https://cryptopulse-zwtw.onrender.com](https://cryptopulse-zwtw.onrender.com)

---

## 🔍 Features

- ✅ **Live Price Updates** – Real-time prices for BTC, ETH, DOGE, BNB, and more via Binance WebSocket
- 📈 **24-Hour Chart View** – Historical hourly price data using Binance Kline REST API
- 📥 **Download Reports** – Export both live and 24h chart data in JSON format
- ⭐ **Favorite Coin Mode** – Mark a coin as favorite to expand and focus with animation
- 🌗 **Dark/Light Mode Toggle** – Switch themes instantly
- 📱 **Responsive UI** – Optimized layout for desktop and mobile

---

## 🧑‍💻 Tech Stack

**Frontend**
- React.js
- Recharts
- CSS (custom responsive design)

**Backend**
- Node.js
- Express.js
- Binance API (WebSocket + REST)

**Hosting**
- Render (Full-stack deployment)

---

## 📁 Folder Structure

CryptoPulse/

├── frontend/ → React app (client)

├── backend/ → Express server (API + WebSocket support)

├── server.js → Main server entry point

└── README.md



---

## ⚙️ Installation (Local Setup)

```bash
# Clone repository
git clone https://github.com/gtathelegend/Cryptopulse-BTC-Price-Tracker.git
cd CryptoPulse-BTC-Price-Tracker

# Install frontend dependencies
cd frontend
npm install
npm run build

# Go back and install backend
cd ..
npm install

# Start the server
node server.js

'''
The app will be running at http://localhost:3001

📦 API Used
Binance WebSocket Streams:
wss://stream.binance.com:9443/ws/{symbol}@miniTicker

Binance REST API for historical data:
https://api.binance.com/api/v3/klines?symbol={symbol}&interval=1h&limit=24

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
