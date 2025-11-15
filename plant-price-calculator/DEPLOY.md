# Deployment Guide - Plant Price Calculator

## Quick Deploy to GitHub Pages

**Repository**: `https://github.com/chinhnt113/ulala-project`

### Step 1: Deploy to GitHub Pages

**✅ Đã deploy thành công!**

Để deploy lại sau khi có thay đổi, chạy:

```bash
cd plant-price-calculator
npm run deploy
```

Lệnh này sẽ:
- Build production bundle (`npm run build`)
- Tự động tạo/update branch `gh-pages`
- Push `dist` folder lên GitHub

### Step 2: Enable GitHub Pages

1. Vào repository: https://github.com/chinhnt113/ulala-project
2. Click tab **Settings**
3. Scroll xuống phần **Pages** (sidebar bên trái)
4. Trong phần **Source**, chọn:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

### Step 3: Access Your App

Sau vài phút, app sẽ có tại:
```
https://chinhnt113.github.io/ulala-project/
```

**Lưu ý**: Có thể mất 1-5 phút để GitHub Pages cập nhật sau khi deploy.

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

