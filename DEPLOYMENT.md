# Deployment Guide

## Before Deployment

1. **Update your personal details** in `index.js`:

   ```javascript
   user_id: "your_firstname_lastname_ddmmyyyy", // e.g., "john_doe_17091999"
   email: "your_email@domain.com",
   roll_number: "YOUR_ROLL_NUMBER"
   ```

2. **Test locally**:
   ```bash
   npm install
   npm start
   ```

## Deployment Options

### 1. Vercel (Recommended)

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Deploy:

   ```bash
   vercel
   ```

3. Follow the prompts and your API will be live at `https://your-project-name.vercel.app/bfhl`

### 2. Railway

1. Create account at [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Deploy automatically from GitHub
4. Your API will be live at `https://your-project-name.railway.app/bfhl`

### 3. Render

1. Create account at [Render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Your API will be live at `https://your-project-name.onrender.com/bfhl`

### 4. Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Deploy: `git push heroku main`
5. Your API will be live at `https://your-app-name.herokuapp.com/bfhl`

## Environment Variables

Set `NODE_ENV=production` for production deployments.

## Testing Your Deployed API

Use tools like Postman or curl to test:

```bash
curl -X POST https://your-deployed-url.com/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a","1","334","4","R","$"]}'
```

## GitHub Repository

1. Initialize git: `git init`
2. Add files: `git add .`
3. Commit: `git commit -m "Initial commit"`
4. Create repository on GitHub
5. Add remote: `git remote add origin https://github.com/yourusername/your-repo.git`
6. Push: `git push -u origin main`
