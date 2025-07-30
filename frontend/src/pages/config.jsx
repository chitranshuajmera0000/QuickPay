// Configuration for different environments
const isDevelopment = import.meta.env.DEV;

// Use environment variable if available, otherwise fallback to default URLs
const API_URL = import.meta.env.VITE_API_URL || (
    isDevelopment 
        ? "http://localhost:3000/api/v1"
        : "/api/v1"  // Relative path - works automatically with Vercel monorepo
);

export const BASELINK = API_URL;

