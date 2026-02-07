# PassOP - Your Own Password Manager ☁️

PassOP (Full Stack) is a robust password manager that allows you to access your credentials. Built with the MERN stack, it features a Node.js/Express backend connected to a MongoDB database for secure, persistent storage.

## ✨ Features

- **Database Persistence:** Passwords are stored securely in a MongoDB database.
- **Full CRUD API:** Backend API handling GET, POST, DELETE, and PUT requests.
- **Modern UI:** Responsive and clean interface built with React and Tailwind CSS.
- **Real-time Feedback:** Interactive toast notifications for all server interactions (Loading, Success, Error).
- **Scalable Architecture:** Clean separation of concerns between frontend and backend.

## 🛠️ Tech Stack

**Frontend:**
- **React.js:** Component-based UI library
- **Tailwind CSS:** Utility-first CSS framework
- **React-Toastify:** For toast notifications
- **UUID:** For unique identifier generation

**Backend:**
- **Node.js:** JavaScript runtime environment
- **Express.js:** Web framework for Node.js
- **MongoDB:** NoSQL database for data storage
- **Cors:** Middleware to enable Cross-Origin Resource Sharing
- **Body-Parser:** Middleware to parse incoming request bodies
- **Dotenv:** For loading environment variables


### Prerequisites
- Node.js installed on your machine.
- MongoDB installed locally OR a MongoDB Atlas connection string.

### Installation & Setup

#### 1. Backend Setup
Navigate to the backend directory:
```
cd backend
npm install
```

Create a .env file in the backend folder and add your configuration:
```
MONGO_URI=mongodb://localhost:27017/passop
PORT=3000
```

Start the backend server:
```
node --watch server.js
```

#### 2. Frontend Setup
Open a new terminal and navigate to the root (or frontend) directory:
```
npm install
```
Start the React development server:
```
npm run dev
```


