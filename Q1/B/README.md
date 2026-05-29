# Online Shopping System - MERN Stack

## Project Structure

```
Q1/B/
├── backend/
│   ├── models/
│   │   ├── User.js       <- User schema
│   │   ├── Product.js    <- Product schema
│   │   └── Order.js      <- Order schema
│   ├── routes/
│   │   ├── auth.js       <- Register & Login APIs
│   │   ├── products.js   <- Product APIs
│   │   └── orders.js     <- Order APIs
│   ├── .env
│   ├── package.json
│   └── server.js         <- Main Express server
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── Navbar.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Products.js
    │   │   ├── ProductDetail.js
    │   │   ├── Cart.js
    │   │   ├── Orders.js
    │   │   └── AddProduct.js
    │   ├── App.js
    │   ├── App.css
    │   ├── api.js         <- All axios API calls
    │   └── index.js
    └── package.json
```

## How to Run

### Step 1 - Start MongoDB
Make sure MongoDB is running on your machine (default port 27017).

### Step 2 - Start Backend
```bash
cd backend
npm install
npm start
```
Backend runs at: http://localhost:5000

### Step 3 - Start Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs at: http://localhost:3000

---

## API Endpoints

| Method | Route                     | Description         |
|--------|---------------------------|---------------------|
| POST   | /api/auth/register        | Register user       |
| POST   | /api/auth/login           | Login user          |
| GET    | /api/products             | Get all products    |
| GET    | /api/products?search=xxx  | Search products     |
| GET    | /api/products/:id         | Get one product     |
| POST   | /api/products             | Add product         |
| POST   | /api/orders               | Place order         |
| GET    | /api/orders/:userId       | Get user orders     |

---

## MongoDB Models

### User
- name, email, password

### Product
- name, description, price, category, stock

### Order
- userId, items[], totalAmount, status

---

## Tech Stack
- **Frontend**: React, Bootstrap, Axios, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
