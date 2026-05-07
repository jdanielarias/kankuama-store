import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza sin errores', () => {
  render(<App />);
});

test('muestra título Kankuama Store', () => {
  render(<App />);
  expect(screen.getByText(/Kankuama Store/i)).toBeInTheDocument();
});
