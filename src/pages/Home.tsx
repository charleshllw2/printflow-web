import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ApparelHero from '../components/storefront/ApparelHero';
import FeaturedProducts from '../components/storefront/FeaturedProducts';
import CategoryGrid from '../components/storefront/CategoryGrid';
import CustomOrderSection from '../components/storefront/CustomOrderSection';
import StatementCTA from '../components/storefront/StatementCTA';
import { PORTFOLIO_ITEMS } from '../data/portfolioItems';
import '../styles/Home.css';

const portfolio = PORTFOLIO_ITEMS.filter(item => item.featuredOnHome).slice(0, 3);

const questions = [
    ['Can I order just one shirt?', 'Yes. PrintFlow Studio takes single-shirt orders and larger orders for businesses, churches, teams, and events.'],
    ['Can you print my logo or artwork?', 'Yes. Include your artwork, garment sizes, and preferred print placement with your quote request so we can review it.'],
    ['Can I pick up my order in Chattanooga?', 'Chattanooga-area pickup is available by arrangement. PrintFlow Studio also ships nationwide.'],
];

export default function Home() {
    return (
        <Layout>
            <SEO
                title="Custom T-Shirt Printing Chattanooga TN | DTF Transfers | PrintFlow Studio"
                description="Shop custom T-shirts, business apparel, church shirts and ready-to-press DTF transfers at PrintFlow Studio in Chattanooga, TN. No minimum orders. Nationwide shipping."
                canonicalUrl="https://www.printflowstudio.com/"
            />
            <div className="pf-homepage">
                <ApparelHero />
                <CategoryGrid />
                <FeaturedProducts />
                <CustomOrderSection />
                <section className="pf-section" aria-labelledby="home-work-heading">
                    <div className="pf-container">
                        <h2 className="pf-section-title" id="home-work-heading">Print Portfolio</h2>
                        <div className="pf-home-work">
                            {portfolio.map(item => (
                                <figure key={item.id}>
                                    <img src={item.image} alt={item.alt} width="640" height="480" loading="lazy" />
                                    <figcaption>{item.title}</figcaption>
                                </figure>
                            ))}
                        </div>
                        <Link className="pf-text-link" to="/our-work">View the portfolio →</Link>
                    </div>
                </section>
                <section className="pf-section pf-section--alt pf-section--bordered" aria-labelledby="home-benefits-heading">
                    <div className="pf-container">
                        <h2 className="pf-section-title" id="home-benefits-heading">Why Choose PrintFlow Studio?</h2>
                        <ul className="pf-copy pf-home-benefits">
                            <li>No minimum orders, from one shirt to a full team order</li>
                            <li>Full-color DTF printing for apparel and ready-to-press transfers</li>
                            <li>Artwork help, Chattanooga-area pickup by arrangement, and nationwide shipping</li>
                        </ul>
                        <Link className="pf-text-link" to="/blog/how-custom-shirt-orders-work">See how custom orders work →</Link>
                    </div>
                </section>
                <section className="pf-section" aria-labelledby="home-faq-heading">
                    <div className="pf-container">
                        <h2 className="pf-section-title" id="home-faq-heading">Frequently Asked Questions</h2>
                        <div className="pf-home-faq">
                            {questions.map(([question, answer]) => (
                                <details key={question}>
                                    <summary>{question}</summary>
                                    <p className="pf-copy">{answer}</p>
                                </details>
                            ))}
                        </div>
                        <Link className="pf-text-link" to="/faq">View all FAQs →</Link>
                    </div>
                </section>
                <StatementCTA />
            </div>
        </Layout>
    );
}
