# 🎉 Event Management System

A full-stack Event Management application that allows users to create, manage, and explore events seamlessly. Built using modern web technologies for scalability, performance, and clean UI experience.

---

## 📸 Screenshots

### 🏠 Home Page

![Home Page](https://res.cloudinary.com/dv2fvq9dd/image/upload/v1771226786/Screenshot_2026-02-16_at_12.56.13_PM_sib8uq.png)

---

## 🔗 Live Link

live website deployed on vercel - https://event-management-one-topaz.vercel.app

## 🚀 Features

- User Authentication (Register / Login)
- Create, Update, Delete Events
- View Upcoming Events
- Contact Form with Email Integration (Resend)
- Secure REST API
- Responsive UI Design
- Environment-Based Configuration

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- ShadCN UI

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Resend (Email Service)

---

## 📁 Project Structure

```
EventManagement/
│
├── client/        
├── server/        
├── screenshots/   
├── .env
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Madhu-Naggari/EventManagement.git
cd EventManagement
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
```

Start the backend server:

```bash
npm start
```

Backend runs on:

```
http://localhost:5000
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 📬 API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Events
- GET /api/events
- POST /api/events
- PUT /api/events/:id
- DELETE /api/events/:id

### Contact
- POST /api/auth/contact

---

## 🧪 Testing

You can test backend APIs using:

- Postman
- Thunder Client
- Browser DevTools (Network Tab)

---

## 🔐 Environment Variables

Make sure `.env` files are NOT pushed to GitHub.

Add this to `.gitignore`:

```
.env
node_modules
```

---

## 🌍 Deployment Options

Frontend:
- Vercel
- Netlify

Backend:
- Render
- Railway
- DigitalOcean

Database:
- MongoDB Atlas

---

## 📌 Future Improvements

- Admin Dashboard
- Event Booking System
- Payment Integration
- Role-Based Access Control
- Image Upload for Events
- Email Confirmation for Registrations

---

## 👨‍💻 Author

Madhu Naggari

---

## 📄 License

This project is for educational and learning purposes.
