const request = require('supertest');
const app = require('./app');

describe('Health', () => {
  test('GET /api/health retorna 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok', service: 'Kankuama Store API' });
  });
});

describe('Products', () => {
  test('GET /api/products retorna array de 8 items', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(8);
  });

  test('GET /api/products/1 retorna Mochila Arhuaca Grande', async () => {
    const res = await request(app).get('/api/products/1');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Mochila Arhuaca Grande');
  });

  test('GET /api/products/999 retorna 404', async () => {
    const res = await request(app).get('/api/products/999');
    expect(res.status).toBe(404);
  });
});
