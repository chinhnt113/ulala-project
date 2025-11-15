# Deployment Guide - Plant Price Calculator

## Quick Deploy to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `plant-price-calculator`
3. **Important**: Do NOT check "Add a README file", "Add .gitignore", or "Choose a license"
4. Click "Create repository"

### Step 2: Initialize Git and Push Code

```bash
cd plant-price-calculator
git init
git add .
git commit -m "Initial commit: Plant Price Calculator"
git branch -M main
git remote add origin https://github.com/[YOUR_USERNAME]/plant-price-calculator.git
git push -u origin main
```

**Replace `[YOUR_USERNAME]` with your GitHub username**

### Step 3: Deploy to GitHub Pages

```bash
npm run deploy
```

This command will:
- Build the production bundle (`npm run build`)
- Deploy to `gh-pages` branch automatically
- Create/update the `gh-pages` branch with the `dist` folder contents

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

### Step 5: Access Your App

After a few minutes, your app will be available at:
```
https://[YOUR_USERNAME].github.io/plant-price-calculator/
```

**Note**: It may take 1-5 minutes for GitHub Pages to update after deployment.

---

## Troubleshooting

### If `npm run deploy` fails:

1. Make sure you have `gh-pages` installed:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Make sure you're logged into GitHub CLI:
   ```bash
   gh auth login
   ```

3. Or use personal access token in git remote URL

### If GitHub Pages shows 404:

1. Check that `gh-pages` branch exists:
   ```bash
   git branch -a
   ```

2. Verify `vite.config.ts` has correct base path:
   ```typescript
   base: '/plant-price-calculator/'
   ```

3. Make sure repository name matches the base path

### Update Deployment

After making changes:
```bash
npm run deploy
```

This will rebuild and redeploy automatically.

---

## Alternative: Deploy to Vercel (Free)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow prompts (defaults are usually fine)

Your app will be available at: `https://plant-price-calculator.vercel.app`

---

## Alternative: Deploy to Netlify (Free)

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. Follow prompts to login and setup

Your app will be available at: `https://plant-price-calculator.netlify.app`

