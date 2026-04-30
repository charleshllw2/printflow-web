import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import "../styles/Blog.css";

// Mock data for blog posts - this can be moved to a separate file later
export const BLOG_POSTS = [
    {
        id: "mommin-luxury-collection",
        title: "Mommin' Luxury Collection for Mother's Day",
        excerpt: "Celebrate Mother's Day with our exclusive Mommin' Luxury Collection. Featuring premium designs that say 'Mommin' But Make It Luxury' and 'Mom. The Original CEO'.",
        date: "April 30, 2026",
        image: "/mommin-luxury.png",
        author: "PrintFlow Studio"
    },
    {
        id: "dtf-vs-screen-printing",
        title: "DTF vs Screen Printing: Which is Right for Your Brand?",
        excerpt: "Choosing the right printing method can be tough. We break down the pros and cons of DTF transfers vs traditional screen printing.",
        date: "February 20, 2026",
        image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800",
        author: "Alex Rivera"
    },
    {
        id: "optimizing-files-for-dtf",
        title: "5 Tips to Optimize Your Designs for DTF Transfers",
        excerpt: "Getting the best results from DTF starts with your artwork. Learn how to prepare your files for maximum vibrancy and durability.",
        date: "February 15, 2026",
        image: "https://images.unsplash.com/photo-1572044162444-ad60f128bde3?auto=format&fit=crop&q=80&w=800",
        author: "Sarah Chen"
    },
    {
        id: "starting-apparel-business",
        title: "How to Start an Apparel Business with Minimal Investment",
        excerpt: "Want to launch your own clothing line? DTF transfers make it easier than ever to start small and scale fast.",
        date: "February 10, 2026",
        image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800",
        author: "Jordan Smith"
    }
];

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
