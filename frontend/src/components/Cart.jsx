import React from 'react';
import { useCart } from '../context/CartContext';

function formatCOP(price) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
}

function Cart() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, clearCart, total } = useCart();

  const handleCheckout = () => {
    alert(
      `¡Compra realizada con éxito!\n\nTotal: ${formatCOP(total)}\n\nGracias por apoyar a los artesanos Kankuamos.`
    );
    clearCart();
    setCartOpen(false);
  };

  return (
    <>
      <div
        className={`cart-overlay${isOpen ? ' open' : ''}`}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />
      <aside className={`cart-panel${isOpen ? ' open' : ''}`} aria-label="Carrito de compras">
        <div className="cart-header">
          <h2>Tu Carrito</h2>
          <button
            className="cart-close-btn"
            onClick={() => setCartOpen(false)}
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Tu carrito está vacío</p>
              <p className="cart-empty-sub">¡Descubre nuestras mochilas artesanales!</p>
            </div>
          ) : (
            <>
              <ul className="cart-items">
                {items.map(item => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-price">{formatCOP(item.price)}</span>
                    </div>
                    <div className="cart-item-controls">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Reducir cantidad"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                      <button
                        className="cart-item-remove"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Eliminar ${item.name}`}
                      >
                        🗑
                      </button>
                    </div>
                    <span className="cart-item-subtotal">{formatCOP(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>

              <div className="cart-total">
                <span>Total:</span>
                <span className="cart-total-amount">{formatCOP(total)}</span>
              </div>

              <button className="checkout-btn" onClick={handleCheckout}>
                Finalizar Compra
              </button>
              <button className="clear-cart-btn" onClick={clearCart}>
                Vaciar carrito
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

export default Cart;
