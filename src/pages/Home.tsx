import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import ServicesGrid from "../components/ServicesGrid";
import WhyChooseUs from "../components/WhyChooseUs";
import Showcase from "../components/Showcase";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import LocalServiceArea from "../components/LocalServiceArea";

export default function Home() {
    return (
        <Layout>
            <SEO 
                title="Custom T-Shirts & DTF Printing in Chattanooga | PrintFlow Studio" 
                description="Order custom T-shirts, DTF transfers and branded apparel from PrintFlow Studio in Chattanooga, TN. Quality printing, professional design help and friendly service."
            />
            <Hero />
            <ServicesGrid />
            <HowItWorks />
            <LocalServiceArea />
            <WhyChooseUs />
            <Showcase />
            <Testimonials />
            <ContactForm />
        </Layout>
    );
}
