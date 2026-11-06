import { createServer } from 'vite';
import checkout from '../api/create-shop-checkout.js';
import inquiry from '../api/submit-inquiry.js';
const server = await createServer({
  server: { port: Number(process.env.PORT || 5173), strictPort: true },
  plugins: [{ name: 'local-api', configureServer(vite) {
    for (const [path, handler] of [['/api/create-shop-checkout', checkout], ['/api/submit-inquiry', inquiry]]) {
      vite.middlewares.use(path, async (req, res) => {
        res.status = code => { res.statusCode = code; return res; };
        res.json = data => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data)); return res; };
        try {
          let raw = '';
          for await (const chunk of req) { raw += chunk; if (Buffer.byteLength(raw) > 3 * 1024 * 1024) return res.status(413).json({ error: 'Request too large.' }); }
          req.body = raw ? JSON.parse(raw) : {};
          await handler(req, res);
        } catch { res.status(400).json({ error: 'Invalid request.' }); }
      });
    }
  } }],
});
await server.listen(); server.printUrls();
