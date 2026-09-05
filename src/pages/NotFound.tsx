import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function NotFound() {
    return (
        <Layout>
            <SEO title="Page Not Found | PrintFlow Studio" description="The page you are looking for could not be found." />
            <div className="container section text-center" style={{ paddingTop: '150px', paddingBottom: '150px' }}>
                <h1 style={{ fontSize: '4rem', marginBottom: '20px', color: 'var(--primary-color)' }}>404</h1>
                <h2>Page Not Found</h2>
                <p style={{ marginTop: '20px', marginBottom: '40px', color: 'var(--text-secondary)' }}>
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="btn btn-primary">
                    Return to Homepage
                </Link>
            </div>
        </Layout>
    );
}
