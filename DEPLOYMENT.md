# 🚀 Deployment Guide

Complete guide to deploy your portfolio to various hosting platforms.

## 📋 Pre-Deployment Checklist

1. ✅ Make sure your resume PDF is in `public/Graduate Student.pdf`
2. ✅ Test locally with `npm run build` to ensure no errors
3. ✅ Commit all changes to Git

---

## 🎯 Option 1: Vercel (Recommended - Easiest & Best for Next.js)

Vercel is made by the creators of Next.js and offers the best experience.

### Method A: GitHub Integration (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click **"Deploy"**
   - Your site will be live in ~2 minutes! 🎉

3. **Custom Domain (Optional):**
   - After deployment, go to Project Settings
   - Add your custom domain (e.g., `jayrodriguez.dev`)

### Method B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
vercel

# For production deployment
vercel --prod
```

**That's it!** Vercel handles everything automatically.

---

## 🌐 Option 2: Netlify

### Method A: GitHub Integration

1. **Push to GitHub** (same as Vercel step 1)

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://www.netlify.com)
   - Sign up/Login with GitHub
   - Click **"Add new site"** → **"Import an existing project"**
   - Select your repository
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `.next`
   - Click **"Deploy site"**

### Method B: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build the project
npm run build

# Deploy
netlify deploy --prod
```

---

## 📄 Option 3: GitHub Pages

**Note:** GitHub Pages requires static export. We'll need to configure this.

1. **Install dependencies:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `next.config.js`:**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: true,
     swcMinify: true,
     output: 'export',
     images: {
       unoptimized: true,
       remotePatterns: [
         {
           protocol: 'https',
           hostname: 'github.com',
           pathname: '/**',
         },
       ],
     },
   }
   
   module.exports = nextConfig
   ```

3. **Add deploy script to `package.json`:**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d out"
     }
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to your repo → Settings → Pages
   - Source: `gh-pages` branch
   - Your site will be at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

**⚠️ Note:** Some Next.js features (like API routes) won't work with static export.

---

## ☁️ Option 4: Railway

1. **Push to GitHub** (same as above)

2. **Deploy on Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Click **"New Project"** → **"Deploy from GitHub repo"**
   - Select your repository
   - Railway auto-detects Next.js and deploys
   - Get your live URL!

---

## 🐳 Option 5: Docker + Any Platform

If you want to containerize:

1. **Create `Dockerfile`:**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Create `.dockerignore`:**
   ```
   node_modules
   .next
   .git
   ```

3. **Deploy to any Docker-supported platform** (Railway, Render, DigitalOcean, etc.)

---

## 🎯 Recommended: Vercel

**Why Vercel?**
- ✅ Zero configuration needed
- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificate
- ✅ Custom domains
- ✅ Built for Next.js
- ✅ Great performance
- ✅ Free tier is generous

---

## 📝 Quick Start Commands

### First-time Git Setup (if not done):
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Build Test (always test before deploying):
```bash
npm run build
npm start  # Test production build locally
```

### Future Updates:
```bash
git add .
git commit -m "Update portfolio"
git push
# Vercel/Netlify will auto-deploy!
```

---

## 🔧 Troubleshooting

### Build Errors:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Image Optimization Issues:
- Check `next.config.js` has image configuration
- For static export, images must be unoptimized

### Environment Variables:
- Add them in your hosting platform's dashboard
- For Vercel: Project Settings → Environment Variables

---

## 🌟 Need Help?

- **Vercel Docs:** https://nextjs.org/docs/deployment
- **Netlify Docs:** https://docs.netlify.com
- **GitHub Pages:** https://pages.github.com

Your portfolio is ready to go live! 🚀

