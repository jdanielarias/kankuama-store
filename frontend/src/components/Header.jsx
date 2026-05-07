import React from 'react';
import { useCart } from '../context/CartContext';

const BackpackSVG = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="12" width="20" height="21" rx="4" fill="#C49A3C" stroke="#FFF8F0" strokeWidth="1.5"/>
    <path d="M14 12C14 8 24 8 24 12" stroke="#FFF8F0" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <rect x="15" y="18" width="8" height="6" rx="1.5" fill="#8B4513" opacity="0.6"/>
    <line x1="19" y1="18" x2="19" y2="24" stroke="#FFF8F0" strokeWidth="1" opacity="0.8"/>
    <line x1="15" y1="21" x2="23" y2="21" stroke="#FFF8F0" strokeWidth="1" opacity="0.8"/>
    {/* Kankuama diamond motif */}
    <polygon points="19,28 17,30 19,32 21,30" fill="#FFF8F0" opacity="0.7"/>
    <polygon points="19,28 17,30 19,32 21,30" fill="none" stroke="#FFF8F0" strokeWidth="0.5"/>
  </svg>
);

function Header() {
  const { items, setCartOpen } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-brand">
        <BackpackSVG />
        <div className="header-title">
          <h1>Kankuama Store</h1>
          <span className="header-subtitle">Artesanías Ancestrales</span>
        </div>
      </div>
      <button className="cart-toggle-btn" onClick={() => setCartOpen(true)} aria-label="Abrir carrito">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <span className="cart-toggle-label">Carrito</span>
        {itemCount > 0 && (
          <span className="cart-badge" aria-label={`${itemCount} items en el carrito`}>
            {itemCount}
          </span>
        )}
      </button>
    </header>
  );
}

export default Header;
