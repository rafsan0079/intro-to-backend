# Intro to Backend

A beginner-friendly REST API built with **Node.js**, **Express** and **MongoDB**, made while learning backend development.

It covers user registration, login and logout with hashed passwords, plus full CRUD (create, read, update, delete) for posts.

## Tech stack

- [Node.js](https://nodejs.org/) (ES modules)
- [Express 5](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose 9](https://mongoosejs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing
- [dotenv](https://www.npmjs.com/package/dotenv) for environment variables
- [nodemon](https://www.npmjs.com/package/nodemon) for auto-restart during development

## Project structure

```
intro-to-backend/
├── backend/
│   └── src/
│       ├── config/
│       │   ├── constants.js         # shared constants
│       │   └── database.js          # MongoDB connection
│       ├── controllers/
│       │   ├── user.controller.js   # register, login, logout
│       │   └── post.controller.js   # post CRUD
│       ├── models/
│       │   ├── user.model.js        # User schema + password hashing
│       │   └── post.model.js        # Post schema
│       ├── routes/
│       │   ├── user.route.js
│       │   └── post.route.js
│       ├── app.js                   # Express app and routes
│       └── index.js                 # entry point: connects DB, starts server
├── .env.example
├── package.json
└── README.md
```

## Getting started

### Prerequisites

- Node.js 18 or newer
- A MongoDB database (local, or a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
git clone https://github.com/rafsan0079/intro-to-backend.git
cd intro-to-backend
npm install
```

### Environment variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env
```

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server listens on (defaults to `8000`) | `4000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/intro-to-backend` |

> Never commit your `.env` file. It is already listed in `.gitignore`.

### Run the server

```bash
# development (restarts on file changes)
npm run dev

# production
npm start
```

When it starts you should see:

```
MongoDB connected !!!
Server is running on port : 4000
```

## API reference

Base URL: `http://localhost:4000/api/v1`

All request bodies are JSON, so set the header `Content-Type: application/json`.

### Users

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/users/register` | `username`, `email`, `password` | Create a new account |
| POST | `/users/login` | `email`, `password` | Log in |
| POST | `/users/logout` | `email` | Log out |

**Register**

```http
POST /api/v1/users/register
```
```json
{
  "username": "rafsan",
  "email": "rafsan@example.com",
  "password": "secret123"
}
```

Response `201`:
```json
{
  "message": "User registred",
  "user": { "id": "671f...", "email": "rafsan@example.com", "username": "rafsan" }
}
```

**Login**

```http
POST /api/v1/users/login
```
```json
{
  "email": "rafsan@example.com",
  "password": "secret123"
}
```

**Logout**

```http
POST /api/v1/users/logout
```
```json
{
  "email": "rafsan@example.com"
}
```

### Posts

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/posts` | `title`, `content`, `author` | Create a post |
| GET | `/posts` | none | Get all posts (newest first) |
| GET | `/posts/:id` | none | Get one post |
| PATCH | `/posts/:id` | `title` and/or `content` | Update a post |
| DELETE | `/posts/:id` | none | Delete a post |

`author` is the user `id` returned by register or login.

**Create a post**

```http
POST /api/v1/posts
```
```json
{
  "title": "Hello world",
  "content": "My first post",
  "author": "671f..."
}
```

**Update a post**

```http
PATCH /api/v1/posts/<post id>
```
```json
{
  "title": "Updated title"
}
```

### Error responses

| Status | Meaning |
|---|---|
| `400` | Missing or invalid fields, wrong password, or invalid id |
| `404` | User or post not found |
| `500` | Server or database error |

## Data models

**User**

| Field | Type | Notes |
|---|---|---|
| `username` | String | required, unique, lowercase, 1–30 characters |
| `email` | String | required, unique, lowercase |
| `password` | String | required, 6–50 characters, stored as a bcrypt hash |
| `loggedIn` | Boolean | defaults to `false` |
| `createdAt`, `updatedAt` | Date | added automatically |

**Post**

| Field | Type | Notes |
|---|---|---|
| `title` | String | required, up to 100 characters |
| `content` | String | required |
| `author` | ObjectId | required, references `User` |
| `createdAt`, `updatedAt` | Date | added automatically |

## Roadmap

- [ ] JWT authentication and protected routes
- [ ] Only let the author edit or delete their own posts
- [ ] Get, update and delete users
- [ ] Input validation and a central error handler
- [ ] Pagination for posts
- [ ] Deploy the API

## Author

**Rafsan Alam** · [GitHub](https://github.com/rafsan0079)

## License

This project is licensed under the [ISC License](LICENSE).
