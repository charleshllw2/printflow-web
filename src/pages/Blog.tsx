import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import "../styles/Blog.css";
import { BLOG_POSTS } from "../data/blogPosts";

export default function Blog() {
    return (
        <Layout>
            <div className="blog-page">
                <section className="blog-hero">
                    <div className="container">
                        <span className="text-accent">INSIGHTS & GUIDES</span>
                        <h1>The <span className="text-accent">PrintFlow</span> Blog</h1>
                        <p className="subtitle">Expert tips on DTF printing, branding, and growing your apparel business.</p>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="blog-grid">
                            {BLOG_POSTS.map((post) => (
                                <article key={post.id} className="blog-card">
                                    <div className="blog-card-image">
                                        <img src={post.image} alt={post.title} loading="lazy" />
                                    </div>
                                    <div className="blog-card-content">
                                        <span className="blog-card-date">{post.date}</span>
                                        <h3>{post.title}</h3>
                                        <p>{post.excerpt}</p>
                                        <div className="blog-card-footer">
                                            <Link to={`/blog/${post.id}`} className="btn btn-secondary">
                                                Read More
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
