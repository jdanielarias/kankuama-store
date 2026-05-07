const { Router } = require('express');
const products = require('../data/products');

const router = Router();
const cart = [];

router.get('/', (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ items: cart, total });
});

router.post('/', (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId || quantity < 1) {
    return res.status(400).json({ error: 'productId y quantity son requeridos' });
  }

  const product = products.find(p => p.id === Number(productId));
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

  if (product.stock < quantity) {
    return res.status(400).json({ error: 'Stock insuficiente', available: product.stock });
  }

  const existing = cart.find(i => i.productId === Number(productId));
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      productId: Number(productId),
      name: product.name,
      price: product.price,
      quantity,
    });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ message: 'Producto agregado al carrito', cart, total });
});

module.exports = router;
