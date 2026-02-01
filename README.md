# Yikang Wang - Portfolio Website

Personal portfolio website showcasing data analytics, machine learning, and software engineering projects.

## Overview

This is a static HTML portfolio website hosted on GitHub Pages. It features:
- Personal introduction and background
- Skills and expertise in data analytics
- Academic projects and case studies
- Resume download
- Links to LinkedIn, Medium, and GitHub

## Prerequisites

- Python 3.x (usually pre-installed on macOS/Linux)
- A modern web browser

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/wangyikang1996/wangyikang1996.github.io.git
cd wangyikang1996.github.io
```

### 2. Run Locally

The website is a static site, so you can run it using Python's built-in HTTP server:

```bash
python3 -m http.server 8000
```

This will start a local server on port 8000.

### 3. Access the Website

Open your web browser and navigate to:
```
http://localhost:8000
```

## Stopping the Server

To stop the local server:

**Option 1:** Press `Ctrl+C` in the terminal where the server is running.

**Option 2:** If the server is running in the background, find and kill the process:
```bash
lsof -ti:8000 | xargs kill
```

Or find the process ID manually:
```bash
lsof -ti:8000
kill <PID>
```

## Project Structure

```
.
├── index.html          # Main homepage
├── css/                # Stylesheets
│   ├── final.css
│   └── normalize.css
├── js/                 # JavaScript files
│   ├── jquery-1.js
│   ├── scrollIt.js
│   └── stickUp.js
├── img/                # Images and assets
├── svg/                # SVG icons
├── cope/               # Doodle Image Recognition project page
├── tedx/               # Food Nutrition Website project page
├── 360pro/             # Action Movie Analysis project page
└── Yikang Wang-Resume- Nov 2025.docx.pdf  # Resume file
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (jQuery, scrollIt, stickUp)
- Static site generation (Hugo)

## Deployment

This website is automatically deployed to GitHub Pages from the `master` branch. Simply push changes to the repository:

```bash
git add .
git commit -m "Your commit message"
git push origin master
```

Changes will be live at: https://wangyikang1996.github.io

## Notes

- This is a static website, so changes to files are immediately reflected after a browser refresh
- No build step is required
- All assets are served from the repository root
