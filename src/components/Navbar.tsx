import { useEffect, useMemo, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SHOP_PRODUCTS } from '../data/shopProducts';
import { products as DTF_PRODUCTS } from '../data/products';
import { BLOG_POSTS } from '../data/blogPosts';
import { BUSINESS_INFO } from '../data/businessSettings';
import '../styles/Navbar.css';

const PRIMARY_NAV_ITEMS = [
    { label: 'Shop', to: '/shop' },
    { label: 'DTF Transfers', to: '/dtf-transfers' },
    { label: 'Custom Orders', to: '/services' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/about#contact' },
] as const;

const MOBILE_SECONDARY_ITEMS = [
    { label: 'Our Work', to: '/our-work' },
    { label: 'Printing Guides', to: '/blog' },
    { label: 'Artwork Guidelines', to: '/file-guidelines' },
    { label: 'FAQ', to: '/faq' },
] as const;

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const mobileDialogRef = useRef<HTMLDialogElement>(null);
    const searchDialogRef = useRef<HTMLDialogElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const dialog = mobileDialogRef.current;
        if (!dialog) return;

        if (mobileOpen && !dialog.open) {
            dialog.showModal();
            document.body.style.overflow = 'hidden';
        } else if (!mobileOpen && dialog.open) {
            dialog.close();
            document.body.style.overflow = '';
        }

        return () => {
            if (!searchOpen) {
                document.body.style.overflow = '';
            }
        };
    }, [mobileOpen, searchOpen]);

    useEffect(() => {
        const dialog = searchDialogRef.current;
        if (!dialog) return;

        if (searchOpen && !dialog.open) {
            dialog.showModal();
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => {
                searchInputRef.current?.focus();
            });
        } else if (!searchOpen && dialog.open) {
            dialog.close();
            if (!mobileOpen) {
                document.body.style.overflow = '';
            }
        }
    }, [searchOpen, mobileOpen]);


    const normalizedQuery = query.trim().toLowerCase();

    const searchResults = useMemo(() => {
        if (!normalizedQuery) {
            return {
                apparel: SHOP_PRODUCTS.slice(0, 4),
                transfers: DTF_PRODUCTS.slice(0, 2),
                guides: BLOG_POSTS.slice(0, 2),
            };
        }

        const apparel = SHOP_PRODUCTS.filter((item) =>
            [item.name, item.category, item.description, item.garmentLabel]
                .join(' ')
                .toLowerCase()
                .includes(normalizedQuery)
        ).slice(0, 6);

        const transfers = DTF_PRODUCTS.filter((item) =>
            [item.title, item.category, item.description || '']
                .join(' ')
                .toLowerCase()
                .includes(normalizedQuery)
        ).slice(0, 4);

        const guides = BLOG_POSTS.filter((post) =>
            [post.title, post.category, post.excerpt]
                .join(' ')
                .toLowerCase()
                .includes(normalizedQuery)
        ).slice(0, 3);

        return { apparel, transfers, guides };
    }, [normalizedQuery]);

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmed = query.trim();
        setSearchOpen(false);
        if (trimmed) {
            navigate(`/shop?q=${encodeURIComponent(trimmed)}`);
        } else {
            navigate('/shop');
        }
    };

    const handleBackdropClick = (
        event: MouseEvent<HTMLDialogElement>,
        onClose: () => void
    ) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const isNavActive = (to: string) => {
        if (to === '/about#contact') {
            return location.pathname === '/about' && location.hash === '#contact';
        }
        if (to === '/about') {
            return location.pathname === '/about' && location.hash !== '#contact';
        }
        if (to === '/shop') {
            return location.pathname === '/shop' || location.pathname.startsWith('/shop/');
        }
        if (to === '/services') {
            return (
                location.pathname === '/services' ||
                location.pathname.endsWith('-chattanooga')
            );
        }
        return location.pathname === to;
    };

    const totalMatches =
        searchResults.apparel.length +
        searchResults.transfers.length +
        searchResults.guides.length;

    return (
        <>
            <div className="pf-announcement-bar" role="region" aria-label="Store announcement">
                <div className="pf-container pf-announcement-bar__inner">
                    <p className="pf-announcement-bar__text">
                        CUSTOM APPAREL <span aria-hidden="true">•</span> DTF TRANSFERS{' '}
                        <span aria-hidden="true">•</span> PRINTFLOW STUDIO
                    </p>
                </div>
            </div>

            <header className="pf-site-header">
                <div className="pf-container pf-site-header__inner">
                    <Link
                        to="/"
                        className="pf-brand-plate pf-site-header__brand"
                        aria-label="PrintFlow Studio home"
                    >
                        <img
                            src="/printflow-logo-original.png"
                            alt=""
                            width={895}
                            height={711}
                            className="pf-brand-plate__mark"
                        />

                    </Link>

                    <nav className="pf-desktop-nav" aria-label="Primary">
                        <ul className="pf-desktop-nav__list">
                            {PRIMARY_NAV_ITEMS.map((item) => {
                                const active = isNavActive(item.to);
                                return (
                                    <li key={item.to}>
                                        <Link
                                            to={item.to}
                                            className={`pf-desktop-nav__link ${active ? 'is-active' : ''}`}
                                            aria-current={active ? 'page' : undefined}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="pf-header-utilities">
                        <button
                            type="button"
                            className="pf-utility-btn"
                            onClick={() => setSearchOpen(true)}
                            aria-label="Search store and guides"
                            aria-haspopup="dialog"
                            aria-expanded={searchOpen}
                        >
                            <svg
                                width="17"
                                height="17"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="square"
                                aria-hidden="true"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path d="M20 20L16.2 16.2" />
                            </svg>
                            <span className="pf-utility-btn__label">Search</span>
                        </button>

                        <Link
                            to="/request-quote"
                            className="pf-button pf-button--primary pf-header-cta"
                        >
                            Custom Quote
                        </Link>

                        <button
                            type="button"
                            className="pf-mobile-trigger"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open navigation menu"
                            aria-haspopup="dialog"
                            aria-expanded={mobileOpen}
                        >
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="square"
                                aria-hidden="true"
                            >
                                <path d="M3 6h18M3 12h18M3 18h18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Search Modal Dialog */}
            <dialog
                ref={searchDialogRef}
                className="pf-search-dialog"
                aria-labelledby="pf-search-dialog-title"
                onClose={() => {
                    setSearchOpen(false);
                    if (!mobileOpen) {
                        document.body.style.overflow = '';
                    }
                }}
                onClick={(event) => handleBackdropClick(event, () => setSearchOpen(false))}
            >
                <div className="pf-search-dialog__panel">
                    <div className="pf-search-dialog__header">
                        <h2 id="pf-search-dialog-title" className="pf-search-dialog__title">
                            Search PrintFlow Studio
                        </h2>
                        <button
                            type="button"
                            className="pf-dialog-close"
                            onClick={() => setSearchOpen(false)}
                            aria-label="Close search"
                        >
                            Close ✕
                        </button>
                    </div>

                    <form className="pf-search-form" onSubmit={handleSearchSubmit}>
                        <label htmlFor="pf-site-search-input" className="visually-hidden">
                            Search apparel, DTF transfers, and guides
                        </label>
                        <input
                            ref={searchInputRef}
                            id="pf-site-search-input"
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search graphic tees, DTF transfers, or printing guides..."
                            className="pf-input pf-search-form__input"
                            autoComplete="off"
                        />
                        <button type="submit" className="pf-button pf-button--primary">
                            Search Shop
                        </button>
                    </form>

                    <div className="pf-search-results">
                        {normalizedQuery && totalMatches === 0 ? (
                            <div className="pf-search-empty">
                                <p>No catalog items matched &ldquo;{query.trim()}&rdquo;.</p>
                                <Link
                                    to="/request-quote"
                                    className="pf-text-link"
                                    onClick={() => setSearchOpen(false)}
                                >
                                    Request a custom print quote →
                                </Link>
                            </div>
                        ) : (
                            <>
                                {searchResults.apparel.length > 0 && (
                                    <div className="pf-search-group">
                                        <p className="pf-search-group__label">
                                            {normalizedQuery ? 'Printed Apparel' : 'Featured Apparel'}
                                        </p>
                                        <ul className="pf-search-list" role="list">
                                            {searchResults.apparel.map((product) => (
                                                <li key={product.id}>
                                                    <Link
                                                        to={`/shop/${product.slug}`}
                                                        className="pf-search-item"
                                                        onClick={() => setSearchOpen(false)}
                                                    >
                                                        <img
                                                            src={product.mockup}
                                                            alt={product.mockupAlt}
                                                            width={56}
                                                            height={70}
                                                            loading="lazy"
                                                            className="pf-search-item__thumb"
                                                        />
                                                        <span className="pf-search-item__body">
                                                            <span className="pf-search-item__name">
                                                                {product.name}
                                                            </span>
                                                            <span className="pf-search-item__meta">
                                                                {product.garmentLabel} • ${product.price.toFixed(2)}
                                                            </span>
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {searchResults.transfers.length > 0 && (
                                    <div className="pf-search-group">
                                        <p className="pf-search-group__label">Ready-to-Press DTF Transfers</p>
                                        <ul className="pf-search-list" role="list">
                                            {searchResults.transfers.map((transfer) => (
                                                <li key={transfer.id}>
                                                    <Link
                                                        to="/dtf-transfers"
                                                        className="pf-search-item"
                                                        onClick={() => setSearchOpen(false)}
                                                    >
                                                        <img
                                                            src={transfer.image}
                                                            alt={transfer.alt}
                                                            width={56}
                                                            height={56}
                                                            loading="lazy"
                                                            className="pf-search-item__thumb pf-search-item__thumb--contain"
                                                        />
                                                        <span className="pf-search-item__body">
                                                            <span className="pf-search-item__name">
                                                                {transfer.title}
                                                            </span>
                                                            <span className="pf-search-item__meta">
                                                                DTF Transfer • From ${transfer.sizes[0]?.price.toFixed(2)}
                                                            </span>
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {searchResults.guides.length > 0 && (
                                    <div className="pf-search-group">
                                        <p className="pf-search-group__label">Guides &amp; Resources</p>
                                        <ul className="pf-search-list" role="list">
                                            {searchResults.guides.map((guide) => (
                                                <li key={guide.id}>
                                                    <Link
                                                        to={`/blog/${guide.id}`}
                                                        className="pf-search-item pf-search-item--text"
                                                        onClick={() => setSearchOpen(false)}
                                                    >
                                                        <span className="pf-search-item__body">
                                                            <span className="pf-search-item__name">
                                                                {guide.title}
                                                            </span>
                                                            <span className="pf-search-item__meta">
                                                                {guide.category}
                                                            </span>
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </dialog>

            {/* Mobile Navigation Drawer Dialog */}
            <dialog
                ref={mobileDialogRef}
                className="pf-mobile-dialog"
                aria-label="Mobile navigation"
                onClose={() => {
                    setMobileOpen(false);
                    if (!searchOpen) {
                        document.body.style.overflow = '';
                    }
                }}
                onClick={(event) => handleBackdropClick(event, () => setMobileOpen(false))}
            >
                <div className="pf-mobile-drawer">
                    <div className="pf-mobile-drawer__top">
                        <Link
                            to="/"
                            className="pf-brand-plate pf-site-header__brand"
                            aria-label="PrintFlow Studio home"
                            onClick={() => setMobileOpen(false)}
                        >
                            <img
                                src="/printflow-logo-original.png"
                                alt=""
                                width={895}
                                height={711}
                                className="pf-brand-plate__mark"
                            />

                        </Link>

                        <button
                            type="button"
                            className="pf-dialog-close"
                            onClick={() => setMobileOpen(false)}
                            aria-label="Close navigation menu"
                        >
                            Close ✕
                        </button>
                    </div>

                    <nav className="pf-mobile-drawer__nav" aria-label="Mobile primary">
                        <ul className="pf-mobile-drawer__primary">
                            {PRIMARY_NAV_ITEMS.map((item) => {
                                const active = isNavActive(item.to);
                                return (
                                    <li key={item.to}>
                                        <Link
                                            to={item.to}
                                            className={`pf-mobile-drawer__link ${active ? 'is-active' : ''}`}
                                            aria-current={active ? 'page' : undefined}
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            <span>{item.label}</span>
                                            <span aria-hidden="true">→</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <ul className="pf-mobile-drawer__secondary">
                            {MOBILE_SECONDARY_ITEMS.map((item) => (
                                <li key={item.to}>
                                    <Link
                                        to={item.to}
                                        className="pf-mobile-drawer__sublink"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="pf-mobile-drawer__footer">
                        <Link
                            to="/request-quote"
                            className="pf-button pf-button--primary pf-mobile-drawer__cta"
                            onClick={() => setMobileOpen(false)}
                        >
                            Start a Custom Order
                        </Link>
                        <a href={BUSINESS_INFO.emailHref} className="pf-mobile-drawer__email">
                            {BUSINESS_INFO.email}
                        </a>
                    </div>
                </div>
            </dialog>
        </>
    );
}
