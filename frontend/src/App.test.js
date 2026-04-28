import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CryptoPulse app', () => {
  render(<App />);
  const logoElement = screen.getByText(/CryptoPulse/i);
  expect(logoElement).toBeInTheDocument();
});
