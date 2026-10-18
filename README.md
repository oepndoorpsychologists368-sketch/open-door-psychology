# Open Door Psychology & Wellness

> “Don’t Cry. Just Come.”  
> “You don’t have to carry it all alone.”

A luxury, compassionate psychology practice website built with React, TypeScript, Tailwind CSS, Lucide icons, and modern interactive wellness tools.

---

## Automatic Deployment to GitHub Pages

This project is configured with a automated GitHub Actions workflow (`.github/workflows/deploy.yml`). Whenever you push code to `main` or `master`, GitHub Actions will automatically install dependencies, build the production site, and publish it to GitHub Pages.

### One-Time Setup in Your GitHub Repository:

1. Open your repository on [GitHub.com](https://github.com).
2. Go to **Settings** (tab at top of your repo).
3. In the left sidebar, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment** > **Source**:
   - Change from **"Deploy from a branch"** to **"GitHub Actions"**.
5. That's it! Every future push will trigger the automated deployment workflow and publish your site at:
   `https://<your-username>.github.io/<your-repo-name>/`

---

## Local Development & Building

- Run development server:
  ```bash
  npm run dev
  ```

- Build production bundle:
  ```bash
  npm run build
  ```

- Preview production build:
  ```bash
  npm run preview
  ```
