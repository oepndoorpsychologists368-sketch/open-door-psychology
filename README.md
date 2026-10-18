# Open Door Psychology & Wellness

> “Don’t Cry. Just Come.”  
> “You don’t have to carry it all alone.”

A luxury, compassionate psychology practice website built with React 19, TypeScript, Tailwind CSS, Lucide icons, and modern interactive wellness tools.

---

## GitHub Pages Deployment Guide

If you previously saw a blank white screen at `https://khadijatulkubra368-sketch.github.io/open-door-psychology/`, this happened because GitHub Pages was set to serve the uncompiled root of the `main` branch (which contains raw `.tsx` source files that web browsers cannot run), while a dependency resolution issue had prevented automated CI builds.

We have resolved all underlying issues:
1. **Fixed NPM Dependency Conflicts**: Cleaned peer dependencies in `package.json` and generated `package-lock.json` for deterministic CI execution (`npm ci`).
2. **Pre-compiled `docs/` Distribution**: The production bundle is now pre-built directly into `/docs` (including `docs/404.html` for single-page routing).
3. **Smart `index.html` Safeguard**: `index.html` now includes a branded pre-mount sanctuary loader and automatic redirect to `/docs/` if loaded directly from GitHub Pages root.
4. **Automated GitHub Actions Pipeline**: `.github/workflows/deploy.yml` automatically compiles and deploys on every push to `main`.

---

### How to Activate Your Live Site on GitHub Pages

Choose either of the two easy options below in your GitHub repository:

#### Option A: GitHub Actions (Recommended — Automated)
1. Go to your repository: [github.com/khadijatulkubra368-sketch/open-door-psychology](https://github.com/khadijatulkubra368-sketch/open-door-psychology)
2. Click **Settings** (top navigation tab)
3. In the left sidebar, click **Pages** (under *Code and automation*)
4. Under **Build and deployment** > **Source**:
   - Change the dropdown from **"Deploy from a branch"** to **"GitHub Actions"**
5. Push your code or click **Actions** > **Deploy Open Door to GitHub Pages** > **Run workflow**
6. Your site will be live at:  
   **https://khadijatulkubra368-sketch.github.io/open-door-psychology/**

#### Option B: Deploy from Branch via `/docs` (Instant)
If you prefer using "Deploy from a branch":
1. Go to **Settings** > **Pages**
2. Ensure **Source** is set to **"Deploy from a branch"**
3. Under **Branch**:
   - Select **`main`**
   - In the folder dropdown, change **`/ (root)`** to **`/docs`**
4. Click **Save**
5. GitHub Pages will serve the pre-built files from `/docs` immediately!

---

## Local Development & Commands

- Start local dev server:
  ```bash
  npm run dev
  ```
- Build production bundle (updates both `dist/` and `docs/`):
  ```bash
  npm run build
  ```
- Type check:
  ```bash
  npm run lint
  ```
- Preview build locally:
  ```bash
  npm run preview
  ```
