import { createServer } from 'vite';
import checkout from '../api/create-shop-checkout.js';
const server = await createServer({
  server: { port: Number(process.env.PORT || 5173), strictPort: true },
  plugins: [{ name: 'local-checkout-api', configureServer(vite) {
    vite.middlewares.use('/api/create-shop-checkout', async (req, res) => {
      res.status = code => { res.statusCode = code; return res; };
      res.json = data => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data)); return res; };
      try {
        let raw = '';
        for await (const chunk of req) {
          raw += chunk;
          if (Buffer.byteLength(raw) > 8192) return res.status(413).json({ error: 'Request too large.' });
        }
        req.body = raw ? JSON.parse(raw) : {};
        await checkout(req, res);
      } catch { res.status(400).json({ error: 'Invalid request.' }); }
    });
  } }],
});
await server.listen(); server.printUrls();
