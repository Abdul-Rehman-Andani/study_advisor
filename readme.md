# Student Study Management & Planner

A high-performance, full-stack mobile application designed to centralize academic workflows, built with a focus on clean UI and efficient data management.

## 🛠️ Tech Stack
* **Frontend:** React Native (Expo), React.js ,TypeScript, NativeWind (Tailwind CSS)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Server State Management:** TanStack React Query
* **Authentication:** Clerk (Google OAuth)

## 🚀 Key Features
* **Secure Authentication:** Integrated **Clerk Google OAuth** for seamless user onboarding and secure session handling.
* **Dynamic Dashboard:** Real-time visualization of academic stats (Courses/Tasks) with a time-aware greeting system.
* **Academic Timeline:** A dynamic **horizontal timeline** engine for managing daily schedules and academic deadlines.
* **Course & Task Management:** Complete CRUD system for tracking courses and granular tasks with a MongoDB backend.
* **Media Handling:** Engineered support for **PDF and Image uploads** for academic resources and profile management.
* **Advanced UI Engineering:** Optimized layout featuring **nested horizontal sliders** within a vertical scroll architecture for a "zero-lag" experience.

## 📂 Project Structure

* `/mobile` - Expo Router (file-based navigation)
* `/server` - Node.js/Express API, MongoDB models, and middleware
* `/client` - React Router

## ⚙️ Installation & Setup

### 1. Backend Setup
```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Start the server
npm run dev 
```

### 2. Expo (mobile) Setup
```bash

# Navigate to the mobile directory
cd mobile

# Install dependencies
npm install

# Start the mobile app
npx expo start
```

### Client (Web) Setuo
```bash

# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the react app
npm run dev


```