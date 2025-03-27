

# 🛡️ Subscription Tracker Backend

### 🌐 Deployed API URL: https://subscription-tracker-zb3s.onrender.com

A subscription management system built using **Node.js**, **Express.js**, and **MongoDB**. This backend allows users to manage their subscriptions efficiently by creating, updating, and canceling subscriptions, while also handling authentication, workflow automation, and user management.

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

- **Workflow Automation:**
  - Trigger subscription reminders via automated workflows
  - Retry failed workflows
  - Integration with external services for reminders

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
- **Workflow:** External workflow automation with retry handling

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
SERVER_URL=http://localhost:5000
WORKFLOW_CLIENT_API_KEY=<your_workflow_api_key>
```

4. **Start the server**
```bash
npm run dev
```

---

## 🔥 API Endpoints

### 📌 **Authentication**
| METHOD | ENDPOINT                 | DESCRIPTION          |
|--------|---------------------------|-----------------------|
| POST   | `/api/v1/auth/sign-up`    | User registration    |
| POST   | `/api/v1/auth/sign-in`    | User login           |
| POST   | `/api/v1/auth/sign-out`   | User logout          |

### 📌 **Users**
| METHOD | ENDPOINT                  | DESCRIPTION                |
|--------|----------------------------|----------------------------|
| GET    | `/api/v1/users`            | Get all users              |
| GET    | `/api/v1/users/:id`        | Get user by ID             |
| POST   | `/api/v1/users`            | Create new user            |
| PUT    | `/api/v1/users/:id`        | Update user                |
| DELETE | `/api/v1/users/:id`        | Delete user                |

### 📌 **Subscriptions**
| METHOD | ENDPOINT                      | DESCRIPTION                       |
|--------|--------------------------------|-----------------------------------|
| GET    | `/api/v1/subscriptions`       | Get all subscriptions             |
| GET    | `/api/v1/subscriptions/:id`   | Get subscription by ID            |
| POST   | `/api/v1/subscriptions`       | Create new subscription with workflow trigger |
| PUT    | `/api/v1/subscriptions/:id`   | Update subscription               |
| DELETE | `/api/v1/subscriptions/:id`   | Delete subscription               |
| GET    | `/api/v1/subscriptions/user/:id` | Get all user subscriptions        |
| PUT    | `/api/v1/subscriptions/:id/cancel` | Cancel a subscription             |
| GET    | `/api/v1/subscriptions/upcoming-renewals` | Get upcoming renewals         |

### 📌 **Workflow Automation**
| METHOD | ENDPOINT                         | DESCRIPTION                  |
|--------|----------------------------------|------------------------------|
| POST   | `/api/v1/workflows/subscription/reminder` | Trigger subscription reminder |

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
- Trigger workflow reminders automatically for subscriptions
- Manage users with the CRUD operations

---

## 🚦 Workflow Automation Details

- When creating a new subscription, the server triggers a workflow:
```javascript
const { workflowRunId } = await workflowClient.trigger({
  url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
  body: JSON.stringify({ subscriptionId: subscription.id }),
  headers: {
    'Content-Type': 'application/json'
  },
  retries: 0
})
```
- The workflow handles:
  - Sending reminders
  - Retry mechanism for failed triggers
  - Logs the workflowRunId for tracking

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
- `axios`: HTTP requests for workflow automation

---

## 🎯 Future Improvements

- Add pagination for large subscription lists
- Implement search and filter functionality
- Improve workflow automation with more external integrations
- Add email notifications for reminders
- Role-based access control (RBAC) for admin and user roles

---

## 💡 Contribution

1. Fork the repo
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-branch`
5. Submit a pull request

---

✅ This README now reflects the latest changes, including **workflow automation** and the subscription management enhancements. Let me know if you need further modifications or clarifications! 🚀
