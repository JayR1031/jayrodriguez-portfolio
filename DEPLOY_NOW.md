# 🚀 Quick Deployment Steps

## Step 1: Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `portfolio` (or any name you like)
3. Make it **Public** (or Private - your choice)
4. **Don't** check "Initialize with README"
5. Click **"Create repository"**

## Step 2: Push to GitHub

Replace `YOUR_USERNAME` and `REPO_NAME` with your actual values:

```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy on Vercel

1. Go to: https://vercel.com
2. Click **"Sign Up"** → Use **"Continue with GitHub"**
3. After login, click **"Add New Project"**
4. Import your repository (the one you just pushed)
5. Vercel will auto-detect Next.js settings
6. Click **"Deploy"**
7. Wait ~2 minutes...
8. **Your site is live!** 🎉

You'll get a URL like: `https://your-project.vercel.app`

## Step 4: Custom Domain (Optional)

After deployment:
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `jayrodriguez.dev`)
3. Follow DNS setup instructions

---

## Alternative: Deploy via Vercel CLI

If you prefer command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (from project directory)
vercel

# For production
vercel --prod
```

---

## Future Updates

Whenever you make changes:

```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically redeploy! ✨

