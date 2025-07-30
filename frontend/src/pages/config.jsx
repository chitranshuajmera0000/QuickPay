// Configuration for different environments
const isDevelopment = import.meta.env.DEV;

// Use environment variable if available, otherwise fallback to default URLs
const API_URL = import.meta.env.VITE_API_URL || (
    isDevelopment 
        ? "http://localhost:3000/api/v1"
        : "https://your-backend-url.vercel.app/api/v1"  // Replace with your deployed backend URL
);

export const BASELINK = API_URL;

