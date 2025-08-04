# Personal Notes Manager (MERN + Google OAuth)

A full-stack web app to manage personal notes, requiring Google OAuth login.

## Features
- Google OAuth login/logout
- Add, view, and delete personal notes
- User-specific notes (secure)
- Responsive React frontend

## Project Structure
```
backend/   # Node.js + Express + MongoDB API
frontend/  # React app
```

## Setup Instructions

### 1. Clone the repo
```
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Backend Setup
- Copy `.env.example` to `.env` and fill in your values (Google client, MongoDB URI, etc.)
- Install dependencies:
```
cd backend
npm install
```
- Start backend:
```
npm start
```

### 3. Frontend Setup
- Install dependencies:
```
cd ../frontend
npm install
```
- Start frontend:
```
npm start
```

### 4. OAuth Setup
- In Google Cloud Console, set the redirect URI to:
  `http://localhost:3000/api/auth/google/callback`
- Add your client ID/secret to `.env`.

## Notes
- Never commit `.env` or `.env.local` files.
- See code comments for further customization.
