import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function ChurchShirts() {
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
        "name": "Custom Church & Ministry Apparel",
        "provider": {
          "@id": "https://printflowstudio.com"
        },
        "areaServed": {
          "@type": "City",
          "name": "Chattanooga"
        },
        "description": "Custom church shirts and ministry apparel in Chattanooga, TN. Printing for youth groups, volunteers, outreach, and worship teams."
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
            "name": "Custom Church Shirts Chattanooga"
          }
        ]
      }
    ]
  });

  return (
    <Layout>
      <SEO 
        title="Custom Church Shirts Chattanooga TN | Ministry Apparel" 
        description="PrintFlow Studio provides custom church shirts, youth group shirts, and ministry apparel in Chattanooga, TN. Local pickup and bulk discounts available."
        canonicalUrl="https://printflowstudio.com/church-shirts-chattanooga"
        schema={schema}
      />
      
      <div className="bg-dark text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Custom Church Shirts & Ministry Apparel in Chattanooga</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            Inspire your congregation and community with high-quality custom ministry apparel. From youth groups to volunteer teams, we print shirts that spread your message.
          </p>
          <Link to="/request-quote?service=church-shirts" className="btn btn-primary btn-lg">
            Start Your Order
          </Link>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Apparel for Every Ministry</h2>
            <p className="text-lg text-gray-700 mb-4">
              We know that every event, retreat, and service matters. That's why we specialize in providing premium <strong>custom church shirts Chattanooga</strong> ministries can rely on. Whether you are outfitting your worship team or preparing for a massive summer outreach, we deliver high-quality printing with exceptional service.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our <strong>church shirts Chattanooga TN</strong> printing services cater to congregations of all sizes. From vibrant <strong>youth group shirts Chattanooga</strong> teens will love to wear, to comfortable <strong>church event shirts</strong> for your faithful volunteers, PrintFlow Studio makes ordering simple.
            </p>
            <Link to="/request-quote" className="btn btn-outline font-bold">Get a Custom Quote</Link>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-accent">Outfit Your Entire Church</h3>
            <ul className="space-y-3">
              <li>✓ <strong>Church Staff & Volunteers:</strong> Easily identifiable and welcoming apparel.</li>
              <li>✓ <strong>Youth Groups:</strong> Trendy and durable shirts for camps and retreats.</li>
              <li>✓ <strong>Worship Teams:</strong> Comfortable, unified looks for Sunday morning.</li>
              <li>✓ <strong>Outreach & Missions:</strong> Stand out in the community while serving.</li>
              <li>✓ <strong>Conferences & Special Events:</strong> Memorable takeaways for attendees.</li>
              <li>✓ <strong>Ministry Merchandise:</strong> High-quality retail-ready apparel for your church store.</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-10 rounded-xl mb-16 border border-gray-200 text-center">
          <h2 className="text-3xl font-bold mb-6">Local Service, Bulk Savings</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              When ordering <strong>custom ministry apparel</strong> for large congregations or events, budget and logistics matter. We offer generous bulk-order pricing to help your ministry's budget go further.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Plus, save on shipping costs by utilizing our convenient local Chattanooga pickup! If you have multiple campuses across the country, we also provide fast, reliable nationwide shipping.
            </p>
            <Link to="/custom-tshirts-chattanooga" className="text-accent font-bold hover:underline">Learn more about our Custom T-Shirt printing process →</Link>
          </div>
        </div>

        <div className="text-center bg-dark text-white p-12 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Outfit Your Ministry?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact PrintFlow Studio today to discuss your next church apparel project. Let's create something beautiful together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/request-quote?service=church-shirts" className="btn btn-primary btn-lg">
              Start Your Order
            </Link>
            <Link to="/school-shirts-chattanooga" className="btn btn-outline light btn-lg border-white text-white">
              Also Need School Shirts?
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
