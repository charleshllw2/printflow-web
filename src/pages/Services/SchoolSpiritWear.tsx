import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function SchoolSpiritWear() {
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
        "name": "Custom School Shirts & Spirit Wear",
        "provider": {
          "@id": "https://printflowstudio.com"
        },
        "areaServed": {
          "@type": "City",
          "name": "Chattanooga"
        },
        "description": "Custom school shirts and spirit wear in Chattanooga, TN. We print class shirts, club apparel, and staff uniforms for local schools."
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
            "name": "Custom School Shirts Chattanooga"
          }
        ]
      }
    ]
  });

  return (
    <Layout>
      <SEO 
        title="Custom School Shirts Chattanooga TN | Spirit Wear & Apparel" 
        description="Looking for custom school shirts in Chattanooga? We print high-quality spirit wear, class shirts, club apparel, and teacher uniforms with fast local service."
        canonicalUrl="https://printflowstudio.com/school-shirts-chattanooga"
        schema={schema}
      />
      
      <div className="bg-dark text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Custom School Shirts & Apparel in Chattanooga, TN</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            Show your school pride with premium custom spirit wear. We provide reliable and vibrant custom apparel for Chattanooga schools, clubs, teachers, and student organizations.
          </p>
          <Link to="/request-quote?service=school-shirts" className="btn btn-primary btn-lg">
            Start Your Order
          </Link>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Show Your School Spirit</h2>
            <p className="text-lg text-gray-700 mb-4">
              From the classroom to the pep rally, apparel brings students and staff together. PrintFlow Studio is the trusted local source for <strong>custom school shirts Chattanooga</strong> educators and parents rely on. We specialize in high-quality <strong>custom school apparel</strong> that stands up to the school year while keeping everyone comfortable.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Whether you need to outfit a growing student organization with fresh <strong>club shirts Chattanooga</strong> style, or organize a massive bulk order of <strong>class shirts Chattanooga</strong> seniors will cherish forever, we have the capacity and the quality to deliver on time.
            </p>
            <Link to="/request-quote" className="btn btn-outline font-bold">Request a Quote</Link>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-accent">School Apparel Solutions</h3>
            <ul className="space-y-3">
              <li>✓ <strong>Spirit Wear:</strong> T-shirts and hoodies for parents, students, and alumni.</li>
              <li>✓ <strong>Class Shirts:</strong> Unforgettable senior class and graduation apparel.</li>
              <li>✓ <strong>School Clubs:</strong> Band, choir, debate team, and extracurricular shirts.</li>
              <li>✓ <strong>Teachers & Staff:</strong> Professional, branded polos and comfortable Friday tees.</li>
              <li>✓ <strong>Field Trips:</strong> Brightly colored, matching shirts for easy student identification.</li>
              <li>✓ <strong>Fundraisers & Events:</strong> Highly profitable custom apparel to support your school's goals.</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 p-10 rounded-xl mb-16 border border-gray-200 text-center">
          <h2 className="text-3xl font-bold mb-6">Partnering with Local Chattanooga Schools</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              We know that coordinating <strong>school event shirts</strong> and spirit wear campaigns can be stressful for PTAs, boosters, and faculty. That's why we make the process entirely seamless.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Skip the expensive shipping fees and logistical headaches by picking up your bulk orders directly here in Chattanooga. Need athletic gear? We also handle <Link to="/team-shirts-chattanooga" className="text-accent font-bold hover:underline">Custom Team Shirts</Link> for school sports programs!
            </p>
            <Link to="/custom-tshirts-chattanooga" className="btn btn-outline mt-2">View All T-Shirt Services</Link>
          </div>
        </div>

        <div className="text-center bg-dark text-white p-12 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Outfit Your School?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact PrintFlow Studio today to request a quote for your next class, club, or spirit wear project.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/request-quote?service=school-shirts" className="btn btn-primary btn-lg">
              Start Your Order
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
