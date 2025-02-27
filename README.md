# Personal Loan Application Technical Test

Welcome to the **Personal Loan Application** backend technical test! This project is designed to assess your ability to build a backend application using **Node.js**, **Express.js**, and **PostgreSQL** while implementing features for user authentication, loan management, and loan payments. The app should also be containerized using **Docker**.

---

## Context

You will develop a backend API that:

1. Allows users to register and apply for personal loans.
2. Allows authenticated users to manage their loans and make payments.
3. Includes payments management, loan balance tracking, and loan history.

Your solution should demonstrate your expertise in:

- Backend development using **Node.js**.
- API design and implementation.
- Database design and management with **PostgreSQL**.
- Dockerization of the application for easy deployment.
- Writing modular, clean, and testable code.

---

## Requirements

### Core Features

1. **User Registration and Authentication**

   - Users must be able to register by providing their `name`, `email`, and `password`.
   - Authentication should be implemented using **JWT (JSON Web Tokens)**.
   - Secured endpoints should be accessible only to authenticated users.

2. **Loan Management**

   - Users should be able to:
     - Apply for a loan by specifying:
       - Loan amount.
       - Purpose of the loan.
       - Duration of the loan (in months).
     - View the status of their loans.
     - Loan statuses: **Pending**, **Approved**, or **Rejected**.
   - An endpoint should allow a loan's status to be updated to **Approved** or **Rejected** (e.g., simulating administrative approval).

3. **Payments Management**

   - Users must be able to make payments toward their loan balance.
   - Payment details should include:
     - Loan ID.
     - Amount paid.
     - Payment date.
   - The loan's updated remaining balance should be calculated and stored after each payment.
   - A user's loan payment history should be retrievable via an API endpoint.

4. **Summary of Loan Details**
   - Users should be able to retrieve:
     - Loan total amount.
     - Total paid so far.
     - Remaining balance.
     - Loan status.

---

## Database Schema

You should use **PostgreSQL** to design and implement the database for the application. The following schema is recommended:

### 1. User Table

| Column Name  | Type            | Description                |
| ------------ | --------------- | -------------------------- |
| `id`         | Integer (PK)    | User's unique identifier.  |
| `name`       | String          | User's full name.          |
| `email`      | String (Unique) | User's email address.      |
| `password`   | String          | Hashed password.           |
| `created_at` | Timestamp       | Time of user registration. |

### 2. Loan Table

| Column Name         | Type         | Description                                      |
| ------------------- | ------------ | ------------------------------------------------ |
| `id`                | Integer (PK) | Loan's unique identifier.                        |
| `user_id`           | Integer (FK) | Foreign key referencing a user.                  |
| `amount`            | Float        | Total loan amount.                               |
| `purpose`           | String       | Purpose of the loan.                             |
| `duration`          | Integer      | Loan duration in months.                         |
| `status`            | String       | Loan status (`Pending`, `Approved`, `Rejected`). |
| `total_paid`        | Float        | Sum of all payments.                             |
| `remaining_balance` | Float        | Outstanding balance of the loan.                 |
| `created_at`        | Timestamp    | Time of loan application.                        |

### 3. Payment Table

| Column Name    | Type         | Description                                |
| -------------- | ------------ | ------------------------------------------ |
| `id`           | Integer (PK) | Payment's unique identifier.               |
| `loan_id`      | Integer (FK) | Foreign key referencing a loan.            |
| `amount_paid`  | Float        | Payment amount.                            |
| `payment_date` | Date         | Date of payment.                           |
| `created_at`   | Timestamp    | Timestamp of when this record was created. |

---

## API Endpoints

You are expected to implement the following RESTful API endpoints:

### User Authentication

| HTTP Method | Endpoint              | Description                            | Auth Required |
| ----------- | --------------------- | -------------------------------------- | ------------- |
| POST        | `/api/users/register` | Register a new user.                   | No            |
| POST        | `/api/users/login`    | Authenticate and retrieve a JWT token. | No            |

### Loan Management

| HTTP Method | Endpoint                | Description                                                | Auth Required    |
| ----------- | ----------------------- | ---------------------------------------------------------- | ---------------- |
| POST        | `/api/loans`            | Submit a new loan application.                             | Yes              |
| GET         | `/api/loans`            | Retrieve all loans for the logged-in user.                 | Yes              |
| GET         | `/api/loans/:id`        | Retrieve details of a specific loan.                       | Yes              |
| PATCH       | `/api/loans/:id/status` | Update the status of a loan (Pending → Approved/Rejected). | Yes (Admin only) |

### Payments

| HTTP Method | Endpoint                  | Description                                      | Auth Required |
| ----------- | ------------------------- | ------------------------------------------------ | ------------- |
| POST        | `/api/payments`           | Make a payment for a loan.                       | Yes           |
| GET         | `/api/loans/:id/payments` | Retrieve the payment history of a specific loan. | Yes           |

