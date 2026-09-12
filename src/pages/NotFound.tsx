import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function NotFound() {
    return (
        <Layout>
            <SEO title="Page Not Found | PrintFlow Studio" description="The page you are looking for could not be found." />
            <div className="container section text-center" style={{ paddingTop: '150px', paddingBottom: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '6rem', fontWeight: '800', lineHeight: 1, marginBottom: '20px', color: 'var(--accent-color)' }}>404</div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Page Not Found</h1>
                <p style={{ marginTop: '10px', marginBottom: '40px', color: 'var(--text-secondary)', maxWidth: '500px', fontSize: '1.2rem', lineHeight: 1.6 }}>
                    Oops! The page you're looking for seems to have gone missing. It might have been moved or doesn't exist anymore.
                </p>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link to="/" className="btn btn-outline">
                        Return Home
                    </Link>
                    <Link to="/request-quote" className="btn btn-primary" style={{ backgroundColor: 'var(--accent-color)', color: '#fff', border: 'none' }}>
                        Request a Quote
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
