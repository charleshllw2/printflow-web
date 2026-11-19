import { Link } from 'react-router-dom';
const categories = [
    ['Custom Apparel', '/custom-apparel-chattanooga', '/showcase-4.jpg', 'Printed long-sleeve apparel'],
    ['DTF Transfers', '/dtf-transfers', '/shop/chattanooga-bridge.jpg', 'Chattanooga River City Energy DTF transfer artwork'],
    ['Shop Original Designs', '/shop', '/showcase-1.jpg', 'Printed Chattanooga graphic tee'],
];
export default function CategoryGrid(){return <section className="pf-section" aria-labelledby="category-heading"><div className="pf-container"><div className="pf-section-header"><div><h2 className="pf-section-title" id="category-heading">Shop PrintFlow Studio</h2></div></div><div className="pf-category-grid">{categories.map(([name,to,src,alt])=><Link to={to} className="pf-category-tile" key={name}><div className="pf-category-tile__media"><img src={src} alt={alt} width="800" height="1000" loading="lazy" className="pf-category-tile__img"/><div className="pf-category-tile__scrim"/></div><div className="pf-category-tile__overlay"><div className="pf-category-tile__row"><h3 className="pf-category-tile__title">{name}</h3><span className="pf-category-tile__arrow" aria-hidden="true">↗</span></div></div></Link>)}</div></div></section>}
