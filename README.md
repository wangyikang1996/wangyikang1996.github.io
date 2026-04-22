# Yikang Wang — Portfolio Website

Personal portfolio for Yikang Wang, Software Engineer at Indeed. Built with React + Vite, deployed to GitHub Pages.

Live: https://wangyikang1996.github.io

## Stack

- React 18
- Vite 5
- Vanilla CSS (custom-property tokens, dark/light theme)
- Deployed via GitHub Actions → GitHub Pages

## Local development

```bash
npm install
npm run dev
```

Vite dev server runs on http://localhost:5173.

## Production build

```bash
npm run build
npm run preview   # serves dist/ on http://localhost:4173
```

## Deployment

Pushes to the `master` branch trigger `.github/workflows/deploy.yml`, which:

1. Runs `npm ci` and `npm run build`
2. Copies legacy project subdirectories (`360pro/`, `cope/`, `tedx/`, `img/`, `svg/`, `categories/`, `tags/`, `*.pdf`, `sitemap.xml`, `index.xml`) into `dist/` so old links continue to resolve
3. Publishes `dist/` to GitHub Pages via the official `actions/deploy-pages` action

The `dist/` directory is gitignored — the workflow rebuilds it on every push.

## Project structure

```
.
├── index.html              # Vite entry — root document
├── src/
│   ├── main.jsx            # ReactDOM.createRoot
│   ├── App.jsx             # Theme state + direction wrapper
│   ├── data.js             # Single source of truth for portfolio content
│   ├── components/
│   │   ├── TerminalDirection.jsx
│   │   └── Icons.jsx
│   ├── hooks/
│   │   ├── useReveal.js    # IntersectionObserver-based scroll reveal
│   │   └── useLocalState.js
│   └── styles/
│       ├── base.css        # Tokens, reset, reveal animations
│       └── terminal.css    # Terminal-direction theme
├── public/
│   └── favicon.png
├── vite.config.js
├── package.json
│
├── .github/workflows/
│   └── deploy.yml          # Build + deploy pipeline
│
├── 360pro/  cope/  tedx/   # Legacy project case-study pages (kept as-is)
├── img/  svg/              # Legacy assets referenced by case studies
├── categories/  tags/      # Legacy taxonomy XML
├── *.pdf                   # Resume + project PDFs
└── sitemap.xml  index.xml  # SEO files
```

## Updating content

All portfolio copy lives in `src/data.js` (`SITE` object). Edit there, then:

```bash
npm run build && npm run preview
```

Push to `master` to deploy.
