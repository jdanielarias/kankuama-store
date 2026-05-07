const { Router } = require('express');
const products = require('../data/products');

const router = Router();

router.get('/', (req, res) => {
  let result = [...products];
  const { category, minPrice, maxPrice } = req.query;

  if (category) result = result.filter(p => p.category === category);
  if (minPrice)  result = result.filter(p => p.price >= Number(minPrice));
  if (maxPrice)  result = result.filter(p => p.price <= Number(maxPrice));

  res.json(result);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
});

module.exports = router;
