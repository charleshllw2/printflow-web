#!/bin/bash
cd src/pages/Services

# Church Shirts
cat << 'INNER_EOF' > ChurchShirts.tsx
import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function ChurchShirts() {
  return (
    <Layout>
      <SEO 
        title="Custom Church Shirts & Ministry Apparel Chattanooga | PrintFlow Studio" 
        description="Premium custom shirts for Chattanooga churches, ministries, youth groups, and volunteer teams. Simple ordering process and flexible quantities."
        canonicalUrl="https://www.printflowstudio.com/church-shirts-chattanooga"
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">CHURCH & MINISTRY APPAREL</p>
            <h1>Custom Church Shirts for Every Ministry</h1>
            <p className="hero-support">From youth group retreats and volunteer teams to special events and congregation merch, we help Chattanooga churches create high-quality apparel without the stress.</p>
            <Link to="/request-quote" className="btn btn-primary mt-4">Start Church Order</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
INNER_EOF

# Event Shirts
cat << 'INNER_EOF' > EventShirts.tsx
import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function EventShirts() {
  return (
    <Layout>
      <SEO 
        title="Custom Event Shirts Chattanooga | PrintFlow Studio" 
        description="Make your next Chattanooga event memorable with custom printed shirts. Perfect for family reunions, charity runs, festivals, and celebrations."
        canonicalUrl="https://www.printflowstudio.com/event-shirts-chattanooga"
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">CUSTOM EVENT APPAREL</p>
            <h1>Shirts to Remember Your Event</h1>
            <p className="hero-support">Family reunions, charity 5Ks, corporate retreats, and community festivals. We supply premium custom shirts that make your Chattanooga event truly memorable.</p>
            <Link to="/request-quote" className="btn btn-primary mt-4">Quote Event Shirts</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
INNER_EOF

# Team Shirts
cat << 'INNER_EOF' > SportsTeamShirts.tsx
import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function SportsTeamShirts() {
  return (
    <Layout>
      <SEO 
        title="Custom Team Shirts & Spirit Wear Chattanooga | PrintFlow Studio" 
        description="Custom team shirts, club apparel, and spirit wear for Chattanooga schools and organizations. High-quality prints that last the whole season."
        canonicalUrl="https://www.printflowstudio.com/team-shirts-chattanooga"
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">TEAM & CLUB APPAREL</p>
            <h1>Matching Custom Team Shirts</h1>
            <p className="hero-support">Outfit your sports team, academic club, or organization with premium custom apparel that unifies your group and looks great all season long.</p>
            <Link to="/request-quote" className="btn btn-primary mt-4">Quote Team Shirts</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
INNER_EOF

# No Minimum Shirts
cat << 'INNER_EOF' > NoMinimumShirts.tsx
import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function NoMinimumShirts() {
  return (
    <Layout>
      <SEO 
        title="Small Quantity Custom Shirts Chattanooga | PrintFlow Studio" 
        description="Need just one special shirt? PrintFlow Studio offers premium custom T-shirt printing in Chattanooga with flexible options for small quantity orders."
        canonicalUrl="https://www.printflowstudio.com/custom-shirts-no-minimum-chattanooga"
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">SMALL QUANTITY PRINTING</p>
            <h1>You Don't Need to Order 100 Shirts</h1>
            <p className="hero-support">Sometimes you just need a few shirts for a weekend trip, a small crew, or a personalized gift. We offer flexible, small-quantity printing without sacrificing professional quality.</p>
            <Link to="/request-quote" className="btn btn-primary mt-4">Start Small Order</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
INNER_EOF

# Custom Apparel (General)
cat << 'INNER_EOF' > CustomApparel.tsx
import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function CustomApparel() {
  return (
    <Layout>
      <SEO 
        title="Custom Apparel & Merch Chattanooga | PrintFlow Studio" 
        description="Premium custom apparel printing in Chattanooga. We print hoodies, crewnecks, long sleeves, and more for businesses, brands, and organizations."
        canonicalUrl="https://www.printflowstudio.com/custom-apparel-chattanooga"
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">BEYOND T-SHIRTS</p>
            <h1>Premium Custom Apparel</h1>
            <p className="hero-support">We print more than just tees. Outfit your team or build your brand with custom printed hoodies, crewneck sweatshirts, long sleeves, and premium garments.</p>
            <Link to="/request-quote" className="btn btn-primary mt-4">Quote Custom Apparel</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
INNER_EOF
