# Employee Management System

The Employee Management System is a full-stack web application built with React (using Vite) on the frontend and Express.js on the backend. The application allows an admin to log in, register, create new employees, and edit employee details.

## Features

- Admin Login and Registration
- Create New Employee
- Edit Employee Details

## Technologies Used

- **Frontend**: React (Vite)
- **Backend**: Express.js
- **Database**: MongoDB (with Mongoose)
- **Styling**: Tailwind CSS
- **Notifications**: React Toastify

## Getting Started

Follow these steps to set up and run the application on your local machine.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system

```
### Step 2: Set Up the Backend

1. Navigate to the "server" directory:

```
cd server
```
2. Install dependencies:
```
npm install
```
3. Create a .env file in the backend directory and add the following environment variables:
```
PORT=5000
DB_URL= "your mongodburl"
```
4. Create a folder called "employeePictures" to save the employee pictures
5. Start the Express server:
```
npm start
```
The backend server will starto n "http://localhost:5000"

### Step 3: Set Up the Frontend:
1. Navigate to the root directory:
```
cd ..
```
2. Install dependencies:
```
npm install
```

3.start the vite development server:
```
npm run dev
```
### Step 4: Usage:
1. Open your browser and navigate to "http://localhost:5173"
2. Register as an admin and/or login.
3. Use the application to manage employees by creating new employee entries and editing employee details. 


## Dependencies:

### Backend:
- Express
- Mongoose
- Bcrypt
- Dotenv

### Frontend
- React
- Vite
- React Router
- Axios
- TailwindCSS
- React Toastify
