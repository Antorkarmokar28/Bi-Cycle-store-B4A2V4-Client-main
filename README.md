# 🚴 Rideology - Bicycle Store Application

**Rideology** is a full-stack web application built for a modern bicycle store. It features secure role-based authentication, a user-friendly interface, responsive design, and complete product and order management. Rideology is designed to deliver a seamless shopping experience for customers and robust control for administrators.

---

## 🧭 Project Overview & Objective

The goal of **Rideology** is to provide:
- A responsive and visually appealing bicycle e-commerce experience.
- Secure login and registration with role-based access.
- Dynamic search and filtering of products.
- A robust admin dashboard to manage users, products, and orders.

---

## ✨ Main Functionalities (45 Marks)

### 🔐 1. User Registration & Authentication (Role-Based)
- **Registration & Login**: Users register using name, email, and password (securely hashed). Default role: `customer`.
- **JWT Authentication**: Token generated on login and stored in `localStorage` for protected routes.
- **Role Management**:
  - `customer`: Can purchase bicycles and view orders.
  - `admin`: Can manage products, orders, and users.
- **Logout**: Clears token and redirects to login page.

---

### 🌐 2. Public Routes

#### 🏠 Home Page (Rideology Landing)
- **Navbar**: Includes Rideology logo, navigation items, and auth buttons.
- **Banner**: Highlight offers or latest collections (carousel optional).
- **Featured Bicycles**: Display up to 6 bicycles with a "View All" link.
- **Extra Section**: Testimonials, Subscrib to news latter.
- **Footer**: Important links, contact info, social media icons.

#### 🚲 All Bicycles Page
- **Search**: Real-time search by brand, model, or category.
- **Filters**: Filter products by price, brand, model, category, availability.
- **Dynamic Updates**: Results change based on filters and search.
- **Cards**: Bicycle info with image, price, specs, and "View Details".

#### 🔍 Bicycle Details Page
- Display a full-size image, specifications, and pricing.
- **Buy Now** button takes user to checkout.

#### ℹ️ About Page
- Information about Rideology’s mission, values, and vision.

### 🔒 3. Private Routes

#### 🛒 Checkout Page
- **Order Form**: Collects product and user details, shows total price.
- **Stock Management**: Prevents orders exceeding stock.
- **Payment Integration**: Stripe / SurjoPay supported.
- **Order Now** button finalizes the transaction.

#### 🧑‍💼 Dashboard (Role-Based)

##### Admin Dashboard:
- **User Management**: View, deactivate, or update users.
- **Product Management**: Add, update, or delete bicycles.
- **Order Management**: Fulfill or cancel orders.

##### User Dashboard:
- View past orders.
- Update profile info and password (with current password check).

---

## 🎨 UI/UX Design
- **Responsive Design**: Works across desktop, tablet, and mobile devices.
- **User-Friendly Errors**:
  - Wrong login credentials.
  - Duplicate registration attempts.
  - Out-of-stock errors.
- **Loading States**: Spinners shown during data fetching and API calls.
- **Toasts/Alerts**: Instant feedback for login, order, and more.

---


## 🌟 Optional Features (Bonus)

### 🧍‍♂️ User Side

#### 🚴 Bicycle Comparison Tool
- Compare up to 3 bicycles by specs, price, and features.

### 👨‍💼 Admin Side

#### 📊 Sales Dashboard
- **Visual Overview**: Charts to display key sales data.
- **Key Metrics**:
  - Total Sales Revenue (by date range)
  - Total Units Sold
  - Top-Selling Bicycles

---

## ⚙️ Tech Stack

- **Frontend**: React Tailwind CSS
- **State Management**: Redux Toolkit, RTK Query
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Payment**: Stripe / SurjoPay
- **Charts**: Recharts or Chart.js (for dashboard)

---

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Antorkarmokar28/Bi-Cycle-store-B4A2V4-Client-main.git
