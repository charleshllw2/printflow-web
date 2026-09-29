import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  schema?: string;
  ogImage?: string;
  ogType?: string;
  ogImageAlt?: string;
}

export default function SEO({ title, description, canonicalUrl, schema, ogImage, ogType = "website", ogImageAlt }: SEOProps) {
  const defaultImage = "https://printflowstudio.com/logo.png";
  const imageToUse = ogImage || defaultImage;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={imageToUse} />
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageToUse} />
      {schema && <script type="application/ld+json">{schema}</script>}
    </Helmet>
  );
}
