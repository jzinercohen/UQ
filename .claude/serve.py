"""Static dev server for the UrbanQuest site.

Plain `python3 -m http.server` has two habits that get in the way here:

1. It sends no cache headers, so browsers apply heuristic caching and keep
   serving stale `projects.js` / `styles.css` after an edit. Since the entire
   development loop for this project is "edit a file, reload the browser",
   a stale cache is the one thing that must not happen.
2. It does not set SO_REUSEADDR, so a restart inside the socket's TIME_WAIT
   window dies with "Address already in use".

Both are fixed below. Standard library only — no dependencies, matching the
rest of the project.

Run via `preview_start` with the `site` config in launch.json, or directly:
    python3 .claude/serve.py [port]
"""

import http.server
import os
import socketserver
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4321
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_header(self, keyword, value):
        # Drop Last-Modified. Without an explicit freshness lifetime a browser
        # falls back to *heuristic* caching, guessing one from this header —
        # which is what kept serving a stale index.html even alongside
        # `no-store`. With no validator there is nothing to guess from.
        if keyword.lower() in ('last-modified', 'etag'):
            return
        super().send_header(keyword, value)

    def end_headers(self):
        # Force revalidation on every request so an edit always shows up.
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, fmt, *args):
        # Quieter than the default: errors only, so real problems stand out.
        if args and str(args[1]).startswith(('4', '5')):
            super().log_message(fmt, *args)


socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(('', PORT), Handler) as httpd:
    print(f'Serving {ROOT} at http://localhost:{PORT}  (no-store)')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
