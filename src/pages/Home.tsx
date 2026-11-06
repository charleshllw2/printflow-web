import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ApparelHero from '../components/storefront/ApparelHero';
import BrandTicker from '../components/storefront/BrandTicker';
import FeaturedProducts from '../components/storefront/FeaturedProducts';
import EditorialSplit from '../components/storefront/EditorialSplit';
import CategoryGrid from '../components/storefront/CategoryGrid';
import CustomOrderSection from '../components/storefront/CustomOrderSection';
import TransferFeature from '../components/storefront/TransferFeature';
import StatementCTA from '../components/storefront/StatementCTA';
import '../styles/Home.css';

export default function Home() {
    return (
        <Layout>
            <SEO
                title="Custom T-Shirts & DTF Printing in Chattanooga | PrintFlow Studio"
                description="Shop graphic apparel, ready-to-press DTF transfers, and custom printed tees and hoodies from PrintFlow Studio in Chattanooga, Tennessee."
                canonicalUrl="https://www.printflowstudio.com/"
            />
            <div className="pf-homepage">
                <ApparelHero />
                <BrandTicker />
                <FeaturedProducts />
                <EditorialSplit />
                <CategoryGrid />
                <CustomOrderSection />
                <TransferFeature />
                <StatementCTA />
            </div>
        </Layout>
    );
}
