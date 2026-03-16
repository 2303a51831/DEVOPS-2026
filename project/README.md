# 📊 Node.js + MongoDB Dashboard

A full-stack dashboard with Express.js backend and MongoDB, featuring a dark-themed admin UI.

## 🗂️ Project Structure

```
dashboard-app/
├── config/
│   └── db.js           # MongoDB connection
├── models/
│   ├── User.js         # User schema
│   └── Order.js        # Order schema
├── routes/
│   ├── users.js        # User CRUD API
│   └── orders.js       # Order CRUD + stats API
├── public/
│   └── index.html      # Frontend dashboard
├── server.js           # Express entry point
├── seed.js             # Database seeder
├── .env.example        # Environment vars template
└── package.json
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd dashboard-app
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your MongoDB URI
```

**Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/dashboard_db
```

**MongoDB Atlas (Cloud):**
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/dashboard_db
```

### 3. Seed the Database (optional)
```bash
node seed.js
# Seeds 5 users and 40 orders
```

### 4. Start the Server
```bash
npm start          # production
npm run dev        # with nodemon (auto-restart)
```

### 5. Open in Browser
```
http://localhost:5000
```

---

## 📡 API Reference

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List users (search, filter, paginate) |
| GET | `/api/users/:id` | Get single user |
| POST | `/api/users` | Create user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

**Query params:** `?page=1&limit=10&search=alice&status=Active&role=Admin`

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | List orders (search, filter, paginate) |
| GET | `/api/orders/stats/summary` | Dashboard stats + charts |
| GET | `/api/orders/:id` | Get single order |
| POST | `/api/orders` | Create order |
| PUT | `/api/orders/:id` | Update order |
| DELETE | `/api/orders/:id` | Delete order |

### Health Check
```
GET /api/health
```

---

## 🎛️ Dashboard Features

- **Overview** — Revenue chart (bar), Orders by status (donut), recent orders table, 4 stat cards
- **Orders** — Full CRUD table with search, status/category filters, pagination
- **Users** — Full CRUD table with search, role/status filters, pagination
- Live clock badge & MongoDB connection indicator

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB
- **Frontend:** Vanilla HTML/CSS/JS, Chart.js
- **Fonts:** Syne, DM Mono (Google Fonts)
