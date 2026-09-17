import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function SportsTeamShirts() {
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
        "name": "Custom Team Shirts & Sports Apparel",
        "provider": {
          "@id": "https://printflowstudio.com"
        },
        "areaServed": {
          "@type": "City",
          "name": "Chattanooga"
        },
        "description": "Custom team shirts and sports apparel in Chattanooga, TN. High-quality printed shirts for teams, coaches, fans, and tournaments."
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
            "name": "Custom Team Shirts Chattanooga"
          }
        ]
      }
    ]
  });

  return (
    <Layout>
      <SEO 
        title="Custom Team Shirts Chattanooga TN | Sports & Coach Apparel" 
        description="Gear up with custom team shirts in Chattanooga, TN. We provide premium printed apparel for sports teams, coaches, tournaments, and dedicated fans."
        canonicalUrl="https://printflowstudio.com/team-shirts-chattanooga"
        schema={schema}
      />
      
      <div className="bg-dark text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Custom Team Shirts & Sports Apparel in Chattanooga</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            Outfit your athletes, coaches, and loudest supporters with premium printed sports apparel. Built for comfort, team unity, and victory.
          </p>
          <Link to="/request-quote?service=team-shirts" className="btn btn-primary btn-lg">
            Start Your Order
          </Link>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Gear Up Your Roster</h2>
            <p className="text-lg text-gray-700 mb-4">
              A united team looks the part. PrintFlow Studio delivers the high-quality <strong>custom team shirts Chattanooga</strong> leagues, schools, and recreational clubs trust to look professional on and off the field. From the first practice to the championship game, our <strong>custom team apparel Chattanooga</strong> services keep your players looking sharp.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              We specialize in printing vibrant, durable <strong>sports team shirts Chattanooga</strong> athletes love to wear. Whether you're ordering lightweight moisture-wicking practice tees or heavy-duty hoodies for chilly evening games, we've got your roster covered.
            </p>
            <Link to="/request-quote" className="btn btn-outline font-bold">Request a Quote</Link>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-accent">Apparel for Every Aspect of the Game</h3>
            <ul className="space-y-3">
              <li>✓ <strong>Team Shirts:</strong> Game-day warmups and casual travel shirts for players.</li>
              <li>✓ <strong>Coach Apparel:</strong> Professional <strong>coach shirts Chattanooga</strong> leaders wear with pride.</li>
              <li>✓ <strong>Practice Shirts:</strong> Breathable, comfortable tees built for the grind.</li>
              <li>✓ <strong>Tournament Apparel:</strong> Commemorative shirts for local Chattanooga sporting events.</li>
              <li>✓ <strong>Fan & Supporter Shirts:</strong> Merch for parents, boosters, and the student section.</li>
              <li>✓ <strong>Team Events:</strong> Custom gear for end-of-season banquets and fundraisers.</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-10 rounded-xl mb-16 border border-gray-200 text-center">
          <h2 className="text-3xl font-bold mb-6">Local Chattanooga Support</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              Skip the long shipping delays of online mega-printers. PrintFlow Studio provides fast turnaround times and local pickup right here in Chattanooga. Getting your <strong>team shirts Chattanooga TN</strong> bound has never been easier.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Also looking to outfit your school's non-athletic clubs or staff? Be sure to check out our <Link to="/school-shirts-chattanooga" className="text-accent font-bold hover:underline">Custom School Shirts</Link> page. Or, if you need to print your team logos yourself, try our <Link to="/dtf-transfers-chattanooga" className="text-accent font-bold hover:underline">Custom DTF Transfers</Link>!
            </p>
          </div>
        </div>

        <div className="text-center bg-dark text-white p-12 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Outfit Your Team?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact PrintFlow Studio today to request pricing for your sports team, coaches, and fans.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/request-quote?service=team-shirts" className="btn btn-primary btn-lg">
              Start Your Order
            </Link>
            <Link to="/custom-tshirts-chattanooga" className="btn btn-outline light btn-lg border-white text-white">
              View All T-Shirt Services
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