---

## Deliverables

The following items must be part of the submission:

1. **Source Code**:

   - The backend application, organized and modular.
   - Implementation of the required API endpoints.

2. **Database Management**:

   - Include SQL scripts or migrations for creating the database schema.

3. **Docker Setup**:

   - A `Dockerfile` to containerize the Node.js application.
   - A `docker-compose.yml` to orchestrate the app with a PostgreSQL database.

4. **Testing**:

   - Write at least 3 unit tests covering the key features of the application (e.g., loan creation, payment processing, or JWT authentication).

5. **Documentation**:
   - Include a `README.md` (this file) with:
     - **Setup Instructions**: Steps to build and run the application using Docker Compose.
     - **Explanation of API Endpoints**: Include example requests and responses.
     - **Assumptions**: Clarify any assumptions made during implementation.

---

## Evaluation Criteria

You will be evaluated based on the following:

1. **API Design**:

   - RESTful conventions, consistency, and correctness.
   - Proper HTTP status codes and detailed error handling.

2. **Code Quality**:

   - Modular, maintainable, and well-documented code.
   - Use of best practices such as validation, middleware, environment variables, and security practices.

3. **Database Design**:

   - Efficient schema design and relationships between entities.
   - Correct calculations for loan balances and payments.

4. **Docker and Deployment**:

   - Functional Dockerfile and Docker Compose setup.
   - Ease of local deployment using containers.

5. **Documentation**:

   - Clear `README.md` with well-explained setup and usage instructions.

6. **Bonus Points**:
   - Database migrations with tools like Sequelize or Knex.js.
   - Advanced security features, such as bcrypt for password hashing or rate limiting.
   - Pagination for listing loans or payments.
   - Logging mechanisms for user actions.

---

## Getting Started

Here are the steps to get started:

Here are the steps to get started:

1. Fork the repository.
2. Send the email with the repository URL to me after you completed the solution.

---

Good luck, and happy coding! 🚀

## Documentation

### **Prerequisites**

- Docker: latest
- Node.js: 18+
- PostgreSQL: 14+

---

### **Clone the Repository**

```bash
git clone https://github.com/MenuMarino/mid-senior-test.git
cd mid-senior-test
```

---

### **Setup Environment Variables**

Create a `.env` file in the project root with:

```
# Database configuration
DB_USER=user            # Database username (must match docker-compose.yml)
DB_PASSWORD=password    # Database password (must match docker-compose.yml)
DB_HOST=db              # Docker service name
DB_PORT=5432            # Default PostgreSQL port
DB_NAME=personal_loan   # Database name

# Server configuration
PORT=5000               # Optional. Default is 5000

# JWT configuration
JWT_SECRET=your-secret  # Secret to create the JWTs

# Default admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

If port `5000` is already in use by another service on your machine, update docker-compose.yml to use a different local port. For example, change it to `5001`:

```yaml
ports:
  - '5001:5000'
```

---

### **Start the application**

Run the following command to start the containers:

```bash
docker compose --profile dev up --build -d
```

### **Run Tests**

Run the following command to start the containers:

```bash
docker compose --profile test up --build -d
```

---

### **Verify the API is running**

Once the containers are up, test if the backend is working.

#### **Test the API:**

```bash
curl http://localhost:5000
```

If you changed the port (e.g., `5001`), run:

```bash
curl http://localhost:5001
```

#### **Expected message:**

```json
{ "message": "Personal Loan Application is running!" }
```

### **Logging**

If you want to see the logs, you can execute the following command:

```bash
docker exec -it personal_loan_app cat logs/app.log
```

## **API Endpoints**

### **User registration**

**Endpoint:**

```
POST /api/users/register
```

#### **📌 Request body (JSON)**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secretpassword"
}
```

#### **📌 Response (Success - 201)**

```json
{
  "message": "User registered successfully!",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2025-02-26T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

- The token should be sent in the `Authorization` header for protected routes.

#### **Response (Email already exists - 400)**

```json
{
  "message": "Email is already registered."
}
```

#### **Response (Validation error - 400)**

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Name is required.",
      "path": "name",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Valid email is required.",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Password must be at least 6 characters.",
      "path": "password",
      "location": "body"
    }
  ]
}
```

---

### **User login**

**Endpoint:**

```
POST /api/users/login
```

#### **Request body (JSON)**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### **Response (Success - 200)**

```json
{
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

- The token should be sent in the `Authorization` header for protected routes.

#### **Response (Invalid credentials - 400)**

```json
{
  "message": "Invalid email or password."
}
```

#### **Response (Validation error - 400)**

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Valid email is required.",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Password is required.",
      "path": "password",
      "location": "body"
    }
  ]
}
```

### **Loan management (Protected routes)**

**Endpoint:**

```
POST `/api/loans`
```

