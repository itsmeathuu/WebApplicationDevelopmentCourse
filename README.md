# 🧸 Nutri Toys — Toy Model E-Commerce Platform

A full-stack e-commerce web application for buying and managing toy models, built with **React + Vite** on the frontend and **Node.js + Express + MongoDB** on the backend.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-Latest-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-Latest-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat&logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat)

---

## 📌 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Run Flow](#run-flow)
- [Known Issues](#known-issues)

---

## Overview

Nutri Toys provides a clean and modern shopping experience for toy model enthusiasts. The platform supports:

- Customer-facing product browsing, cart, and order management
- Admin tools for managing users, products, and orders
- Owner-level role management
- Secure authentication with JWT (access + refresh tokens)

---

## Tech Stack

### Frontend
| Technology | Version |
|---|---|
| [React](https://react.dev/) | 18 |
| [Vite](https://vitejs.dev/) | Latest |
| [React Router DOM](https://reactrouter.com/) | Latest |
| [Axios](https://axios-http.com/) | Latest |
| [Tailwind CSS](https://tailwindcss.com/) | Latest |
| [Font Awesome](https://fontawesome.com/) / [React Icons](https://react-icons.github.io/react-icons/) | Latest |

### Backend
| Technology | Version |
|---|---|
| [Node.js](https://nodejs.org/) | 20 |
| [Express.js](https://expressjs.com/) | Latest |
| [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) | Latest |
| [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken) | Latest |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Latest |
| [multer](https://github.com/expressjs/multer) | Latest |
| [Nodemon](https://nodemon.io/) | Latest |

---

## Features

### 👤 Users
- Register and log in
- Browse, search, and filter products
- View product details and reviews
- Add to cart and manage quantities
- Place orders and track order history
- Submit product reviews
- Update profile and change password

### 🛠️ Admins
- Manage products and product images
- Manage users
- View and update all orders

### 👑 Owners
- Assign and change user roles

---

## Project Structure

```
.
├── Web_nhom1/          # Frontend — React + Vite
└── Web_backend1/       # Backend — Node.js + Express
    ├── controllers/    # HTTP request handlers
    ├── services/       # Business logic
    ├── middlewares/    # Auth & file upload middleware
    ├── routes/         # API endpoint definitions
    ├── models/         # Mongoose schemas
    └── config/         # Database connection
```

---

## Getting Started

### Prerequisites

- Node.js `>= 20.x`
- npm `>= 10.x`
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))
- Git

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd Web_backend1

# 2. Install dependencies
npm install

# 3. Create and configure .env (see Environment Variables below)

# 4. Start the server
npm start
```

Verify the backend is running by visiting: `http://localhost:8080/`  
Expected response: `Welcome to Toykingdom Server`

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd Web_nhom1

# 2. Install dependencies
npm install

# 3. Create and configure .env (see Environment Variables below)

# 4. Start the dev server
npm run dev -- --host 127.0.0.1 --port 5173
```

Open the app at: `http://localhost:5173`

---

## Environment Variables

### `Web_backend1/.env`

```env
PORT=8080
CONNECTION_STRING=mongodb://127.0.0.1:27017/toykingdom
ACCESS_TOKEN_PRI_KEY=your_access_secret
REFRESH_TOKEN_PRI_KEY=your_refresh_secret
ACCESSS_TOKEN_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d
SALT_LENGTH=10
```

### `Web_nhom1/.env`

```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## Run Flow

1. Start **MongoDB** (local instance or ensure Atlas connection is active)
2. Start the **backend** — `cd Web_backend1 && npm start`
3. Start the **frontend** — `cd Web_nhom1 && npm run dev`
4. Open `http://localhost:5173` in your browser
5. Sign up or log in with an existing account
6. Admins can manage products, users, and orders from the dashboard

---

## Known Issues

> Applies to **macOS Apple Silicon (M1/M2/M3)** machines

The frontend may fail to build due to missing native Rollup binaries or incorrect Vite permissions.

**Fix:**

```bash
cd Web_nhom1
rm -rf node_modules package-lock.json
npm install
chmod +x node_modules/.bin/vite
npm run dev
```

If the issue persists, ensure your Node.js version matches `>= 20.x` and was installed via a native ARM build (not Rosetta).

---

## 📬 Contact

For questions, bug reports, or contributions, please open an issue or submit a pull request.