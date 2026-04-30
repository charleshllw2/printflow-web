import Layout from "../components/Layout";
import { useParams, Link } from "react-router-dom";
import { BLOG_POSTS } from "./Blog";
import "../styles/Blog.css";

export default function BlogPost() {
    const { id } = useParams();
    const post = BLOG_POSTS.find((p) => p.id === id);

    if (!post) {
        return (
            <Layout>
                <div className="section text-center not-found-section">
                    <div className="container">
                        <h1>Post Not Found</h1>
                        <p>Sorry, the blog post you are looking for doesn't exist.</p>
                        <Link to="/blog" className="btn btn-primary btn-mt-20">
                            Back to Blog
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="blog-page">
                <header className="post-header">
                    <div className="container">
                        <div className="post-meta">
                            {post.date} • By {post.author}
                        </div>
                        <h1 className="post-title">{post.title}</h1>
                        <Link to="/blog" className="btn btn-secondary">
                            ← Back to Blog
                        </Link>
                    </div>
                </header>

                <article className="post-content">
                    <div className="container">
                        <img src={post.image} alt={post.title} />

                        {post.id === "mommin-luxury-collection" ? (
                            <>
                                <h2>Celebrate in Style</h2>
                                <p>
                                    This Mother's Day, show your appreciation with our exclusive Mommin' Luxury Collection. We believe that being a mom isn't basic—it's boss level. That's why we've designed premium apparel that blends comfort with high-end aesthetics.
                                </p>
                                <h3>The Original CEO</h3>
                                <p>
                                    Whether you're multi-tasking, strategizing, or just running on love and coffee, our "Mom. The Original CEO" t-shirt is the perfect fit. Made with premium quality materials, it's designed to empower and inspire.
                                </p>
                                <h3>Mommin' But Make It Luxury</h3>
                                <p>
                                    Grace in the chaos, class in everything. Shop the limited edition collection now and wear it, own it, live it.
                                </p>
                            </>
                        ) : (
                            <>
                                <h2>Why choosing the right method matters</h2>
                                <p>
                                    In the rapidly evolving world of custom apparel, two heavyweights often go head-to-head: Direct-to-Film (DTF) transfers and traditional Screen Printing. While screen printing has been the industry standard for decades, DTF is quickly becoming the go-to for many small to mid-sized brands.
                                </p>

                                <p>
                                    {post.excerpt} That's why we've put together this comprehensive guide to help you decide which path to take for your next project.
                                </p>

                                <h3>Complexity and Detail</h3>
                                <p>
                                    One of the biggest advantages of DTF is its ability to handle extremely high levels of detail. Since it's a digital process, it can reproduce photographic images, gradients, and intricate line work that would be nearly impossible (or extremely expensive) with screen printing.
                                </p>

                                <h3>Color Accuracy</h3>
                                <p>
                                    With DTF, what you see on your screen is very close to what you get on the fabric. You aren't limited by the number of screens, meaning you can have 100 colors in a design without any extra cost.
                                </p>

                                <h2>The Verdict</h2>
                                <p>
                                    If you're doing high-volume (500+ pieces) simple designs, screen printing is still hard to beat on price. However, for most modern brands looking for quality, flexibility, and vibrant colors across any quantity, DTF is the clear winner.
                                </p>
                            </>
                        )}

                        <div className="cta-box">
                            <h3>Ready to get started?</h3>
                            <p>Check out our file guidelines to ensure your designs are perfect for DTF.</p>
                            <Link to="/file-guidelines" className="btn btn-primary">
                                View File Guidelines
                            </Link>
                        </div>
                    </div>
                </article>
            </div>
        </Layout>
    );
}
