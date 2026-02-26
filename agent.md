# Agent: Run this webpage locally

This project is a static site (HTML/CSS/JS). Use a Python virtual environment and built-in HTTP server to serve it locally.

## One-time setup

1. **Create and activate the virtual environment** (from the project root):

   **PowerShell (Windows):**
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

   **Command Prompt (Windows):**
   ```bat
   python -m venv venv
   venv\Scripts\activate.bat
   ```

   **macOS/Linux:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Install dependencies** (optional; none required for basic serving):
   ```bash
   pip install -r requirements.txt
   ```

## Run the webapp locally

With the virtual environment **activated** (you should see `(venv)` in your prompt):

```bash
python -m http.server 8000
```

Then open in your browser: **http://localhost:8000**

- Homepage: http://localhost:8000/
- Subpages: http://localhost:8000/cope/, http://localhost:8000/360pro/, http://localhost:8000/tedx/

Press **Ctrl+C** in the terminal to stop the server.

## Quick reference (after venv exists)

```bash
# Activate venv then start server
.\venv\Scripts\Activate.ps1   # Windows PowerShell
python -m http.server 8000
```
