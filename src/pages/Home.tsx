import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Hero from "../components/NewHome/Hero";
import SocialProof from "../components/NewHome/SocialProof";
import Portfolio from "../components/NewHome/Portfolio";
import HowItWorks from "../components/NewHome/HowItWorks";
import ShopByNeed from "../components/NewHome/ShopByNeed";
import SingleShirt from "../components/NewHome/SingleShirt";
import BusinessApparel from "../components/NewHome/BusinessApparel";
import OwnerStory from "../components/NewHome/OwnerStory";
// import BehindTheScenes from "../components/NewHome/BehindTheScenes";
import "../styles/NewHome.css";

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
                "email": "hello@printflowstudio.com"
            }
        ]
    });

    return (
        <Layout>
            <SEO 
                title="Custom T-Shirt Printing | PrintFlow Studio Chattanooga" 
                description="Custom shirts and apparel made easy in Chattanooga. From one special shirt to apparel for your entire business, church, team or event."
                schema={homeSchema}
                canonicalUrl="https://www.printflowstudio.com/"
            />
            <main className="premium-homepage">
                <Hero />
                <SocialProof />
                <Portfolio />
                <SingleShirt />
                <HowItWorks />
                <ShopByNeed />
                <BusinessApparel />
                <OwnerStory />
                {/* <BehindTheScenes /> - Hidden until real production videos/photos are ready */}
            </main>
        </Layout>
    );
}
