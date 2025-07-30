# Cloudflare Deployment Guide for QuickPay Backend

## Prerequisites
1. Install Wrangler CLI: `npm install -g wrangler`
2. Login to Cloudflare: `wrangler login`

## Option 1: Cloudflare Pages Functions (Recommended - Easier Migration)

### Step 1: Minimal Changes Required
Your current Express.js code can work with minimal modifications.

### Step 2: Update package.json
Add Cloudflare deployment scripts:
```json
{
  "scripts": {
    "deploy": "wrangler deploy",
    "dev:cf": "wrangler dev",
    "publish": "wrangler publish"
  }
}
```

### Step 3: Environment Variables
Set your secrets:
```bash
wrangler secret put MONGOOSE_KEY
wrangler secret put JWT_SECRET
```

### Step 4: Deploy
```bash
cd backend
wrangler deploy
```

## Option 2: Full Cloudflare Workers (More Complex)

### Required Changes:

#### 1. Database Connection Changes
- **Current**: Direct mongoose connection
- **Required**: Use Cloudflare D1 (SQLite) or external MongoDB via HTTP API

#### 2. Replace Express.js Dependencies
Update package.json:
```json
{
  "dependencies": {
    "@tsndr/cloudflare-worker-jwt": "^2.4.2",
    "itty-router": "^4.0.0"
  }
}
```

#### 3. Convert Express Routes to Workers Format
Each route needs to be converted from Express middleware to Workers format.

#### 4. Authentication Middleware Conversion
Replace JWT library with Cloudflare-compatible version.

## Database Options for Cloudflare:

### Option A: Keep MongoDB (External)
- Use MongoDB Atlas with HTTP API
- Add connection pooling
- Handle connection limits

### Option B: Migrate to Cloudflare D1
- SQLite database
- Better integration with Workers
- Requires schema migration

## Recommended Approach:

**For Quick Deployment**: Use Cloudflare Pages Functions (Option 1)
- Minimal code changes
- Keep your Express.js structure
- Faster deployment

**For Long-term**: Consider Workers (Option 2) 
- Better performance
- More Cloudflare-native
- Requires significant refactoring

## Migration Steps (Pages Functions):

1. **Add wrangler.toml** (already created)
2. **Install Wrangler**: `npm install -g wrangler`
3. **Set Environment Variables**:
   ```bash
   wrangler secret put MONGOOSE_KEY
   wrangler secret put JWT_SECRET
   ```
4. **Test Locally**: `wrangler dev`
5. **Deploy**: `wrangler deploy`

## CORS Configuration for Cloudflare:
Update your frontend config to include Cloudflare URLs:
```javascript
const API_URL = import.meta.env.VITE_API_URL || (
    isDevelopment 
        ? "http://localhost:3000/api/v1"
        : "https://your-worker-name.your-subdomain.workers.dev/api/v1"
);
```

## Cost Comparison:
- **Vercel**: Free tier: 100GB bandwidth, then $20/month
- **Cloudflare Workers**: Free tier: 100,000 requests/day, then $5/month

## Next Steps:
1. Choose deployment option (Pages Functions recommended)
2. Set up Wrangler CLI
3. Configure environment variables
4. Deploy and test
5. Update frontend configuration
