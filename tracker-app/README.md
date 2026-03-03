# tracker-app — local run helper

This folder contains a small static frontend for your Codeforces mastery tracker.

Use the included `start_server.py` to start a port-resilient local server.

Quick start (from repository root):

```bash
python "CF_Mastery_Roadmap/tracker-app/start_server.py"
```

Behavior:
- Tries port `8000` by default. If `8000` is busy it will use the next free port (up to `9000`).
- The chosen port is written to `.server_port` inside this folder.
- Pass `--no-browser` to avoid opening a browser automatically.
- To force a specific port: `--port 8000` (if that port is busy it will fall back if available in range).

Examples:

```bash
# try 8000, open browser
python CF_Mastery_Roadmap/tracker-app/start_server.py

# force host and port
python CF_Mastery_Roadmap/tracker-app/start_server.py --host 0.0.0.0 --port 8000

# avoid auto-opening browser
python CF_Mastery_Roadmap/tracker-app/start_server.py --no-browser
```

Quick-start helpers (Windows)

- Double-click `start-tracker.bat` in this folder to run the server (passes any extra args through).
- Or from PowerShell run:

```powershell
./start-tracker.ps1 -Port 8000
```

Both scripts call `start_server.py` and accept the same arguments (for example add `--no-browser` to avoid auto-opening a browser).

