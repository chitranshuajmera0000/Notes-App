# Notes App

A full-stack note-taking application built with React (Vite), Tailwind CSS, Node.js + Express, and MongoDB. Sign in with Google, create/edit/delete notes, and enjoy a responsive, modular UI.

- Live demo (if available): `https://notes-app-six-sable-89.vercel.app`  
- Languages: JavaScript, CSS, HTML  

---

## Table of contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Project structure](#project-structure)  
4. [Prerequisites](#prerequisites)  
5. [Quick start (local development)](#quick-start-local-development)  
6. [Environment variables](#environment-variables)  
7. [Running / Scripts](#running--scripts)  
8. [OAuth setup (Google)](#oauth-setup-google)  
9. [API overview](#api-overview)  
10. [Deployment](#deployment)  
11. [Troubleshooting](#troubleshooting)  
12. [Examples](#examples)  
13. [Contributing](#contributing)  
14. [Contributors](#contributors)  
15. [License](#license)  
16. [Acknowledgements](#acknowledgements)  

---

## Features

- Google OAuth authentication  
- Create, read, update, delete (CRUD) notes  
- User-owned notes (notes scoped to signed-in users)  
- Modular React component structure (clean UI separation)  
- Responsive UI made with Tailwind CSS  
- Express API with MongoDB (Mongoose)  
- Designed for easy local development and deployment  

---

## Tech stack

- **Frontend:** React (Vite), Tailwind CSS  
- **Backend:** Node.js, Express, Passport (Google OAuth), Mongoose (MongoDB)  
- **Database:** MongoDB (local or Atlas)  
- **Deployment examples:** Vercel/Netlify (frontend), Heroku/Render (backend)  

---

## Project structure

```
Notes-App/
├─ backend/        # Express API, models, auth (Passport), .env
├─ frontend/       # Vite + React app, Tailwind CSS, components
├─ .env.local      # (should be gitignored)
├─ README.md
└─ .gitignore
```

---

## Prerequisites

- Node.js (v18+ recommended)  
- npm (or yarn)  
- MongoDB instance (local `mongod` or MongoDB Atlas)  
- Google Cloud project + OAuth credentials (Client ID & Secret)  

---

## Quick start (local development)

1. Clone the repository:
```bash
git clone https://github.com/chitranshuajmera0000/Notes-App.git
cd Notes-App
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Configure environment variables (see next section).

5. Start backend (in one terminal):
```bash
cd backend
npm start
# or
npm run dev
```

6. Start frontend (in another terminal):
```bash
cd frontend
npm run dev
```

7. Open the app in your browser:  
- Frontend: `http://localhost:5173`  
- Backend: `http://localhost:3000`  

---

## Environment variables

Create a `.env` file in **backend** and `.env.local` in **frontend**.  

**Example `backend/.env`:**
```bash
# MongoDB
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/notes-app?retryWrites=true&w=majority

# Server
PORT=3000
SESSION_SECRET=your_session_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

**Example `frontend/.env.local`:**
```bash
VITE_API_URL=http://localhost:3000/api
```

---

## Running / Scripts

**Backend**
```bash
cd backend
npm install
npm start        # production
npm run dev      # development
```

**Frontend**
```bash
cd frontend
npm install
npm run dev      # Vite dev server
npm run build    # build for production
npm run preview  # preview production build
```

---

## OAuth setup (Google)

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials.  
2. Create OAuth 2.0 Client ID (type: Web application).  
3. Add redirect URIs:
   - `http://localhost:3000/api/auth/google/callback`  
   - (and your production callback URI, e.g., `https://yourdomain.com/api/auth/google/callback`)  
4. Copy Client ID & Secret into backend `.env`.  

---

## API overview

**Auth routes:**
```
GET  /api/auth/google           # start Google OAuth
GET  /api/auth/google/callback  # OAuth callback
GET  /api/auth/logout           # logout
```

**Notes routes:**
```
GET     /api/notes       # list user’s notes
POST    /api/notes       # create a new note
GET     /api/notes/:id   # get single note
PUT     /api/notes/:id   # update a note
DELETE  /api/notes/:id   # delete a note
```

---

## Deployment

**Frontend:** Deploy Vite build (`npm run build`) to Vercel/Netlify.  
**Backend:** Deploy to Heroku, Render, Railway, etc. Add environment variables in hosting dashboard.  

Make sure to:
- Set correct API URLs in frontend `.env`.  
- Update Google OAuth redirect URI to match deployed backend.  

---

## Troubleshooting

- **redirect_mismatch:** Redirect URI in Google Console doesn’t match backend `.env`.  
- **MongoDB errors:** Check `MONGO_URI` and Atlas network whitelist.  
- **CORS issues:** Add CORS middleware or proxy config.  
- **Cookies not persisting:** Check `SESSION_SECRET` and cookie settings (`secure`, `sameSite`).  
- **Port in use:** Change `PORT` or Vite’s port.  

---

## Examples

**Create a new note:**
```bash
curl -X POST http://localhost:3000/api/notes   -H "Content-Type: application/json"   -d '{"title":"Shopping", "content":"Buy milk and eggs"}'
```

---

## Contributing

1. Fork the repo  
2. Create a feature branch:  
   ```bash
   git checkout -b feat/my-feature
   ```  
3. Commit changes and push  
4. Open a Pull Request  

---

## Contributors

- Original author: [@chitranshuajmera0000](https://github.com/chitranshuajmera0000)  

---

## License

This project is licensed under the **MIT License**.  

---

## Acknowledgements

- React, Vite, Tailwind CSS  
- Node.js, Express, Passport.js  
- MongoDB / Mongoose  
- Google OAuth  
