import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app', () => {
  render(<App />);
  const downloadButton = screen.getByText(/Download Prices/i);
  expect(downloadButton).toBeInTheDocument();
});
