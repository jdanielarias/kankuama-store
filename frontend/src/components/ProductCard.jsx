import React from 'react';
import { useCart } from '../context/CartContext';

const PATTERN_COLORS = ['#C49A3C', '#8B4513', '#2D5016', '#D2691E'];

const COLOR_HEX = {
  natural:    '#F5E6C8',
  negro:      '#2C2C2C',
  rojo:       '#C0392B',
  beige:      '#F0D9A8',
  café:       '#6F4E37',
  verde:      '#2D5016',
  multicolor: '#E74C3C',
  azul:       '#2980B9',
  naranja:    '#E67E22',
  blanco:     '#F8F8F8',
  tierra:     '#8B4513',
  rosa:       '#FF69B4',
  lila:       '#9B59B6',
  amarillo:   '#F1C40F',
};

function KankuamaPattern({ accentColor }) {
  const diamonds = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const cx = 20 + col * 40;
      const cy = 20 + row * 40;
      diamonds.push(
        <polygon
          key={`${row}-${col}`}
          points={`${cx},${cy - 14} ${cx + 14},${cy} ${cx},${cy + 14} ${cx - 14},${cy}`}
          fill={accentColor}
          opacity="0.55"
        />
      );
    }
  }
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="200" fill="#F5E6C8"/>
      {[40, 80, 120, 160].map(p => (
        <React.Fragment key={p}>
          <line x1={p} y1="0" x2={p} y2="200" stroke={accentColor} strokeWidth="0.8" opacity="0.25"/>
          <line x1="0" y1={p} x2="200" y2={p} stroke={accentColor} strokeWidth="0.8" opacity="0.25"/>
        </React.Fragment>
      ))}
      {diamonds}
    </svg>
  );
}

function formatCOP(price) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
}

function ProductCard({ product }) {
  const { addItem } = useCart();
  const accentColor = PATTERN_COLORS[(product.id - 1) % PATTERN_COLORS.length];

  return (
    <article className="product-card">
      <div className="product-image">
        <KankuamaPattern accentColor={accentColor} />
        <span className="product-category-badge">{product.category}</span>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-colors" aria-label="Colores disponibles">
          {product.colors.map(color => (
            <span
              key={color}
              className="color-dot"
              title={color}
              style={{
                background: COLOR_HEX[color] || '#888',
                border: color === 'blanco' ? '1.5px solid #ccc' : 'none',
              }}
            />
          ))}
        </div>
        <div className="product-footer">
          <span className="product-price">{formatCOP(product.price)}</span>
          <button
            className="add-to-cart-btn"
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
          </button>
        </div>
        <span className="product-stock">Stock: {product.stock} unidades</span>
      </div>
    </article>
  );
}

export default ProductCard;
