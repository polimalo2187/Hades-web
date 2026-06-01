const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const port = process.env.PORT || 3000;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, {
    'Content-Type': type,
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': status === 200 ? 'public, max-age=3600' : 'no-store'
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (url.pathname === '/health') return send(res, 200, JSON.stringify({ ok: true }), 'application/json; charset=utf-8');

    let filePath = path.normalize(path.join(publicDir, url.pathname === '/' ? 'index.html' : url.pathname));
    if (!filePath.startsWith(publicDir)) return send(res, 403, 'Forbidden');

    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        filePath = path.join(publicDir, 'index.html');
      }
      fs.readFile(filePath, (readErr, data) => {
        if (readErr) return send(res, 500, 'Internal Server Error');
        const ext = path.extname(filePath).toLowerCase();
        send(res, 200, data, types[ext] || 'application/octet-stream');
      });
    });
  } catch (err) {
    send(res, 500, 'Internal Server Error');
  }
});

server.listen(port, () => {
  console.log(`Hades Alpha promo web running on port ${port}`);
});
