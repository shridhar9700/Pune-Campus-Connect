<<<<<<< HEAD
# Campus Connect

Campus Connect is a college-exclusive community platform for students, alumni, clubs, and moderators.

## Project structure

- `client/` - React, TypeScript, Tailwind CSS frontend
- `server/` - Express, TypeScript, MongoDB/Mongoose REST API

## Requirements

- Node.js 20+
- MongoDB 7+ or MongoDB Atlas

## Setup

1. Install dependencies:
   ```powershell
   npm install
   npm run install:all
   ```
2. Copy `server/.env.example` to `server/.env` and configure `MONGODB_URI` and `JWT_SECRET`.
3. Start MongoDB.
4. Seed the initial Pune colleges:
   ```powershell
   npm run seed
   ```
5. Start both applications:
   ```powershell
   npm run dev
   ```

The frontend runs at `http://localhost:5173`; the API runs at `http://localhost:5000`.

## Email verification

If `SMTP_HOST` is not configured, the server logs verification codes and development responses include a code. In production, configure SMTP and remove development-only OTP exposure. Any valid email address containing `@` may be used during registration.

## Current development phase

Phase 1 foundation is implemented: landing page, college discovery and requests, registration, login, HTTP-only JWT sessions, email verification workflow, protected API routes, and MongoDB college/user models. Subsequent feature phases should add one vertical slice at a time.
=======
# Pune-Campus-Connect
A unified college community platform
>>>>>>> 5572703258cd3d3d2d75abf10056b62d933ebb4e
