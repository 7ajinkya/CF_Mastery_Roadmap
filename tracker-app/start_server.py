#!/usr/bin/env python3
"""
Port-resilient HTTP server for tracker-app.

Usage:
  python start_server.py [--port PORT] [--no-browser]

Behaviors:
- Tries the requested port (default 8000) and falls back to the next free port up to 9000.
- Writes the chosen port to `.server_port` in the `tracker-app` folder.
- Optionally opens the default browser.
- Serves study files from the parent CF_Mastery_Roadmap directory via /api/study/ endpoint.
"""
import argparse
import http.server
import socket
import socketserver
import webbrowser
import os
import sys
import json
from pathlib import Path
from urllib.parse import urlparse, parse_qs


class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler that supports serving study files from parent directory."""
    
    def do_GET(self):
        """Handle GET requests with support for /api/study/ endpoint."""
        parsed_path = urlparse(self.path)
        
        # Handle study file API endpoint
        if parsed_path.path.startswith('/api/study/'):
            return self.handle_study_file()
        
        # Fall back to default file serving
        return super().do_GET()
    
    def handle_study_file(self):
        """Serve markdown files from parent CF_Mastery_Roadmap directory."""
        # Extract filename from query parameter
        parsed_path = urlparse(self.path)
        query_params = parse_qs(parsed_path.query)
        filename = query_params.get('file', [None])[0]
        
        if not filename:
            self.send_error(400, "Missing 'file' parameter")
            return
        
        # Security: prevent directory traversal
        if '..' in filename or filename.startswith('/'):
            self.send_error(403, "Invalid file path")
            return
        
        # Build path to file in parent directory
        tracker_app_dir = os.path.dirname(os.path.abspath(__file__))
        parent_dir = os.path.dirname(tracker_app_dir)
        file_path = os.path.join(parent_dir, filename)
        
        # Normalize and verify path is within parent directory
        file_path = os.path.normpath(file_path)
        parent_dir = os.path.normpath(parent_dir)
        
        if not os.path.abspath(file_path).startswith(os.path.abspath(parent_dir)):
            self.send_error(403, "Access denied")
            return
        
        # Check if file exists
        if not os.path.isfile(file_path):
            self.send_error(404, f"File not found: {filename}")
            return
        
        try:
            # Read file content
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Send response
            self.send_response(200)
            self.send_header('Content-type', 'text/plain; charset=utf-8')
            self.send_header('Content-length', len(content.encode('utf-8')))
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(content.encode('utf-8'))
        except Exception as e:
            self.send_error(500, f"Error reading file: {str(e)}")


def try_listen(host, port):
    """
    Windows-safe port selection.
    On Windows, SO_REUSEADDR can make "probe bind" unreliable.
    We attempt to actually create the server to validate the port.
    """
    handler = CustomHTTPRequestHandler
    try:
        httpd = socketserver.ThreadingTCPServer((host, port), handler)
        return httpd
    except OSError:
        return None


def main():
    parser = argparse.ArgumentParser(description="Start a port-resilient static HTTP server")
    parser.add_argument("--port", type=int, help="Preferred port to try first (default 8000)", default=None)
    parser.add_argument("--no-browser", action="store_true", help="Don't open the browser")
    parser.add_argument("--start-port", type=int, default=8000, help="Start of fallback port range")
    parser.add_argument("--end-port", type=int, default=9000, help="End of fallback port range")
    parser.add_argument("--host", default="127.0.0.1", help="Host to bind to (default 127.0.0.1)")
    args = parser.parse_args()

    start = args.start_port
    if args.port:
        start = args.port

    httpd = None
    port = None
    for p in range(start, args.end_port + 1):
        httpd = try_listen(args.host, p)
        if httpd is not None:
            port = p
            break

    if httpd is None or port is None:
        print(f"No free port found in range {start}-{args.end_port}", file=sys.stderr)
        sys.exit(1)

    # serve from the tracker-app folder
    os.chdir(os.path.dirname(__file__) or ".")

    try:
        with httpd:
            url_host = "localhost" if args.host in ("127.0.0.1", "localhost") else args.host
            url = f'http://{url_host}:{port}/'
            # persist chosen port for other tools/scripts
            try:
                with open('.server_port', 'w') as f:
                    f.write(str(port))
            except Exception:
                pass

            print(f"Serving {os.getcwd()} at {url}", flush=True)
            if not args.no_browser:
                try:
                    webbrowser.open(url)
                except Exception:
                    pass

            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped by user", flush=True)
    except OSError as e:
        print(f"Failed to start server: {e}", file=sys.stderr, flush=True)
        sys.exit(1)


if __name__ == '__main__':
    main()
