# Club Event Management System

A full-stack web application that allows students to view, manage, and register for club events.  
The platform provides authentication, event listing, and event registration functionality through a React frontend and Node.js backend.

---

## Features

- User authentication (login & signup)
- Event listing and viewing
- Event registration
- Admin event creation
- Responsive dashboard UI
- Full-stack architecture (React + Node.js)

---

## Tech Stack

Frontend
- React
- CSS
- Axios
- React Router

Backend
- Node.js
- Express.js
- MongoDB (or database used in your project)
- REST API

--------

## Project Structure

club-event-management
│
├── backend
│   ├── config           # Database configuration
│   ├── controllers      # API logic for events and users
│   ├── middleware       # Authentication / request middleware
│   ├── models           # Database schemas
│   ├── routes           # Express routes
│   ├── server.js        # Backend entry point
│   └── package.json
│
├── frontend
│   ├── public           # Static assets
│   ├── src              # React components and pages
│   ├── package.json
│   └── package-lock.json
│
└── .gitignore

--------

## Installation

### 1. Clone the repository
git clone https://github.com/YOUR\_USERNAME/club-event-management.git
cd club-event-management

---

### 2. Install backend dependencies
cd backend
npm install

---

### 3. Install frontend dependencies
cd ../frontend
npm install

---

## Running the Application

### Start backend server
cd backend
npm start

Server runs on:
http://localhost:5000

---

### Start frontend
cd frontend
npm start

Frontend runs on:
http://localhost:3000

---

## Application Overview

Users can:

- Create accounts
- Log in securely
- Browse available club events
- Register for events

Admins can:

- Add new events
- Manage event information

---

## Future Improvements

- Email notifications for event registration
- Admin dashboard for event analytics
- Event capacity limits
- Calendar integration

---

## Author

Sara Chhabra



