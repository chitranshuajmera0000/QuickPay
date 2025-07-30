const express = require("express");
const mainRouter = require('./routes/index')
const cors = require('cors')
require('dotenv').config();

const app = express()

// Configure CORS to allow requests from multiple origins
const corsOptions = {
    origin: [
        'http://localhost:5173',           // Local Vite dev server
        'http://127.0.0.1:5173',          // Local Vite dev server alternative
        'https://quickpay-frontend.vercel.app', // Your deployed frontend (update this)
        'https://your-domain.vercel.app',  // Replace with your actual domain
        /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:5173$/, // Any 192.168.x.x:5173 for local dev
        /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}:5173$/, // Any 10.x.x.x:5173 for local dev
        'https://ls1w8b80-3000.inc1.devtunnels.ms'  // Dev tunnel URL (remove in production)
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))

// Parse JSON bodies
app.use(express.json())

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'QuickPay API is running!', 
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

app.use('/api/v1',mainRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`QuickPay API server running on port ${PORT}`);
});

module.exports = app;