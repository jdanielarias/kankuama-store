import React from 'react';
import { render, screen } from '@testing-library/react';
import Cart from './Cart';
import { CartProvider } from '../context/CartContext';

test('muestra Tu carrito está vacío cuando no hay items', () => {
  render(
    <CartProvider>
      <Cart />
    </CartProvider>
  );
  expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument();
});
