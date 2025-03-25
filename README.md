

# 🛡️ Subscription Tracker Backend

A subscription management system built using **Node.js**, **Express.js**, and **MongoDB**. This backend allows users to manage their subscriptions efficiently by creating, updating, and canceling subscriptions while also handling authentication and user management.

---

## 🚀 Features

- **Authentication & Authorization:**
  - User Sign-up, Sign-in, and Sign-out
  - JWT-based authentication
  - Secure password hashing using `bcryptjs`

- **Subscription Management:**
  - Create, Read, Update, and Delete subscriptions
  - Filter subscriptions by users
  - Cancel subscriptions
  - Fetch upcoming renewals
  - Automatic expiration of subscriptions past the renewal date

- **User Management:**
  - CRUD operations for user data

- **Middleware:**
  - Error handling middleware
  - Cookie parsing for authentication
  - Automatic subscription status updates based on renewal dates

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT, `bcryptjs`
- **Middleware:** `cookie-parser`, custom error handler
- **Environment:** `.env` configuration

---

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/utkarsh032/Subscription-Tracker.git
cd subscription-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a `.env` file** with the following environment variables:
```env
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

4. **Start the server**
```bash
npm run dev
```

---

## 🔥 API Endpoints

### 📌 **Authentication**
| METHOD | ENDPOINT           | DESCRIPTION          |
|--------|---------------------|-----------------------|
| POST   | `/api/v1/auth/sign-up`   | User registration    |
| POST   | `/api/v1/auth/sign-in`   | User login           |
| POST   | `/api/v1/auth/sign-out`  | User logout          |

### 📌 **Users**
| METHOD | ENDPOINT           | DESCRIPTION                |
|--------|---------------------|----------------------------|
| GET    | `/api/v1/users`         | Get all users              |
| GET    | `/api/v1/users/:id`     | Get user by ID             |
| POST   | `/api/v1/users`         | Create new user            |
| PUT    | `/api/v1/users/:id`     | Update user                |
| DELETE | `/api/v1/users/:id`     | Delete user                |

### 📌 **Subscriptions**
| METHOD | ENDPOINT                     | DESCRIPTION                       |
|--------|-------------------------------|-----------------------------------|
| GET    | `/api/v1/subcriptions`       | Get all subscriptions             |
| GET    | `/api/v1/subcriptions/:id`   | Get subscription by ID            |
| POST   | `/api/v1/subcriptions`       | Create new subscription           |
| PUT    | `/api/v1/subcriptions/:id`   | Update subscription               |
| DELETE | `/api/v1/subcriptions/:id`   | Delete subscription               |
| GET    | `/api/v1/subcriptions/user/:id` | Get all user subscriptions        |
| PUT    | `/api/v1/subcriptions/:id/cancel` | Cancel a subscription             |
| GET    | `/api/v1/subcriptions/upcoming-renewals` | Get upcoming renewals         |

---

## 🔥 How to Use

1. **Run the server**
```bash
npm run dev
```

2. **Test with Postman or Insomnia**
- Create a user by hitting `/api/v1/auth/sign-up`
- Authenticate using `/api/v1/auth/sign-in`
- Create subscriptions and manage them via the available endpoints
- Manage users with the CRUD operations

---

## 🚦 Error Handling

- Custom error middleware handles errors consistently across the app.
- Invalid routes and internal errors return proper error responses.

---

## 🔒 Security

- **JWT Authentication** for secure access
- **Bcrypt Password Hashing** for storing encrypted passwords
- **Environment Variables** for sensitive configurations

---

## 📚 Dependencies

- `express`: Fast and minimal Node.js framework
- `mongoose`: MongoDB ODM for schema modeling
- `jsonwebtoken`: JWT authentication
- `bcryptjs`: Password hashing
- `cookie-parser`: Middleware for parsing cookies
- `dotenv`: Environment variable management

---

## 🎯 Future Improvements

- Add pagination for large subscription lists
- Implement search and filter functionality
- Add subscription reminders and email notifications
- Role-based access control (RBAC) for admin and user roles

---

## 💡 Contribution

1. Fork the repo
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-branch`
5. Submit a pull request
---

✅ This README file accurately describes your backend architecture with clear details on the endpoints, schema, and future improvements. Let me know if you want any more modifications! 🚀

---
