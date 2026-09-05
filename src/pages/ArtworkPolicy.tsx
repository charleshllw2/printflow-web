import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function ArtworkPolicy() {
    return (
        <Layout>
            <SEO title="Artwork & Copyright Policy | PrintFlow Studio" description="PrintFlow Studio's artwork submission and copyright guidelines." />
            <div className="container section" style={{ paddingTop: '100px', maxWidth: '800px', margin: '0 auto' }}>
                <h1>Artwork & Copyright Policy</h1>
                <div style={{ marginTop: '30px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    <p>[OWNER TO INSERT ANY ADDITIONAL ARTWORK GUIDELINES HERE]</p>
                    <h3 style={{ marginTop: '20px' }}>Copyright & Permissions</h3>
                    <p>By submitting artwork to PrintFlow Studio, you confirm that you own the rights to the artwork or have explicit permission from the copyright owner to use it for custom printing.</p>
                    <p>We cannot reproduce copyrighted material (including professional sports teams, major brands, Disney characters, etc.) without written authorization from the copyright holder.</p>
                    <p><em>Note: This information is provided as a guideline and does not constitute legal advice.</em></p>
                </div>
            </div>
        </Layout>
    );
}
