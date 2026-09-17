import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function DTFTransfers() {
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
        "name": "Custom DTF Transfers",
        "provider": {
          "@id": "https://printflowstudio.com"
        },
        "areaServed": {
          "@type": "City",
          "name": "Chattanooga"
        },
        "description": "Professional custom DTF transfers and DTF printing in Chattanooga, TN. Ready-to-press heat transfers with local pickup."
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
            "name": "DTF Transfers Chattanooga"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are DTF Transfers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Direct-to-Film (DTF) transfers are a high-quality printing method where your design is printed onto a special film, backed with an adhesive powder, and cured. They are ready to be heat-pressed onto almost any fabric."
            }
          },
          {
            "@type": "Question",
            "name": "Can I pick up my DTF transfers in Chattanooga?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! We offer convenient local Chattanooga pickup for all DTF transfer orders, allowing you to get your ready to press transfers Chattanooga orders faster."
            }
          }
        ]
      }
    ]
  });

  return (
    <Layout>
      <SEO 
        title="Custom DTF Transfers Chattanooga TN | PrintFlow Studio" 
        description="Looking for DTF transfers in Chattanooga, TN? PrintFlow Studio offers premium custom DTF printing and ready-to-press transfers with local pickup."
        canonicalUrl="https://printflowstudio.com/dtf-transfers-chattanooga"
        schema={schema}
      />
      
      <div className="bg-dark text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Custom DTF Transfers in Chattanooga, TN</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            Professional DTF printing in Chattanooga. Order high-quality, full-color custom DTF transfers for shirts, hoodies, and compatible apparel.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/request-quote?service=dtf-transfers" className="btn btn-primary btn-lg">
              Order Custom Transfers
            </Link>
            <Link to="/dtf-transfers" className="btn btn-outline light btn-lg border-white text-white">
              Shop Ready-To-Press
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">What Are DTF Transfers?</h2>
            <p className="text-lg text-gray-700 mb-4">
              Direct-to-Film (DTF) printing is revolutionizing the custom apparel industry. With our premium <strong>DTF transfers Chattanooga TN</strong> services, your designs are printed in vibrant, full-color on a specialized film, backed with an adhesive powder, and cured.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              The result? Beautiful, durable, and stretchy <strong>DTF heat transfers</strong> that are ready to press onto cotton, polyester, blends, denim, and more. Say goodbye to the limitations of vinyl and screen printing minimums.
            </p>
            <h3 className="text-2xl font-bold mb-3 mt-8">Benefits of DTF Printing</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Full-color printing with unlimited gradients and details</li>
              <li>Applies to light or dark garments effortlessly</li>
              <li>Extremely durable with great stretch and washability</li>
              <li>No weeding required</li>
            </ul>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-accent">Who Are They For?</h3>
            <ul className="space-y-4">
              <li>
                <strong>Apparel Brands & Creators:</strong> Launch your clothing line using our reliable DTF printing Chattanooga services.
              </li>
              <li>
                <strong>Small Businesses:</strong> Press your own <Link to="/business-apparel-chattanooga" className="text-dark hover:text-accent font-bold">business apparel</Link> in-house.
              </li>
              <li>
                <strong>Crafters & Hobbyists:</strong> Browse our <Link to="/dtf-transfers" className="text-dark hover:text-accent font-bold">ready-to-press transfers</Link> for your next DIY project.
              </li>
              <li>
                <strong>Local Print Shops:</strong> We supply bulk custom DTF transfers and gang sheets.
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-10 rounded-xl mb-16 border border-gray-200 text-center">
          <h2 className="text-3xl font-bold mb-6">How to Order DTF Transfers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-accent text-4xl font-bold mb-2">1</div>
              <h4 className="font-bold mb-2">Prepare Your Artwork</h4>
              <p className="text-sm text-gray-600">Ensure your artwork meets our <Link to="/file-guidelines" className="text-accent">file requirements</Link> (300 DPI, transparent background, PNG/SVG).</p>
            </div>
            <div>
              <div className="text-accent text-4xl font-bold mb-2">2</div>
              <h4 className="font-bold mb-2">Submit Your Order</h4>
              <p className="text-sm text-gray-600">Send us your designs for custom DTF transfers or gang sheets.</p>
            </div>
            <div>
              <div className="text-accent text-4xl font-bold mb-2">3</div>
              <h4 className="font-bold mb-2">Pickup or Ship</h4>
              <p className="text-sm text-gray-600">We offer rapid local Chattanooga pickup and fast nationwide shipping.</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-bold text-lg mb-2">What are DTF Transfers?</h4>
              <p className="text-gray-700">Direct-to-Film (DTF) transfers are a high-quality printing method where your design is printed onto a clear film, ready to be heat-pressed onto almost any fabric.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-bold text-lg mb-2">Can I pick up my DTF transfers in Chattanooga?</h4>
              <p className="text-gray-700">Yes! We offer convenient local Chattanooga pickup for all custom DTF and ready to press transfers Chattanooga orders.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-bold text-lg mb-2">Can I use a household iron to press them?</h4>
              <p className="text-gray-700">We strongly recommend using a commercial heat press for accurate temperature and heavy, even pressure. Household irons may result in the transfer peeling off in the wash.</p>
            </div>
          </div>
        </div>

        <div className="text-center bg-dark text-white p-12 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Start Your DTF Transfer Order</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to upgrade your custom apparel game? Order premium DTF heat transfers in Chattanooga today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/request-quote?service=dtf-transfers" className="btn btn-primary btn-lg">
              Order Custom Transfers
            </Link>
            <Link to="/custom-tshirts-chattanooga" className="btn btn-outline light btn-lg border-white text-white">
              Need Us to Press It?
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
