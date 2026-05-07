import React, { useState } from 'react';
import ProductCard from './ProductCard';

const CATEGORIES = ['todas', 'pequeña', 'mediana', 'grande', 'especial'];

const PRODUCTS = [
  { id: 1, name: 'Mochila Arhuaca Grande',   price: 280000, stock: 15, category: 'grande',   description: 'Tejida a mano por artesanas del pueblo Kankuamo, lana virgen de oveja, diseños ancestrales',                       colors: ['natural', 'negro', 'rojo'] },
  { id: 2, name: 'Mochila Kankuama Mediana', price: 180000, stock: 22, category: 'mediana',  description: 'Tejido tradicional con figuras geométricas que representan la cosmovisión Kankuama',                              colors: ['beige', 'café', 'verde'] },
  { id: 3, name: 'Mochila Wayuu Clásica',    price: 150000, stock: 30, category: 'mediana',  description: 'Crochet artesanal con hilos de algodón, patrón de rombos tradicionales',                                         colors: ['multicolor', 'azul', 'naranja'] },
  { id: 4, name: 'Mochila Ceremonial',       price: 420000, stock: 5,  category: 'especial', description: 'Pieza exclusiva para rituales, tejida por mamos, con piedras y semillas sagradas incrustadas',                   colors: ['natural', 'negro'] },
  { id: 5, name: 'Morral Kankuamo Pequeño',  price: 95000,  stock: 40, category: 'pequeña',  description: 'Ideal para el día a día, compacta y resistente, diseño moderno con raíces ancestrales',                          colors: ['café', 'negro', 'rojo'] },
  { id: 6, name: 'Mochila Sierra Nevada',    price: 320000, stock: 8,  category: 'grande',   description: 'Homenaje a la Sierra Nevada de Santa Marta, colores que evocan la naturaleza sagrada',                          colors: ['verde', 'azul', 'blanco'] },
  { id: 7, name: 'Mochila Niña Indígena',    price: 75000,  stock: 25, category: 'pequeña',  description: 'Diseño especial para niñas, colores vivos, tejido resistente y suave',                                           colors: ['rosa', 'lila', 'amarillo'] },
  { id: 8, name: 'Mochila Festival',         price: 210000, stock: 18, category: 'mediana',  description: 'Perfecta para festivales y viajes, amplio espacio interior, cierre de madera artesanal',                        colors: ['multicolor', 'tierra', 'negro'] },
];

function ProductList() {
  const [activeCategory, setActiveCategory] = useState('todas');

  const filtered = activeCategory === 'todas'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section className="product-list-section">
      <div className="section-header">
        <h2>Nuestra Colección</h2>
        <p className="section-subtitle">Mochilas tejidas a mano por artesanas del pueblo Kankuamo de la Sierra Nevada</p>
      </div>

      <div className="category-filters" role="group" aria-label="Filtrar por categoría">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="no-products">No hay productos en esta categoría.</p>
      )}
    </section>
  );
}

export default ProductList;
