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

    return (
        <Layout>
            <SEO
                title="Custom T-Shirts & DTF Printing in Chattanooga | PrintFlow Studio"
                description="Custom shirts and DTF printing in Chattanooga for businesses, churches, teams and events. Order one or many, with local pickup available."
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
