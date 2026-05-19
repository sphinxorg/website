# Sphinx Protocol Website

> Official website for Sphinx FND.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare_Pages-F38020?logo=cloudflare)](https://pages.cloudflare.com/)

---

## Live Website

https://sphinxfnd.org

---

## Overview

Single-page website for the Sphinx Protocol — a post-quantum blockchain infrastructure for Universal Sovereign Identity (USI).

Built entirely with:

```txt
Pure HTML
Pure CSS
Vanilla JavaScript
No frameworks
No build tools
No dependencies
```

---

## Website Sections

- Hero section with live SPIF encoding animation
- Vision & protocol pillars
- Technology stack
- SPIF address anatomy
- Live address ticker
- Feature tabs
- Roadmap timeline
- SPX coin overview
- Foundation & team

---

## Tech Stack

```txt
HTML5
CSS3
Vanilla JavaScript (ES6+)
Google Fonts
Intersection Observer API
Canvas API
Web Animations API
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

## Core Features

### Quantum Canvas Background

Animated particle system rendered through:

```html
<canvas id="quantum-canvas">
```

Features:

- Quantum-style particle movement
- Dynamic connection lines
- Opacity fading
- Randomized positioning
- Lightweight rendering optimizations

---

### SPIF Encoding Animation

Live public-key encoding sequence:

```txt
PUB KEY → ENCODING → SPIF ADDRESS
```

Driven by:

```txt
fpEncodeBlock
```

inside:

```txt
main.js
```

---

### Live SPIF Ticker

Fixed footer ticker streams randomized SPIF addresses with live statuses:

```txt
VERIFIED
ACTIVE
PENDING
```

Uses infinite CSS marquee animation.

---

### SPIF Anatomy Block

Interactive breakdown of SPIF address structure with:

- Prefix segments
- Byte grouping visualization
- Animated labels
- Rolling address stream

---

### Feature Tabs

Dynamic audience filtering:

```txt
Individual
Business
Developer
```

Cards are filtered using:

```txt
data-categories
```

attributes.

---

### Roadmap Dropdowns

Expandable roadmap panels:

```txt
Angel Round
Private Sale
Public ICO
Genesis Supply
Distribution
```

Includes modal popup for terms/disclaimers.

---

### Dark / Light Theme

Theme preference stored via:

```javascript
localStorage
```

CSS variable switching controlled through:

```txt
[data-theme]
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

No build step required.

---

## Deployment

### Cloudflare Pages

```bash
git add .
git commit -m "update"
git push origin main
```

Automatic deployment connected to:

```txt
main branch
```

---

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

### Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## Performance Optimizations

- Async stylesheet preloading
- Deferred JavaScript loading
- Reduced particle count on low-end devices
- Lazy scroll reveal animations
- DNS prefetch optimization
- Lightweight font stack
- Zero external JS dependencies

---

## Theme Configuration

Stored using:

```javascript
localStorage.setItem('theme', 'dark')
localStorage.setItem('theme', 'light')
```

CSS variables:

```css
:root {
  --bg:      #0a0a0f;
  --bg2:     #0e0e16;
  --surface: #181824;
  --accent:  #4fc3f7;
  --accent2: #00e5ff;
  --accent3: #7c4dff;
  --gold:    #ffd54f;
  --text:    #e8e8f0;
  --text2:   #9898b0;
  --text3:   #5a5a72;
}

[data-theme="light"] {
  --bg:      #f4f4f8;
  --accent:  #0277bd;
  --gold:    #f57f17;
}
```

---

## SEO Configuration

Update inside:

```txt
index.html
```

Replace:

```txt
YOUR_DOMAIN
YOUR_IMAGE_URL
YOUR_HANDLE
YOUR_CODE
```

Structured data already included:

```txt
Organization
WebSite
TechArticle
```

---

## JavaScript Systems

| System | Purpose |
|---|---|
| Quantum canvas | Particle background |
| SPIF animation | Public key encoding loop |
| Anatomy ticker | Rolling SPIF stream |
| Footer ticker | Infinite address marquee |
| Scroll reveal | Lazy animation system |
| Theme toggle | Dark/light switching |
| Hamburger menu | Mobile navigation |
| Feature tabs | Audience filtering |
| Dropdown panels | Funding round expansion |
| Terms modal | SPX disclaimer popup |

---

## License

MIT License

---

## Contributing

```bash
# Fork repository

# Create branch
git checkout -b feature/your-feature

# Commit changes
git commit -m "Add your feature"

# Push branch
git push origin feature/your-feature
```

Open a Pull Request after pushing.

---

## Disclaimer

This project is provided for informational and research purposes only.

Cryptocurrency, cryptography, and blockchain systems involve technical and financial risks.

SPX coins do not grant ownership, voting rights, or governance authority over the Sphinx Protocol platform.

Always perform independent research before interacting with decentralized systems.

---

Built by the Sphinx FND
