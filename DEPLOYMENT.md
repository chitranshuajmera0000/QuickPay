# QuickPay Deployment Guide

## 🚀 Deploying to Vercel

### Prerequisites
- GitHub account
- Vercel account (free)
- MongoDB Atlas account (free tier available)

### Backend Deployment (API)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Production ready deployment"
   git push origin main
   ```

2. **Deploy Backend to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `backend`
   - Add environment variables:
     - `MONGOOSE_KEY`: Your MongoDB connection string
     - `JWT_SECRET`: A strong secret key (generate online)

3. **Get Backend URL:**
   - After deployment, note your backend URL (e.g., `https://quickpay-backend.vercel.app`)

### Frontend Deployment

1. **Update Frontend Config:**
   - Update `frontend/src/pages/config.jsx`
   - Replace the backend URL with your deployed Vercel backend URL

2. **Deploy Frontend to Vercel:**
   - Create new Vercel project
   - Set root directory to `frontend`
   - Add environment variable:
     - `VITE_API_URL`: Your deployed backend URL + `/api/v1`

3. **Update CORS:**
   - Add your frontend Vercel URL to backend CORS origins
   - Redeploy backend

## 🔧 Environment Variables

### Backend (.env)
```
MONGOOSE_KEY=mongodb+srv://username:password@cluster.mongodb.net/quickpay
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.vercel.app/api/v1
```

## 📋 Deployment Checklist

### Before Deploying:
- [ ] Sensitive data moved to environment variables
- [ ] CORS configured for production domains
- [ ] Database connection tested
- [ ] Environment templates created
- [ ] .gitignore files updated

### After Backend Deployment:
- [ ] Environment variables set in Vercel
- [ ] Health check endpoint working
- [ ] Database connection successful

### After Frontend Deployment:
- [ ] API calls working
- [ ] Authentication functioning
- [ ] All features tested

## 🎯 Quick Deployment Steps

### Option 1: Separate Repositories (Recommended)
1. Create two GitHub repos: `quickpay-backend` and `quickpay-frontend`
2. Move backend files to backend repo
3. Move frontend files to frontend repo
4. Deploy each separately on Vercel

### Option 2: Monorepo
1. Keep current structure
2. Deploy backend first (root: `backend`)
3. Deploy frontend second (root: `frontend`)

## 🔗 Demo URLs Structure
- Backend: `https://quickpay-backend.vercel.app`
- Frontend: `https://quickpay-frontend.vercel.app`
- API Docs: `https://quickpay-backend.vercel.app/` (health check)

## 🐛 Common Issues

1. **CORS Errors:**
   - Add frontend URL to backend CORS origins
   - Redeploy backend after changes

2. **Environment Variables:**
   - Ensure all required env vars are set
   - No quotes around values in Vercel dashboard

3. **Database Connection:**
   - Whitelist 0.0.0.0/0 in MongoDB Atlas for Vercel
   - Check connection string format

## 📱 Test Your Deployment
- [ ] User registration works
- [ ] User login works
- [ ] Money transfer works
- [ ] Balance updates correctly
- [ ] Dark/light mode toggles
- [ ] Mobile responsive design

Your QuickPay app is now production-ready! 🎉
