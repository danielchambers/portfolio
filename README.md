# Portfolio Website

This repository contains the source code for my personal portfolio website.  
It’s a simple static site built with **HTML, CSS, and JavaScript**, with automated formatting, linting, testing, and deployment via **GitHub Actions**.

---

## Features

- Responsive layout with modern HTML + CSS
- Organized project structure:
  - `/css` – stylesheets
  - `/js` – scripts
  - `/images` – assets
  - `/index.html` – main entry point
- Unit tests with **Jest**
- Code style enforcement with **Prettier** and **ESLint**
- Build process that minifies assets into `/dist`
- Continuous deployment to shared hosting (cPanel FTP)

---

## CI/CD with GitHub Actions

This project uses **GitHub Actions** to automatically check, build, and deploy the site on every push to the `main` branch.

### Pipeline steps
1. **Prettier** – check formatting (`npm run format:check`)
2. **ESLint** – lint JavaScript (`npm run lint`)
3. **Jest** – run unit tests (`npm test`)
4. **Build** – minify HTML, CSS, and JS into `dist/`
5. **Deploy** – upload `dist/` to the server via FTP

### Secrets required
Go to your repo: **Settings → Secrets and variables → Actions → Secrets** and add:

- `FTP_SERVER` → FTP Server (e.g. `ftps.website.com`)
- `FTP_USERNAME` → FTP login (e.g. `username`)
- `FTP_PASSWORD` → FTP password
