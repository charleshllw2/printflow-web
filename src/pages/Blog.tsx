import { useState } from "react";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import "../styles/Blog.css";
import { BLOG_POSTS, GUIDE_CATEGORIES, type GuideCategory } from "../data/blogPosts";

export default function Blog() {
    const [activeCategory, setActiveCategory] = useState<"All Guides" | GuideCategory>("All Guides");

    const visiblePosts =
        activeCategory === "All Guides"
            ? BLOG_POSTS
            : BLOG_POSTS.filter((post) => post.category === activeCategory);

    return (
        <Layout>
            <SEO
                title="Custom Apparel & DTF Printing Guides | PrintFlow Studio"
                description="Practical PrintFlow Studio guides on custom shirt ordering, artwork preparation, print sizing, garment care, and group orders for churches, reunions, teams, and events."
                canonicalUrl="https://www.printflowstudio.com/blog"
            />
            <div className="blog-page">
                <section className="blog-hero">
                    <div className="container">
                        <span className="text-accent">RESOURCES &amp; GUIDES</span>
                        <h1><span className="text-accent">PrintFlow</span> Printing &amp; Sizing Guides</h1>
                        <p className="subtitle" style={{ maxWidth: "740px", color: "var(--text-secondary)", marginTop: "12px", lineHeight: "1.65" }}>
                            Practical, step-by-step resources written for real apparel customers—covering how custom orders work, how to prepare DTF artwork, which print width to choose, how to wash printed garments, and how to organize group shirts without the headache.
                        </p>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="blog-filter-bar" role="group" aria-label="Filter guides by topic">
                            {GUIDE_CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    className={`blog-filter-btn ${activeCategory === cat ? "is-active" : ""}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="blog-grid">
                            {visiblePosts.map((post) => (
                                <article key={post.id} className="blog-card">
                                    <div className="blog-card-image">
                                        <Link to={`/blog/${post.id}`} tabIndex={-1}>
                                            <img
                                                src={post.image}
                                                alt={post.imageAlt}
                                                loading="lazy"
                                                className={post.image.includes("/printer/") ? "blog-img--contain" : undefined}
                                            />
                                        </Link>
                                    </div>
                                    <div className="blog-card-content">
                                        <div className="blog-card-meta-row">
                                            <span className="blog-card-cat">{post.category}</span>
                                            <span className="blog-card-date">{post.readTime}</span>
                                        </div>
                                        <h2>
                                            <Link to={`/blog/${post.id}`}>{post.title}</Link>
                                        </h2>
                                        <p>{post.excerpt}</p>
                                        <div className="blog-card-footer">
                                            <Link to={`/blog/${post.id}`} className="btn btn-secondary">
                                                Read Guide
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
