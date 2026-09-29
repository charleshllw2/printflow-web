import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_URL, structuredData } from '../seo/site';
interface SEOProps {
  title: string; description: string; canonicalUrl?: string; schema?: string;
  ogImage?: string; ogType?: string; ogImageAlt?: string; noindex?: boolean;
}
export default function SEO({ title, description, canonicalUrl, schema, ogImage, ogType = 'website', ogImageAlt, noindex = false }: SEOProps) {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, '') || '/';
  const canonical = canonicalUrl || SITE_URL + path;
  const image = ogImage || `${SITE_URL}/logo.png`;
  return <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content={noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'} />
    {!noindex && <link rel="canonical" href={canonical} />}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content={ogType} />
    <meta property="og:image" content={image} />
    {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
    <meta property="og:url" content={canonical} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    {!noindex && <script type="application/ld+json">{structuredData(path, title, schema)}</script>}
  </Helmet>;
}
