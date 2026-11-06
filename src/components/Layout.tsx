import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const targetId = decodeURIComponent(hash.slice(1));
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                return;
            }
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return (
        <div className="layout">
            <a href="#main-content" className="pf-skip-link">
                Skip to main content
            </a>
            <Navbar key={pathname + hash} />
            <main id="main-content" className="main-content" tabIndex={-1}>
                {children}
            </main>
            <Footer />
        </div>
    );
}
