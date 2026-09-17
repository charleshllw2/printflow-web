import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import StarterPackPromo from "../../components/StarterPackPromo";

export default function BusinessApparel() {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "PrintFlow Studio",
        "image": "https://printflowstudio.com/logo.png",
        "url": "https://printflowstudio.com",
        "telephone": "423-681-2218",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Chattanooga",
          "addressLocality": "Chattanooga",
          "addressRegion": "TN",
          "addressCountry": "US"
        }
      },
      {
        "@type": "Service",
        "name": "Custom Business Apparel",
        "provider": {
          "@id": "https://printflowstudio.com"
        },
        "areaServed": {
          "@type": "City",
          "name": "Chattanooga"
        },
        "description": "Professional custom business apparel in Chattanooga, TN. We print company shirts, employee uniforms, and logo shirts for local businesses."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://printflowstudio.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://printflowstudio.com/services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Custom Business Apparel Chattanooga"
          }
        ]
      }
    ]
  });

  return (
    <Layout>
      <SEO 
        title="Custom Business Apparel Chattanooga TN | Logo & Employee Shirts" 
        description="Need custom business apparel in Chattanooga? PrintFlow Studio offers premium company logo shirts, employee uniforms, and branded apparel."
        canonicalUrl="https://printflowstudio.com/business-apparel-chattanooga"
        schema={schema}
      />
      
      <div className="bg-dark text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Custom Business Apparel in Chattanooga, TN</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            Professional company shirts and branded apparel designed for Chattanooga small businesses. From staff uniforms to promotional event apparel, we help your team look their best.
          </p>
          <Link to="/request-quote?service=business-apparel" className="btn btn-primary btn-lg">
            Get a Business Apparel Quote
          </Link>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Elevate Your Chattanooga Business</h2>
            <p className="text-lg text-gray-700 mb-4">
              Your team's appearance speaks volumes about your brand. Our premium <strong>custom business apparel Chattanooga</strong> services ensure that your employees look professional, cohesive, and recognizable.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Whether you need rugged <strong>employee shirts Chattanooga</strong> tradesmen can rely on, or soft, premium <strong>company shirts Chattanooga</strong> startups love, PrintFlow Studio has you covered. We specialize in printing high-quality <strong>logo shirts Chattanooga</strong> businesses are proud to wear.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><strong>Staff Uniforms:</strong> Durable, comfortable apparel for daily wear.</li>
              <li><strong>Promotional Apparel:</strong> Giveaways that clients will actually want to wear.</li>
              <li><strong>Event Apparel:</strong> Stand out at your next Chattanooga trade show or local event.</li>
            </ul>
            <Link to="/request-quote?package=business-starter" className="btn btn-outline font-bold">Request Business Pricing</Link>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-accent">Small Business & Bulk Orders</h3>
            <p className="text-gray-700 mb-4">
              We understand the unique needs of Chattanooga small businesses. That's why we make the ordering process simple, whether it's your first time ordering branded apparel Chattanooga TN style, or you need a fast reorder for new hires.
            </p>
            <ul className="space-y-3">
              <li>✓ No massive minimum requirements</li>
              <li>✓ Fast, local Chattanooga turnaround</li>
              <li>✓ Simple and rapid reordering for growing teams</li>
              <li>✓ Volume discounts for bulk orders</li>
            </ul>
          </div>
        </div>

        {/* Feature the existing Business Apparel Starter Pack */}
        <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Popular Business Packages</h2>
            <StarterPackPromo />
        </div>

        <div className="text-center bg-dark text-white p-12 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Equip Your Team Today</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to upgrade your company shirts? Request a custom quote and let PrintFlow Studio provide the best branded apparel for your Chattanooga business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/request-quote?service=business-apparel" className="btn btn-primary btn-lg">
              Get a Business Apparel Quote
            </Link>
            <Link to="/custom-tshirts-chattanooga" className="btn btn-outline light btn-lg border-white text-white">
              View All Custom Shirts
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
