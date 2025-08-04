#!/usr/bin/env python3
"""
PowerGridX Development Server
Simple HTTP server for serving the PowerGridX application
"""

import http.server
import socketserver
import os
import sys
import webbrowser
from pathlib import Path

# Configuration
PORT = 8080
DIRECTORY = Path(__file__).parent

class PowerGridXHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler for PowerGridX application"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add CORS headers for development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        # Serve powergridx.html for root path
        if self.path == '/':
            self.path = '/powergridx.html'
        
        # Add proper MIME types
        if self.path.endswith('.js'):
            self.send_response(200)
            self.send_header('Content-type', 'application/javascript')
            self.end_headers()
            try:
                with open(DIRECTORY / self.path[1:], 'rb') as f:
                    self.wfile.write(f.read())
            except FileNotFoundError:
                self.send_error(404)
            return
        elif self.path.endswith('.json'):
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            try:
                with open(DIRECTORY / self.path[1:], 'rb') as f:
                    self.wfile.write(f.read())
            except FileNotFoundError:
                self.send_error(404)
            return
        elif self.path.endswith('.svg'):
            self.send_response(200)
            self.send_header('Content-type', 'image/svg+xml')
            self.end_headers()
            try:
                with open(DIRECTORY / self.path[1:], 'rb') as f:
                    self.wfile.write(f.read())
            except FileNotFoundError:
                self.send_error(404)
            return
        
        super().do_GET()
    
    def log_message(self, format, *args):
        """Custom logging"""
        print(f"[PowerGridX] {format % args}")

def main():
    """Start the PowerGridX development server"""
    
    print("=" * 70)
    print("🔌 PowerGridX - Smart Infrastructure for Africa")
    print("=" * 70)
    print(f"📍 Serving from: {DIRECTORY}")
    print(f"🌐 Server running at: http://localhost:{PORT}")
    print(f"🚀 PowerGridX URL: http://localhost:{PORT}/powergridx.html")
    print("=" * 70)
    print("🎯 Demo Features:")
    print("   • Real-time grid monitoring")
    print("   • Interactive Ashanti Region map")
    print("   • Live transformer status")
    print("   • Predictive analytics")
    print("   • Alert management system")
    print("=" * 70)
    print("Press Ctrl+C to stop the server")
    print()
    
    try:
        with socketserver.TCPServer(("", PORT), PowerGridXHandler) as httpd:
            print(f"✅ PowerGridX server started successfully!")
            print(f"🌍 Open http://localhost:{PORT} in your browser")
            print()
            
            # Try to open browser automatically
            try:
                webbrowser.open(f'http://localhost:{PORT}')
                print("🚀 Browser opened automatically")
            except:
                print("💡 Please open http://localhost:8080 manually in your browser")
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 PowerGridX server stopped by user")
        sys.exit(0)
    except OSError as e:
        if e.errno == 10048:  # Windows: Address already in use
            print(f"❌ Port {PORT} is already in use!")
            print("💡 Try closing other applications or use a different port")
        else:
            print(f"❌ Server error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
