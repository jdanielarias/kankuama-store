# Kankuama Store — CI/CD Project

Tienda en línea de mochilas artesanales Kankuamas con pipeline CI/CD completo usando Jenkins, Docker y React.

---

## Descripción del proyecto

Este proyecto combina una tienda e-commerce con una infraestructura CI/CD lista para usar:

- **Frontend**: React SPA con carrito de compras, filtros por categoría y catálogo de 8 mochilas Kankuamas con diseños SVG geométricos ancestrales.
- **Backend**: API REST Node.js/Express con endpoints de productos y carrito, validación de stock y manejo de errores.
- **CI/CD**: Pipeline Jenkins declarativo con etapas de instalación, pruebas unitarias (Jest + Supertest), análisis de seguridad Fortify (mock), build Docker y despliegue automático.

---

## Requisitos

- **Docker Desktop** instalado y en ejecución (versión 20.10+)
- Git

---

## Comandos de inicio

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd kankuama-store

# Levantar todos los servicios (Jenkins + Frontend + Backend)
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Detener todos los servicios
docker-compose down
```

---

## URLs de acceso

| Servicio       | URL                                  |
|----------------|--------------------------------------|
| Jenkins        | http://localhost:8090                |
| Frontend       | http://localhost:3000                |
| Backend API    | http://localhost:4000                |
| Health Check   | http://localhost:4000/api/health     |
| Productos      | http://localhost:4000/api/products   |

---

## Configurar el pipeline en Jenkins

1. Abre Jenkins en **http://localhost:8090**

2. Obtén la contraseña inicial de administrador:
   ```bash
   docker exec kankuama-jenkins cat /var/jenkins_home/secrets/initialAdminPassword
   ```

3. Completa el wizard de instalación e instala los plugins sugeridos.

4. Crea un nuevo ítem:
   - **Nuevo Item** → nombre: `kankuama-pipeline` → tipo: **Pipeline** → OK

5. En la configuración del pipeline:
   - Sección **Pipeline** → Definition: `Pipeline script from SCM`
   - SCM: `Git`
   - Repository URL: URL de tu repositorio
   - Branch: `*/main` (o `*/master`)
   - Script Path: `Jenkinsfile`

6. Guarda y haz clic en **Construir Ahora**

> **Nota sobre Docker dentro de Jenkins**: si el stage de Docker Build falla con permisos, ejecuta:
> ```bash
> docker exec -u root kankuama-jenkins chmod 666 /var/run/docker.sock
> ```

---

## Cómo ver los resultados de tests en Jenkins

1. Abre el build en Jenkins (icono de bola azul/rojo)
2. Haz clic en **Test Results** en el menú lateral
3. Verás el resumen de suites y casos de prueba con tiempos
4. Los reportes XML se generan en:
   - `backend/test-results/junit.xml`
   - `frontend/test-results/junit.xml`

---

## Estructura del proyecto

```
kankuama-store/
├── docker-compose.yml          # Orquestación: Jenkins + Frontend + Backend
├── Jenkinsfile                 # Pipeline CI/CD declarativo (8 stages)
├── jenkins/
│   └── Dockerfile              # Jenkins LTS + Docker CLI + Node.js 18 + plugins
├── frontend/                   # React 18 — tienda de mochilas
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.jsx             # Raíz de la aplicación
│       ├── App.test.jsx
│       ├── setupTests.js
│       ├── components/
│       │   ├── Header.jsx      # Logo SVG + nombre + contador carrito
│       │   ├── ProductCard.jsx # Tarjeta con patrón SVG Kankuama
│       │   ├── ProductCard.test.jsx
│       │   ├── ProductList.jsx # Grid responsivo + filtros por categoría
│       │   ├── Cart.jsx        # Panel lateral slide-in
│       │   └── Cart.test.jsx
│       ├── context/
│       │   └── CartContext.jsx # Context API: addItem, removeItem, updateQuantity
│       └── styles/
│           └── index.css       # Paleta tierra/ocre/verde selva/dorado
└── backend/                    # Node.js/Express — API REST
    ├── Dockerfile
    ├── package.json
    └── src/
        ├── app.js              # Express app + middlewares
        ├── index.js            # Punto de entrada
        ├── app.test.js         # Tests con Supertest
        ├── routes/
        │   ├── products.js     # GET /api/products, GET /api/products/:id
        │   └── cart.js         # GET /api/cart, POST /api/cart
        └── data/
            └── products.js     # 8 mochilas Kankuamas
```

---

## Pipeline CI/CD — Stages

| # | Stage               | Descripción                                              |
|---|---------------------|----------------------------------------------------------|
| 1 | **Checkout**        | Clona el repositorio desde SCM                           |
| 2 | **Install Backend** | `npm ci` — instala dependencias del backend              |
| 3 | **Install Frontend**| `npm ci` — instala dependencias del frontend             |
| 4 | **Tests Backend**   | Jest + Supertest → reporte JUnit en `test-results/`      |
| 5 | **Tests Frontend**  | Jest + RTL → reporte JUnit en `test-results/`            |
| 6 | **Fortify Scan**    | Mock SAST (ver nota abajo)                               |
| 7 | **Docker Build**    | Construye imágenes `kankuama-frontend` y `kankuama-backend` |
| 8 | **Deploy**          | `docker compose up -d`                                   |

---

## API Endpoints

| Método | Ruta                        | Descripción                                    |
|--------|-----------------------------|------------------------------------------------|
| GET    | `/api/health`               | Estado del servicio                            |
| GET    | `/api/products`             | Lista completa (filtros: `?category=&minPrice=&maxPrice=`) |
| GET    | `/api/products/:id`         | Producto por ID                                |
| GET    | `/api/cart`                 | Ver carrito actual                             |
| POST   | `/api/cart`                 | Agregar item `{ productId, quantity }`         |

---

## Tests unitarios

### Backend (Jest + Supertest)
```
✓ GET /api/health retorna 200
✓ GET /api/products retorna array de 8 items
✓ GET /api/products/1 retorna Mochila Arhuaca Grande
✓ GET /api/products/999 retorna 404
```

### Frontend (Jest + React Testing Library)
```
✓ App renderiza sin errores
✓ App muestra título "Kankuama Store"
✓ ProductCard renderiza nombre del producto
✓ ProductCard renderiza precio del producto
✓ ProductCard botón Agregar al carrito es clickeable
✓ Cart muestra "Tu carrito está vacío" cuando no hay items
```

---

## Nota sobre Fortify SAST

El stage **Fortify Scan** en el `Jenkinsfile` es un **mock de demostración**. Para integrar Fortify SAST real se requiere:

1. **Licencia** Fortify SCA de Micro Focus / OpenText
2. Instalar `sourceanalyzer` CLI en el agente Jenkins
3. Reemplazar el mock con:
   ```groovy
   sh 'sourceanalyzer -b kankuama-store -clean'
   sh 'sourceanalyzer -b kankuama-store -scan -f kankuama-store.fpr'
   sh 'fortifyupdate'  // sincronizar con Fortify SSC
   ```
4. Configurar credenciales de Fortify SSC en Jenkins

---

## Paleta de colores

| Variable   | Hex       | Uso                          |
|------------|-----------|------------------------------|
| Tierra     | `#8B4513` | Header, botones primarios    |
| Ocre       | `#D2691E` | Gradientes, hover states     |
| Beige      | `#F5E6C8` | Fondos de cards, SVG pattern |
| Verde selva| `#2D5016` | Precios, botón compra        |
| Crema      | `#FFF8F0` | Fondo general                |
| Dorado     | `#C49A3C` | Patrón SVG, badge carrito    |
