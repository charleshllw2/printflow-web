import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function CustomTShirts() {
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
        "name": "Custom T-Shirt Printing",
        "provider": {
          "@id": "https://printflowstudio.com"
        },
        "areaServed": {
          "@type": "City",
          "name": "Chattanooga"
        },
        "description": "Professional custom T-shirt printing in Chattanooga for businesses, schools, churches, and events."
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
            "name": "Custom T-Shirts Chattanooga"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the turnaround time for custom shirts in Chattanooga?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our standard turnaround time is typically 5-10 business days, depending on the size and complexity of your custom apparel order."
            }
          },
          {
            "@type": "Question",
            "name": "Do you have a minimum order requirement?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer flexible order quantities to accommodate everything from small family reunions to large corporate events."
            }
          }
        ]
      }
    ]
  });

  return (
    <Layout>
      <SEO 
        title="Custom T-Shirts Chattanooga | Local Shirt Printing | PrintFlow Studio" 
        description="Looking for custom T-shirts in Chattanooga, TN? PrintFlow Studio offers professional custom apparel, fast turnaround, local pickup, and nationwide shipping."
        canonicalUrl="https://printflowstudio.com/custom-tshirts-chattanooga"
        schema={schema}
      />
      
      <div className="bg-dark text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Custom T-Shirt Printing in Chattanooga, TN</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            High-quality custom shirts in Chattanooga, TN. We provide vibrant custom printed shirts for local businesses, schools, churches, teams, organizations, family reunions, events, and fundraisers.
          </p>
          <Link to="/request-quote?service=custom-t-shirts" className="btn btn-primary btn-lg">
            Start Your Order
          </Link>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Chattanooga Shirt Printing Services</h2>
            <p className="text-lg text-gray-700 mb-4">
              At PrintFlow Studio, we make custom apparel Chattanooga locals trust. Whether you need a handful of custom shirts for a family gathering or hundreds of printed garments for a corporate event, our premium custom T-shirt printing in Chattanooga ensures you get the best quality. 
            </p>
            <p className="text-lg text-gray-700 mb-6">
              We proudly serve individuals, businesses, and organizations throughout Chattanooga and the surrounding Tennessee Valley with flexible quantities and fast turnarounds.
            </p>
            <Link to="/request-quote" className="btn btn-outline font-bold">Get a Quote</Link>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-accent">Who We Serve</h3>
            <ul className="space-y-3">
              <li><strong><Link to="/business-apparel-chattanooga" className="text-dark hover:text-accent">Business Shirts:</Link></strong> Professional branded uniforms and staff shirts.</li>
              <li><strong><Link to="/church-shirts-chattanooga" className="text-dark hover:text-accent">Church & Ministry Shirts:</Link></strong> Apparel for youth groups, volunteers, and events.</li>
              <li><strong><Link to="/school-shirts-chattanooga" className="text-dark hover:text-accent">Team and School Apparel:</Link></strong> Spirit wear, club shirts, and coach apparel.</li>
              <li><strong>Event Shirts:</strong> Runs, charity fundraisers, and festivals.</li>
              <li><strong>Family Reunion Shirts:</strong> Matching custom printed shirts for your next family gathering.</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-10 rounded-xl mb-16 border border-gray-200 text-center">
          <h2 className="text-3xl font-bold mb-6">How Ordering Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-accent text-4xl font-bold mb-2">1</div>
              <h4 className="font-bold mb-2">Request a Quote</h4>
              <p className="text-sm text-gray-600">Tell us what you need and submit your artwork.</p>
            </div>
            <div>
              <div className="text-accent text-4xl font-bold mb-2">2</div>
              <h4 className="font-bold mb-2">Review Proof</h4>
              <p className="text-sm text-gray-600">We send a digital mockup for your approval.</p>
            </div>
            <div>
              <div className="text-accent text-4xl font-bold mb-2">3</div>
              <h4 className="font-bold mb-2">We Print</h4>
              <p className="text-sm text-gray-600">Your custom apparel is expertly printed in-house.</p>
            </div>
            <div>
              <div className="text-accent text-4xl font-bold mb-2">4</div>
              <h4 className="font-bold mb-2">Pickup or Ship</h4>
              <p className="text-sm text-gray-600">Enjoy local Chattanooga pickup or nationwide shipping.</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-bold text-lg mb-2">Do you offer local Chattanooga pickup?</h4>
              <p className="text-gray-700">Yes! We offer convenient local Chattanooga pickup for all orders. If you aren't local, we also provide fast nationwide shipping.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-bold text-lg mb-2">What is the turnaround time for custom shirts in Chattanooga?</h4>
              <p className="text-gray-700">Our standard turnaround time is typically 5-10 business days, depending on the size and complexity of your custom apparel order.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-bold text-lg mb-2">Do you have a minimum order requirement?</h4>
              <p className="text-gray-700">We offer flexible order quantities to accommodate everything from small family reunions to large corporate events.</p>
            </div>
          </div>
        </div>

        <div className="text-center bg-dark text-white p-12 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Print Your Custom Apparel?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the easiest custom t-shirt printing in Chattanooga. Request pricing today and our team will get back to you quickly!
          </p>
          <Link to="/request-quote?service=custom-t-shirts" className="btn btn-primary btn-lg">
            Start Your Order
          </Link>
          <p className="mt-4 text-sm text-gray-400">or explore our <Link to="/dtf-transfers-chattanooga" className="text-accent hover:underline">Custom DTF Transfers</Link></p>
        </div>
      </div>
    </Layout>
  );
}
