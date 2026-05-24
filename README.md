# Nutri Toys - Toy Model E-commerce Website

## 1. Project Overview

Nutri Toys is an e-commerce system for selling toy models, developed as a split application with a **Frontend** and **Backend**. The project aims to provide a simple, modern, and user-friendly online shopping experience while supporting product, user, and order management for administrative roles.

### Main objectives
- Present product categories and details in a professional and searchable way.
- Allow users to register, log in, add products to the cart, place orders, and view order history.
- Provide admin/owner functionality to manage users, products, product images, and orders.
- Implement basic security using JWT, role-based access control, and token handling.

## 2. Project Structure

- **Web_nhom1**: React + Vite frontend application
- **Web_backend1**: Node.js + Express + MongoDB backend API

## 3. Technologies Used

### Frontend
- React 18
- React Router DOM
- Vite
- Axios
- Tailwind CSS
- Font Awesome / React Icons
- ESLint

### Backend
- Node.js 20
- Express.js
- MongoDB + Mongoose
- JWT (access token / refresh token)
- bcryptjs
- multer
- dotenv
- CORS
- Nodemon

### Infrastructure & Support
- MongoDB Atlas / Local MongoDB
- REST API
- Role-based access control: user, admin, owner, registered

## 4. Main Features

### For Users
- Sign up and sign in
- View the list of products
- Search, filter, and view product details
- Add products to the cart
- Update cart quantities
- Place orders and view order history
- View and submit product reviews
- Update personal profile and change password

### For Admins
- Manage products
- Manage product images
- Manage users
- View all orders
- Update or delete products and users

### For Owners
- Change user roles

## 5. System Architecture

### Frontend
The SPA is built with React, uses React Router for navigation, and communicates with the backend through Axios. The main pages include:
- Home
- Product detail page
- Cart / checkout page
- User profile page
- Order history page
- Admin dashboard

### Backend
The backend is built with Express and organized into the following modules:
- **controllers**: handle HTTP requests and responses
- **services**: contain the business logic
- **middlewares**: handle token validation and file upload
- **routes**: define API endpoints
- **config**: manage MongoDB connections
- **models**: define Mongoose schemas

## 6. Installation and Run Guide

### Prerequisites
- Node.js 20.x
- npm 10.x
- MongoDB (local or Atlas)
- Git

### 6.1 Backend Setup

1. Open a terminal and go to the backend directory:
   `cd Web_backend1`

2. Install dependencies:
   `npm install`

3. Create a `.env` file in `Web_backend1` with the following example:
   ```env
   PORT=8080
   CONNECTION_STRING=mongodb://127.0.0.1:27017/toykingdom
   ACCESS_TOKEN_PRI_KEY=your_access_key
   REFRESH_TOKEN_PRI_KEY=your_refresh_key
   ACCESSS_TOKEN_EXPIRES_IN=1h
   REFRESH_TOKEN_EXPIRES_IN=7d
   SALT_LENGTH=10
   ```

4. Start the backend:
   `npm start`

5. Verify the backend is running:
   Open `http://localhost:8080/`

### 6.2 Frontend Setup

1. Open a terminal and go to the frontend directory:
   `cd Web_nhom1`

2. Install dependencies:
   `npm install`

3. Create a `.env` file in `Web_nhom1` if needed for API configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```

4. Start the frontend:
   `npm run dev -- --host 127.0.0.1 --port 5173`

5. Open the browser at:
   `http://localhost:5173`

## 7. Recommended Run Flow

1. Start MongoDB.
2. Start the backend first to ensure the APIs are available.
3. Start the frontend so it can connect to the backend.
4. Sign up or use an existing admin account.
5. Manage products, users, and orders from the admin interface.

## 8. Current Environment Notes

In the current test environment, the backend was verified to run successfully by starting the server and calling the root endpoint, which returned:
- `Welcome to Toykingdom Server`

The frontend is currently blocked by environment issues on this machine:
- `npm run build` fails because the `vite` binary does not have execute permission.
- `npm run dev` and `npm run build` also fail because the native Rollup package for macOS Apple Silicon is missing.

If you encounter the same issue, try the following:
1. Remove `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Check the executable permission of `node_modules/.bin/vite`

## 9. Project Summary

Nutri Toys is an e-commerce project for the toy model industry, combining:
- A modern, extensible React frontend
- A secure Node.js/Express backend with role-based access control
- MongoDB for flexible data storage for products, users, carts, and orders

This project is suitable for demo purposes, academic assignments, or future expansion with features such as online payment, discount codes, order tracking, and cloud hosting integration.

## 10. Contact

If you need further support, I can help with:
- Expanding this README into a more detailed documentation set
- Standardizing environment variables
- Fixing frontend/backend runtime issues