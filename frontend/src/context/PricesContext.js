import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const PricesContext = createContext(null);

export const CRYPTOS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'XRPUSDT', 'DOGEUSDT'];

export function PricesProvider({ children }) {
  const [prices, setPrices] = useState({});
  const [flashState, setFlashState] = useState({});
  const prevPricesRef = useRef({});
  const flashTimersRef = useRef({});

  useEffect(() => {
    const ws = new WebSocket(
      'wss://stream.binance.com:9443/stream?streams=' +
        CRYPTOS.map(c => c.toLowerCase() + '@ticker').join('/')
    );

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const { s: symbol, c: rawPrice, P: rawChange } = msg.data;
      const price = parseFloat(rawPrice);
      const change = parseFloat(rawChange);

      const prev = prevPricesRef.current[symbol]?.price;
      const direction = prev !== undefined
        ? (price > prev ? 'up' : price < prev ? 'down' : null)
        : null;

      prevPricesRef.current[symbol] = { price };

      setPrices(p => ({ ...p, [symbol]: { price, change } }));

      if (direction) {
        if (flashTimersRef.current[symbol]) {
          clearTimeout(flashTimersRef.current[symbol]);
        }
        setFlashState(f => ({ ...f, [symbol]: direction }));
        flashTimersRef.current[symbol] = setTimeout(() => {
          setFlashState(f => ({ ...f, [symbol]: null }));
        }, 600);
      }
    };

    const timers = flashTimersRef.current;
    return () => {
      ws.close();
      Object.values(timers).forEach(clearTimeout);
    };
  }, []);

  return (
    <PricesContext.Provider value={{ prices, flashState }}>
      {children}
    </PricesContext.Provider>
  );
}

export function usePrices() {
  return useContext(PricesContext);
}
