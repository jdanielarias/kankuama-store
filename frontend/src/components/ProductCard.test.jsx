import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { CartProvider } from '../context/CartContext';

const mockProduct = {
  id: 1,
  name: 'Mochila Arhuaca Grande',
  price: 280000,
  stock: 15,
  category: 'grande',
  description: 'Tejida a mano por artesanas del pueblo Kankuamo',
  colors: ['natural', 'negro', 'rojo'],
};

const renderWithCart = (ui) => render(<CartProvider>{ui}</CartProvider>);

test('renderiza nombre del producto', () => {
  renderWithCart(<ProductCard product={mockProduct} />);
  expect(screen.getByText('Mochila Arhuaca Grande')).toBeInTheDocument();
});

test('renderiza precio del producto', () => {
  renderWithCart(<ProductCard product={mockProduct} />);
  expect(screen.getByText(/280/)).toBeInTheDocument();
});

test('botón Agregar al carrito es clickeable', () => {
  renderWithCart(<ProductCard product={mockProduct} />);
  const btn = screen.getByRole('button', { name: /agregar al carrito/i });
  expect(btn).toBeInTheDocument();
  fireEvent.click(btn);
});
