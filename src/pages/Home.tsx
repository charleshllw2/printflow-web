import Layout from "../components/Layout";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import ServicesGrid from "../components/ServicesGrid";
import OrderPortal from "../components/OrderPortal";
import WhyChooseUs from "../components/WhyChooseUs";
import Showcase from "../components/Showcase";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";

export default function Home() {
    return (
        <Layout>
            <Hero />
            <HowItWorks />
            <ServicesGrid />
            <OrderPortal />
            <WhyChooseUs />
            <Showcase />
            <Testimonials />
            <CTA />
        </Layout>
    );
}
