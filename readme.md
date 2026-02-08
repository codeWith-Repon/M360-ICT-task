# M360 ICT HR Management Backend

RESTful API for HR management: employee CRUD, daily attendance tracking, monthly reports.

## Features

- JWT authentication for HR users
- Employee management (create, read, update, delete + photo upload + soft delete)
- Attendance recording (upsert per day, filters by employee/date range, update, delete)
- Monthly attendance summary report (days present + late arrivals)

## Tech Stack

- Node.js + TypeScript
- Express
- Knex.js (query builder)
- PostgreSQL
- Joi (validation)
- Multer + Cloudinary (file uploads)
- bcrypt + jsonwebtoken

## Setup Instructions

1. Clone the repo:

```bash
   git clone https://github.com/codeWith-Repon/hr-management

   cd hr-management
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` from .`env.example` and fill values:

```bash
# Database (PostgreSQL)
DATABASE_URL=

PORT=5000
NODE_ENV=development

# hrAdmin credentials (for seeding initial user)
HR_ADMIN_EMAIL=hradmin@360ict.com
HR_ADMIN_PASSWORD=123456

# JWT Configuration
JWT_SECRET=
JWT_EXPIRES_IN=7
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=

# Bcrypt Configuration
SALT_ROUNDS=

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

4. Run migrations:

```bash
npm run migrate
```

5. Start development server:

```
npm run dev
```

The server automatically creates a default HR user on first run if none exists:

- Email: admin@m360ict.com
- Password: 123456

### Authentication Handling

This project implements a hybrid authentication approach for maximum flexibility and security:

- **Bearer Token**: The `accessToken` is returned in the response body on successful login. Use this in the `Authorization` header as `Bearer <token>` for API requests (Postman/Mobile).
- **HttpOnly Cookie**: The `accessToken` (or `refreshToken`) is also automatically set in a secure, `HttpOnly` cookie. This prevents XSS attacks and allows web browsers to handle sessions automatically.

Key Endpoints

- POST /auth/login → {email, password}
- GET /employees?search=rahim&page=1&limit=10
- POST /employees → multipart/form-data with 'file' field
- POST /attendance → {employee_id, date, check_in_time}
- GET /reports/attendance?month=2025-08&employee_id=5

**Notes**

- Photos saved to /uploads/ folder
- Late arrival = check_in_time > 09:45:00
- Soft delete for employees (excluded from lists)

**Postman Collection**

To make testing easier, a Postman collection is included in the root directory:

File Name: M 360 It.postman_collection.json

How to use: Import this file into Postman to see all pre-configured endpoints, including environment variables and request bodies.
