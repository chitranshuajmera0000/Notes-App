npm start
npm start

# Notes App

A full-stack, modern note-taking application built with React, Vite, Tailwind CSS, and Node.js/Express.

## Features
- Google OAuth authentication
- Create, read, update, and delete notes
- Beautiful, responsive UI with Tailwind CSS
- Modular React component structure
- Secure backend API with Express and MongoDB

## Project Structure
```
Notes-App/
  backend/      # Express API, MongoDB models, Passport config
  frontend/     # React app, Tailwind CSS, components, hooks
```

## Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)

### Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/chitranshuajmera0000/Notes-App.git
   cd Notes-App
   ```
2. **Install dependencies:**
   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env` in the backend folder and fill in your MongoDB URI and Google OAuth credentials.
4. **Run the backend:**
   ```sh
   cd backend
   npm start
   ```
5. **Run the frontend:**
   ```sh
   cd frontend
   npm run dev
   ```
6. **Open the app:**
   Visit `http://localhost:5173` in your browser.

## OAuth Setup
- In Google Cloud Console, set the redirect URI to:
  `http://localhost:3000/api/auth/google/callback`
- Add your client ID/secret to `.env`.

## Notes
- Never commit `.env` or `.env.local` files.
- See code comments for further customization.

## License
MIT
