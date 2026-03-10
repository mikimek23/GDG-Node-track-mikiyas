# auth_system

Simple Node.js + Express authentication API with JWT-based login, httpOnly cookies, and a protected dashboard route.

## Features
- Sign up with name, email, and password
- Log in to receive a JWT (also stored in an httpOnly cookie)
- Log out (clears auth cookie)
- Protected user dashboard endpoint

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt

## Prerequisites
- Node.js (LTS recommended) and npm
- MongoDB running locally or a reachable MongoDB URI

## Setup
1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with the required variables:

```env
PORT=
NODE_ENV=
DATABASE_URI=
ACCESS_TOKEN_SECRET_KEY=
```

Notes:
- `ACCESS_TOKEN_SECRET_KEY` should be a strong, random secret.
- `PORT` is configurable; `5001` is a common local choice.

3. Start the dev server:

```bash
npm run dev
```

The server will start and listen on the configured `PORT`.

## API
Base URL: `http://localhost:PORT`

### Auth Routes
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`

### User Routes
- `GET /api/user/dashboard` (requires auth cookie)

## Error Response Format
Errors are returned as:

```json
{
  "success": false,
  "message": "..."
}
```