#### **Request body (JSON)**

```json
{
  "amount": 1000,
  "purpose": "string",
  "duration": 12
}
```

#### **Response (Success - 200)**

```json
{
  "message": "Loan application submitted",
  "loan": {
    "id": 1,
    "user_id": 1,
    "amount": 1000,
    "purpose": "string",
    "duration": 12,
    "status": "Pending",
    "total_paid": 0,
    "remaining_balance": 1000,
    "created_at": "2025-02-27T13:26:43.136Z"
  }
}
```

#### **Response (Invalid credentials - 400)**

```json
{
  "message": "Invalid token."
}
```

#### **Response (Validation error - 400)**

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Amount must be a positive number.",
      "path": "amount",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Purpose is required.",
      "path": "purpose",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Duration must be a positive integer.",
      "path": "duration",
      "location": "body"
    }
  ]
}
```

**Endpoint:**

```
GET `/api/loans`
```

**Query Parameters (Optional)**
| Parameter | Type | Description |
|------------|--------|-------------|
| `cursor` | `string (ISO 8601 date)` | Used for cursor based pagination. Set this to the `nextCursor` value from the previous response to fetch the next page. |
| `limit` | `integer` | Number of records per request (default: 10, max: 50). |

#### **Response (Success - 200)**

```json
{
  "loans": [
    {
      "id": 1,
      "user_id": 1,
      "amount": 1000,
      "purpose": "string",
      "duration": 12,
      "status": "Pending",
      "total_paid": 0,
      "remaining_balance": 1000,
      "created_at": "2025-02-27T13:26:43.136Z"
    }
  ],
  "nextCursor": "2025-02-27T13:26:43.136Z"
}
```

#### **Response (Invalid credentials - 400)**

```json
{
  "message": "Invalid token."
}
```

**Endpoint:**

```
GET `/api/loans/:id`
```

#### **Response (Success - 200)**

```json
{
  "loan": {
    "id": 1,
    "user_id": 1,
    "amount": 1000,
    "purpose": "string",
    "duration": 12,
    "status": "Pending",
    "total_paid": 0,
    "remaining_balance": 1000,
    "created_at": "2025-02-27T13:26:43.136Z"
  }
}
```

#### **Response (Invalid credentials - 400)**

```json
{
  "message": "Invalid token."
}
```

**Endpoint:**

```
PATCH `/api/loans/:id/status`
```

#### **Response (Success - 200)**

```json
{
  "message": "Loan status updated",
  "loan": {
    "id": 1,
    "user_id": 1,
    "amount": 1000,
    "purpose": "lol",
    "duration": 12,
    "status": "Approved",
    "total_paid": 90,
    "remaining_balance": 910,
    "created_at": "2025-02-27T13:26:43.136Z"
  }
}
```

#### **Response (Invalid credentials - 400)**

```json
{
  "message": "Invalid token."
}
```

#### **Response (Non admin credentials - 400)**

```json
{
  "message": "Access denied. Admins only."
}
```

#### **Response (Validation error - 400)**

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Status must be either \"Approved\" or \"Rejected\".",
      "path": "status",
      "location": "body"
    }
  ]
}
```

### **Loans payments (Protected routes)**

**Endpoint:**

```
POST `/api/payments/`
```

#### **Request body (JSON)**

```json
{
  "loanId": 1,
  "amountPaid": 10
}
```

#### **Response (Success - 200)**

```json
{
  "message": "Payment successful",
  "payment": {
    "id": 1,
    "loan_id": 1,
    "amount_paid": 10,
    "payment_date": "2025-02-27",
    "created_at": "2025-02-27T14:20:31.777Z"
  }
}
```

#### **Response (Invalid credentials - 400)**

```json
{
  "message": "Invalid token."
}
```

#### **Response (Validation error - 400)**

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Loan ID must be an integer.",
      "path": "loanId",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Amount paid must be a positive number.",
      "path": "amountPaid",
      "location": "body"
    }
  ]
}
```

**Endpoint:**

```
POST `/api/loans/:id/payments`
```

**Query Parameters (Optional)**
| Parameter | Type | Description |
|------------|--------|-------------|
| `cursor` | `string (ISO 8601 date)` | Used for cursor based pagination. Set this to the `nextCursor` value from the previous response to fetch the next page. |
| `limit` | `integer` | Number of records per request (default: 10, max: 50). |

#### **Response (Success - 200)**

```json
{
    "payments": [
        {
            "id": 1,
            "loan_id": 1,
            "amount_paid": 10,
            "payment_date": "2025-02-27",
            "created_at": "2025-02-27T14:20:31.777Z"
        },
        ...
    ]
}
```

#### **Response (Invalid credentials - 400)**

```json
{
  "message": "Invalid token."
}
```

#### **Response (Validation error - 400)**

```json
{
  "message": "Loan not found."
}
```
