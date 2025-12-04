# Real-Time Chat Application

A full-stack real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. This project features secure authentication, real-time messaging, image sharing, and a modern responsive UI.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using Socket.IO.
- **Authentication**: Secure signup and login using JWT (JSON Web Tokens) and HTTP-only cookies.
- **Online Status**: Real-time online/offline user status updates.
- **Image Sharing**: Upload and share images in chat using Cloudinary.
- **Security**: Protected routes and API endpoints using Arcjet for security.
- **Email Notifications**: Integrated with Resend for email services.
- **Responsive Design**: Built with Tailwind CSS and DaisyUI for a seamless mobile and desktop experience.
- **State Management**: Efficient global state management using Zustand.
- **Toast Notifications**: Interactive user feedback with React Hot Toast.

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS, DaisyUI
- **State Management**: Zustand
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Real-time Engine**: Socket.IO
- **Authentication**: JWT, Cookie Parser, Bcrypt.js
- **File Storage**: Cloudinary
- **Security**: Arcjet
- **Email Service**: Resend

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (Local or Atlas)
- Cloudinary Account
- Resend Account
- Arcjet Account

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Chat-app
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Resend Configuration
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=onboarding@resend.dev
EMAIL_FROM_NAME=ChatApp

# Arcjet Configuration
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

## 📂 Project Structure

```
Chat-app/
├── backend/                 # Backend Node.js/Express server
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── lib/             # Utilities (DB, Cloudinary, Socket, etc.)
│   │   ├── middlewares/     # Auth and Security middlewares
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   └── server.js        # Entry point
│   └── package.json
│
├── frontend/                # Frontend React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── lib/             # Axios setup and utils
│   │   ├── pages/           # Application pages (Chat, Login, Signup)
│   │   ├── store/           # Zustand state stores
│   │   └── App.jsx          # Main application component
│   └── package.json
│
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.
