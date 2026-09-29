import { renderToReadableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from './App';
export { publicPaths } from './seo/site';
export async function render(path: string) {
  const stream = await renderToReadableStream(<HelmetProvider><StaticRouter location={path}><AppRoutes /></StaticRouter></HelmetProvider>);
  await stream.allReady;
  let body = await new Response(stream).text();
  const tags: string[] = [];
  // React 19 hoists Helmet's native metadata rather than filling a legacy context.
  body = body.replace(/<title[^>]*>[\s\S]*?<\/title>|<meta\s[^>]*>|<link\s[^>]*>|<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, tag => { tags.push(tag.replace(/^<(\w+)/, '<$1 data-prerender="true"')); return ''; });
  return { body, head: tags.join('') };
}
