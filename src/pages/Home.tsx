import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import Showcase from "../components/Showcase";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import LocalServiceArea from "../components/LocalServiceArea";

export default function Home() {
    const homeSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "name": "PrintFlow Studio",
                "url": "https://www.printflowstudio.com",
                "logo": "https://www.printflowstudio.com/PrintFlowLogo.png"
            },
            {
                "@type": "LocalBusiness",
                "name": "PrintFlow Studio",
                "description": "Custom T-shirt printing and DTF transfers in Chattanooga.",
                "url": "https://www.printflowstudio.com",
                "telephone": "423-681-2218",
                "email": "hello@printflowstudio.com",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Chattanooga",
                    "addressRegion": "TN",
                    "addressCountry": "US"
                },
                "areaServed": {
                    "@type": "GeoCircle",
                    "geoMidpoint": {
                        "@type": "GeoCoordinates",
                        "latitude": 35.0456,
                        "longitude": -85.3097
                    },
                    "geoRadius": "50000"
                }
            }
        ]
    });

    return (
        <Layout>
            <SEO 
                title="Custom T-Shirt Printing & DTF Transfers | PrintFlow Studio Chattanooga" 
                description="PrintFlow Studio provides custom T-shirt printing, DTF transfers, business apparel, church shirts, school apparel, local Chattanooga pickup, and nationwide shipping."
                schema={homeSchema}
            />
            <Hero />
            <HowItWorks />
            <LocalServiceArea />
            <WhyChooseUs />
            <Showcase />
            <Testimonials />
            <ContactForm />
        </Layout>
    );
}
