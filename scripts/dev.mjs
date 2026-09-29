// Vite and the same API handlers used by Vercel.
import { createServer } from 'vite';
import commerce from '../api/commerce.js';
const server = await createServer({
  server: { port: Number(process.env.PORT || 5173), strictPort: true },
  plugins: [{ name: 'local-commerce-api', configureServer(vite) {
    vite.middlewares.use('/api/commerce', async (req, res) => {
      try {
        req.query = Object.fromEntries(new URL(req.url, 'http://localhost').searchParams);
        let raw = '';
        for await (const chunk of req) { raw += chunk; if (raw.length > 8192) { res.statusCode = 413; res.end(); return; } }
        req.body = raw ? JSON.parse(raw) : {};
        res.status = code => { res.statusCode = code; return res; };
        res.json = data => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data)); return res; };
        await commerce(req, res);
      } catch { res.statusCode = 400; res.end(JSON.stringify({ error: 'Invalid request.' })); }
    });
  } }],
});
await server.listen(); server.printUrls();
