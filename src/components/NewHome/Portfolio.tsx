import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  PRODUCTION_VIDEOS,
  type PortfolioCategory,
} from "../../data/portfolioItems";

interface PortfolioProps {
  headingLevel?: 1 | 2;
  showAll?: boolean;
}

export default function Portfolio({ headingLevel = 2, showAll = false }: PortfolioProps) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("All Work");

  const itemsToDisplay = showAll
    ? activeCategory === "All Work"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory)
    : PORTFOLIO_ITEMS.filter((item) => item.featuredOnHome);

  return (
    <section id="portfolio" className="premium-portfolio section">
      <div className="container">
        <Heading className="portfolio-heading">
          REAL SHIRTS.
          <br />
          REAL PRINT DETAIL.
          <br />
          PRINTED BY PRINTFLOW.
        </Heading>

        {showAll ? (
          <p className="portfolio-lead">
            Explore finished short-sleeve tees, long-sleeves, heavyweight hoodies, close-up Direct-to-Film artwork details, and our Chattanooga DTF printing setup. Client-identifying custom work is kept private unless permission is granted.
          </p>
        ) : (
          <p className="portfolio-lead">
            A look at finished garments, fine-line full-color DTF graphics, and in-house transfer printing equipment from PrintFlow Studio in Chattanooga.
          </p>
        )}

        {showAll && (
          <div className="portfolio-filter-bar" role="group" aria-label="Filter portfolio items by category">
            {PORTFOLIO_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={`portfolio-filter-btn ${activeCategory === category ? "is-active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="portfolio-editorial-grid">
          {itemsToDisplay.map((item) => {
            const isEquipment = item.category === "Studio & Production";
            return (
              <figure className="portfolio-item" key={item.id}>
                <img
                  className={`portfolio-image ${isEquipment ? "portfolio-image--contain" : ""}`}
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  width="600"
                  height="750"
                />
                <figcaption className="portfolio-meta">
                  <span className="portfolio-badge">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p className="portfolio-format">{item.garmentOrFormat}</p>
                  <p className="portfolio-caption">{item.caption}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {showAll && PRODUCTION_VIDEOS.length > 0 && (
          <div className="portfolio-videos-block">
            <h2 className="portfolio-subheading">In-House Production Clips</h2>
            <div className="portfolio-editorial-grid">
              {PRODUCTION_VIDEOS.map((clip) => (
                <figure className="portfolio-item" key={clip.id}>
                  <video
                    className="portfolio-video"
                    controls
                    preload="metadata"
                    poster={clip.poster}
                  >
                    <source src={clip.videoSrc} />
                  </video>
                  <figcaption className="portfolio-meta">
                    <span className="portfolio-badge">Studio &amp; Production</span>
                    <h3>{clip.title}</h3>
                    <p className="portfolio-caption">{clip.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {!showAll && (
          <div className="portfolio-footer-cta">
            <Link to="/our-work" className="btn-secondary-outline">
              Explore Full Portfolio &amp; Print Close-Ups →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
