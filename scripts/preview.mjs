import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ttf': 'font/ttf', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json' };
createServer(async (request, response) => {
    try {
        const url = new URL(request.url, 'http://localhost');
        if (url.pathname === '/togather') { response.writeHead(301, { Location: '/togather/' }); response.end(); return; }
        if (!url.pathname.startsWith('/togather/')) { response.writeHead(404); response.end('Not found'); return; }
        let target = path.resolve(root, '.' + decodeURIComponent(url.pathname.slice('/togather'.length)));
        if (!target.startsWith(root + path.sep) && target !== root) throw new Error('Invalid path');
        if ((await stat(target)).isDirectory()) {
            if (!url.pathname.endsWith('/')) { response.writeHead(301, { Location: url.pathname + '/' }); response.end(); return; }
            target = path.join(target, 'index.html');
        }
        const body = await readFile(target);
        response.writeHead(200, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); response.end(body);
    } catch { response.writeHead(404); response.end(await readFile(path.join(root, '404.html'))); }
}).listen(8765, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:8765/togather/'));
