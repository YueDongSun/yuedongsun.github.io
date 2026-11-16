import { createServer as create_server } from 'node:http';
import { readFile as read_file, stat } from 'node:fs/promises';
import { fileURLToPath as file_url_to_path } from 'node:url';
import { resolve, sep, extname } from 'node:path';

const output = resolve(file_url_to_path(new URL('../out/', import.meta.url)));
const review_page = file_url_to_path(new URL('./research_scene_preview.html', import.meta.url));
const port = Number(process.env.SCENE_PREVIEW_PORT ?? 4173);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('SCENE_PREVIEW_PORT must be an integer between 1024 and 65535.');
await stat(resolve(output, 'index.html')).catch(() => { throw new Error('Build the website first with npm run build_pages.'); });

const content_types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff': 'font/woff', '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8' };

// Only serves the local production export and this review page. It is never
// included by build_pages or the deployment workflow, and binds to loopback.
create_server(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method ?? '')) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
    let path = pathname === '/__scene-preview/' ? review_page : resolve(output, `.${pathname}`);
    if (path !== review_page && path !== output && !path.startsWith(output + sep)) {
      response.writeHead(403).end();
      return;
    }
    if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html');
    const content = await read_file(path);
    response.writeHead(200, { 'Content-Type': content_types[extname(path)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Website: http://127.0.0.1:${port}/`);
  console.log(`Scene review: http://127.0.0.1:${port}/__scene-preview/`);
});
