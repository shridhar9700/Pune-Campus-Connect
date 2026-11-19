# Campus Connect

### One City. Every College. One Connected Community.

**Campus Connect** is a college-focused social networking platform designed to bring students, seniors, alumni, and college communities across Pune together in one place.

The project aims to reduce fragmented campus communication by providing a shared platform for college discovery, verified onboarding, and community-oriented features.

## Current implementation

The repository currently includes a working full-stack foundation with:

- **College discovery:** browse/search active colleges and submit a request to add a new college.
- **Authentication:** student/alumni registration, login, cookie-based sessions, and email verification flow (development OTP logging when SMTP is not configured).
- **Protected dashboard:** authenticated user dashboard shell with profile/status-aware UI.
- **Backend API:** Express + MongoDB services for auth and college/community onboarding flows.
- **Seed data:** script to upsert an initial set of Pune colleges.

> Note: Several community features described in the product vision (feeds, events, clubs, mentorship, archives, media uploads, etc.) are planned and not fully implemented yet.

## Technology stack

| Area | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB, Mongoose |
| Auth & validation | JWT (HTTP-only cookies), bcrypt, Zod |
| Tooling | tsx, concurrently |

## Project structure

- `client/` — React frontend application
- `server/` — Express API, models, routes, middleware, and seed script
- `package.json` — root scripts for installing, running, building, and seeding

## Local development

### Prerequisites
- Node.js (LTS recommended)
- npm
- MongoDB (local instance or hosted connection string)

### 1. Install dependencies
```bash
npm install
npm run install:all
```

### 2. Configure server environment
Create `server/.env` based on `server/.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/campus-connect
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

- In development, if `JWT_SECRET` is not set, the server falls back to a development-only secret.
- If `SMTP_HOST` is not configured, verification OTPs are logged to the server console for development.

### 3. Seed colleges (optional but recommended)
```bash
npm run seed
```

### 4. Start the app
```bash
npm run dev
```

- Client: `http://localhost:5173`
- Server: `http://localhost:5000` (Vite proxies `/api` requests to the server)

### Build
```bash
npm run build
```

## Product vision

Campus Connect aims to grow into a connected ecosystem for Pune colleges with features such as:

- Cross-college announcements and event discovery
- Campus feeds, discussions, and communities
- Clubs, societies, and knowledge archives
- Senior/alumni mentorship and opportunities
- Rich media sharing and real-time communication

**One City. Every College. One Connected Community.**
