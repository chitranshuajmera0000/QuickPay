
# 💳 QuickPay - Digital Payment Platform

A modern, secure digital payment application built with React.js and Node.js, featuring real-time money transfers, user authentication, and a beautiful responsive design.

![QuickPay Demo]((https://quick-pay-lac.vercel.app/dashboard))

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based user authentication
- 💸 **Money Transfers** - Send money instantly to other users
- 👥 **User Search** - Find and send money to users by name
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🌙 **Dark/Light Mode** - Toggle between themes
- 🎨 **Modern UI** - Beautiful glassmorphism design with animations
- ⚡ **Real-time Updates** - Instant balance updates after transactions
- 🔒 **Secure** - Password hashing, input validation, and JWT tokens

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Tailwind CSS** - Styling and animations
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Zod** - Input validation
- **bcrypt** - Password hashing

## 🚀 Live Demo

- **Frontend:** [https://quickpay-frontend.vercel.app]((https://quick-pay-lac.vercel.app/dashboard))
- **Backend API:** [https://quickpay-backend.vercel.app]((https://quick-pay-lac.vercel.app/dashboard))

### Test Accounts
```
Email: john.doe@gmail.com
Password: John123!
Balance: ₹15,230.75

Email: jane.smith@outlook.com  
Password: Jane456!
Balance: ₹8,765.40
```

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/chitranshuajmera0000/QuickPay.git
cd QuickPay
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your backend API URL
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 🔧 Environment Variables

### Backend (.env)
```env
MONGOOSE_KEY=mongodb+srv://username:password@cluster.mongodb.net/quickpay
JWT_SECRET=your-super-secret-jwt-key-here
PORT=3000
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api/v1
```

## 🚀 Deployment

This project is optimized for deployment on Vercel. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Quick Deploy
1. Fork this repository
2. Connect to Vercel
3. Set environment variables
4. Deploy!

## 👨‍💻 Author

**Chitranshu Ajmera**
- GitHub: [@chitranshuajmera0000](https://github.com/chitranshuajmera0000)

---

⭐ Star this repository if you found it helpful!
