# 🛒 Shop Starter — Fullstack E-Commerce Template

A complete **e-commerce starter project** built with:

- ⚡ **Frontend**: [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) + [Bootstrap 5](https://getbootstrap.com/) + [Pinia](https://pinia.vuejs.org/) + [Vue Router](https://router.vuejs.org/)
- 🟢 **Backend**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) + [Mongoose](https://mongoosejs.com/)
- 🗄️ **Database**: [MongoDB](https://www.mongodb.com/) (already running in Docker)

This boilerplate gives you **categories, subcategories, products, search, pagination, sorting** and a minimal shopping cart.
Perfect to **learn fullstack development** or to **bootstrap your own online shop** 🚀

---

## 📂 Project Structure

```

shop-starter/
│
├── shop-api/        # Backend (Express + MongoDB + Mongoose)
│   ├── src/
│   │   ├── models/        # Category, Subcategory, Product schemas
│   │   ├── controllers/   # API logic
│   │   ├── routes/        # Express routes
│   │   ├── middlewares/   # Error handling
│   │   ├── utils/         # Pagination helper
│   │   └── seed/          # Seed script with demo data
│   └── .env.example
│
├── shop-web/        # Frontend (Vue 3 + Vite + Bootstrap)
│   ├── src/
│   │   ├── components/    # Navbar, ProductCard, CategorySidebar
│   │   ├── pages/         # Home, CategoryPage, ProductPage
│   │   ├── stores/        # Pinia store (cart)
│   │   └── services/      # Axios API wrapper
│   └── vite.config.js
│
└── README.md

````

---

## 🚀 Getting Started

### 1️⃣ Backend API

📌 Requirements: Node.js >= 18, MongoDB (your Docker container already running).

```bash
cd shop-api
cp .env.example .env
npm install
npm run seed   # optional: insert demo data
npm run dev
````

🔗 Open API endpoints:

* Health check: [http://localhost:5000/api/health](http://localhost:5000/api/health)
* Categories: [http://localhost:5000/api/categories](http://localhost:5000/api/categories)
* Products: [http://localhost:5000/api/products](http://localhost:5000/api/products)

---

### 2️⃣ Frontend Web

📌 Requirements: Node.js >= 18

```bash
cd shop-web
npm install
npm run dev
```

🔗 Open app: [http://localhost:5173](http://localhost:5173)

You should now see:

* ✅ Categories sidebar
* ✅ Product listing with sorting & pagination
* ✅ Product details page
* ✅ Cart (client-side via Pinia)

---

## ⚙️ Environment Variables

Backend (`shop-api/.env`):

```ini
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shop
```

---

## 🧪 API Examples

* **List products (sorted by price desc, paginated):**

```
GET /api/products?sort=price_desc&page=1&limit=12
```

* **Search products (full-text search):**

```
GET /api/products?q=phone
```

* **Get one product by slug:**

```
GET /api/products/phone-x-128
```

---

## 🐳 Docker Setup

If you want a quick MongoDB container:

```bash
docker run -d \
  --name shop-mongo \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  mongo:6
```

