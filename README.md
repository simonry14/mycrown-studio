# 👑 MyCrown Studio

Screen recording suite for creating MyCrown AI promotional TikTok/Reels videos.

## Quick Deploy (3 options)

### Option A: Vercel (Recommended — Free, fastest)

1. Push this project to GitHub:
   ```bash
   cd mycrown-studio
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create mycrown-studio --public --push
   ```

2. Go to [vercel.com](https://vercel.com) → Sign in with GitHub

3. Click **"Add New Project"** → Import your `mycrown-studio` repo

4. Vercel auto-detects Vite. Just click **Deploy**.

5. Done! Your app is live at `mycrown-studio.vercel.app`
   - Optional: Add a custom domain like `studio.mycrown.ai` in Vercel settings

### Option B: Netlify (Free)

1. Push to GitHub (same as above)

2. Go to [netlify.com](https://netlify.com) → Sign in with GitHub

3. Click **"Add new site"** → **"Import an existing project"** → Select repo

4. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `dist`

5. Click **Deploy**. Live at `mycrown-studio.netlify.app`

### Option C: GitHub Pages (Free, no account needed beyond GitHub)

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json` scripts:
   ```json
   "deploy": "vite build && gh-pages -d dist"
   ```

3. Add `base` to `vite.config.js`:
   ```js
   base: '/mycrown-studio/',
   ```

4. Run:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages in repo Settings → Pages → Source: `gh-pages` branch

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Custom Domain Setup

To host at `studio.mycrown.ai`:

### On Vercel:
1. Go to Project Settings → Domains
2. Add `studio.mycrown.ai`
3. Add a CNAME record in your DNS:
   - Name: `studio`
   - Value: `cname.vercel-dns.com`

### On Netlify:
1. Go to Site Settings → Domain Management
2. Add `studio.mycrown.ai`
3. Add CNAME record:
   - Name: `studio`
   - Value: `your-site-name.netlify.app`

## Tech Stack

- React 18 + Vite
- Browser MediaRecorder API (screen capture + canvas compositing)
- No backend needed — everything runs client-side
