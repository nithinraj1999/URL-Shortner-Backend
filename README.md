# URL-Shortener

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

A URL Shortener application built using Node.js, Nest.js, and React. This application supports user authentication (sign-up, sign-in) with JWT and allows users to shorten URLs efficiently.

---

## Features

- **User Authentication**: Secure sign-up and sign-in using JWT.
- **URL Shortening**: Users can shorten long URLs.
- **Modern UI**: Developed with React for a smooth user experience.

---

## Prerequisites

- [Node.js](https://nodejs.org) (v14 or later)
- [npm](https://www.npmjs.com/) 
- [MongoDB](https://www.mongodb.com/) for database

---

## Installation

### Backend Setup (Nest.js)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory and configure the following:
   ```env
   PORT=3000
   DATABASE_URI=mongodb://localhost:27017/url-shortener
   JWT_SECRET=your_jwt_secret
   ```

4. Run the backend:
   ```bash
   # Development mode
   npm start

   ```

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the frontend directory:
   ```env
VITE_BASE_URL= http://localhost:2000  
   ```

4. Run the frontend:
   ```bash
   npm run dev
   ```

---

## Usage

1. Visit the frontend at `http://localhost:3000`.
2. Sign up or sign in to your account.
3. Use the URL shortening feature to generate short URLs.

---

## Project Scripts

### Backend

- **Development Mode**: `npm run start:dev`
- **Production Mode**: `npm run start:prod`


### Frontend

- **Development Mode**: `npm start`
- **Build for Production**: `npm run build`

---
