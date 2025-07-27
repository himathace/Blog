# Blog Platform – Server (Backend)

This is the **server-side (backend)** of the Blog Platform app, built using **Node.js, Express, and MongoDB**. It provides RESTful APIs for user authentication, blog management, and file uploads.

> This folder is part of a full-stack MERN application. The frontend (React app) is located in the `/client` folder.

---

## Features

- User registration and login with JWT authentication
- Create, read, update, delete (CRUD) blog posts
- Protected routes and middleware
- MongoDB with Mongoose for schema modeling
- CORS support for connecting to frontend
- Secure password hashing with bcrypt

---

## Installation

### 1. Navigate to the `server` folder and install dependencies

```bash
cd server
npm install
```

### 2. Add Environment Variables

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Running the Server

Start the development server (with nodemon):

```bash
npm run dev
```




