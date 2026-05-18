# Sphinx Protocol Website

> Official website for Sphinx FND.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare_Pages-F38020?logo=cloudflare)](https://pages.cloudflare.com/)

---

## Live Website

https://website.sphinxfnd.workers.dev/

---


## Tech Stack

```txt
HTML5
CSS3
Vanilla JavaScript (ES6+)
Google Fonts
Intersection Observer API
Cloudflare Pages
```

---

## Project Structure

```txt
web/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   └── favicon.png
├── robots.txt
├── sitemap.xml
├── site.webmanifest
└── llms.txt
```

---

## Local Development

```bash
# Clone repository
git clone https://github.com/sphinxorg/website.git

# Enter project
cd website

# Start local server
python3 -m http.server 8000

# Alternative
npx serve

# Open browser
http://localhost:8000
```

---

## Deployment

### Cloudflare Pages

Automatic deployment is connected to the `main` branch.

```bash
git add .
git commit -m "update"
git push origin main
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## Performance Optimizations

- Deferred animation rendering
- Reduced quantum particle load
- Async stylesheet loading
- DNS prefetch optimization
- Minimal font loading
- Lightweight vanilla JavaScript architecture

---

## Theme Configuration

Dark/light mode preference is stored using:

```javascript
localStorage
```

CSS variables are controlled from:

```css
:root {
  --bg: #0a0a0f;
  --accent: #4fc3f7;
  --gold: #ffd54f;
}
```

---

## SEO Configuration

Update inside `index.html`:

```txt
DOMAIN.com
Twitter handles
OpenGraph image URLs
Search Console verification
```

---

## License

[MIT License](https://github.com/sphinxorg/website?tab=MIT-1-ov-file)

---

## Contributing

```bash
# Fork repository

# Create branch
git checkout -b feature/amazing

# Commit changes
git commit -m "Add amazing feature"

# Push branch
git push origin feature/amazing
```

Open a Pull Request after pushing.

---

## Disclaimer

This project is provided for informational and research purposes only.

Cryptocurrency, cryptography, and blockchain systems involve technical and financial risks. Always perform independent research before interacting with decentralized systems.

---

Built by the Sphinx FND