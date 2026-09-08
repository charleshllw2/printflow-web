import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import '../styles/Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const assembledRef = useRef<HTMLImageElement>(null);
    const explodedRef = useRef<HTMLImageElement>(null);
    const textRef1 = useRef<HTMLDivElement>(null);
    const textRef2 = useRef<HTMLDivElement>(null);
    const textRef3 = useRef<HTMLDivElement>(null);
    const finalLogoRef = useRef<HTMLDivElement>(null);
    
    // Check if user prefers reduced motion
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        
        const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', listener);
        return () => mediaQuery.removeEventListener('change', listener);
    }, []);

    useGSAP(() => {
        if (prefersReducedMotion) return; // Skip animation if requested
        
        if (!containerRef.current || !assembledRef.current || !explodedRef.current) return;

        // Create a master timeline linked to scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=3000", // Tall scroll area for pacing
                scrub: 0.5,     // Smooth scrubbing
                pin: true,      // Pin the section while scrolling
                anticipatePin: 1
            }
        });

        // The animation sequence
        
        // 1. Initial state - assembled is visible, exploded is hidden
        gsap.set(explodedRef.current, { opacity: 0, scale: 1 });
        gsap.set(assembledRef.current, { opacity: 1, scale: 1 });
        gsap.set([textRef1.current, textRef2.current, textRef3.current, finalLogoRef.current], { 
            opacity: 0, 
            y: 30 
        });

        // 2. Camera push in / anticipation (0-15%)
        tl.to(assembledRef.current, {
            scale: 1.05,
            duration: 1.5,
            ease: "power1.inOut"
        }, 0);

        // 3. The "Explosion" transition
        // In a true layered approach, we'd animate individual pieces.
        // As a fallback with just 2 images, we'll do a stylized crossfade + scale 
        // to simulate the outward expansion of parts while we wait for actual layered assets.
        tl.to(assembledRef.current, {
            opacity: 0,
            scale: 1.15,
            duration: 2,
            ease: "power2.in"
        }, 1.5)
        .to(explodedRef.current, {
            opacity: 1,
            scale: 1.05, // Starts slightly zoomed out from the assembled state
            duration: 2,
            ease: "power2.out"
        }, 1.5);

        // 4. Continue pushing into the exploded view (3.5 - 6)
        tl.to(explodedRef.current, {
            scale: 1.15,
            duration: 2.5,
            ease: "none"
        }, 3.5);

        // 5. Sequence the text reveals during the explosion
        tl.to(textRef1.current, {
            opacity: 1,
            y: 0,
            duration: 0.8
        }, 2.0)
        .to(textRef1.current, {
            opacity: 0,
            y: -20,
            duration: 0.8
        }, 3.5);

        tl.to(textRef2.current, {
            opacity: 1,
            y: 0,
            duration: 0.8
        }, 4.0)
        .to(textRef2.current, {
            opacity: 0,
            y: -20,
            duration: 0.8
        }, 5.5);

        // 6. Final reveal message (6 - 8)
        tl.to(textRef3.current, {
            opacity: 1,
            y: 0,
            duration: 1
        }, 6.0)
        .to(finalLogoRef.current, {
            opacity: 1,
            y: 0,
            duration: 1
        }, 6.5);
        
        // Add some padding at the end so it doesn't immediately unpin
        tl.to({}, { duration: 1.5 });

    }, { scope: containerRef, dependencies: [prefersReducedMotion] });

    if (prefersReducedMotion) {
        // Fallback for reduced motion
        return (
            <section className="hero section fallback-hero">
                <div className="hero-background-static"></div>
                <div className="container hero-container">
                    <div className="hero-content">
                        <div className="hero-actions" style={{ paddingTop: '20vh' }}>
                            <Link to="/request-quote" className="btn btn-primary">
                                Request a Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="hero-cinematic" ref={containerRef}>
            <div className="hero-cinematic-inner">
                {/* Background Environment */}
                <div className="studio-environment"></div>

                {/* Main Hero Content (fades out as scroll starts) */}
                <div className="cinematic-content initial-content">
                    <div className="container">
                        <div className="cinematic-actions" style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)' }}>
                            <Link to="/request-quote" className="btn btn-primary">
                                Request a Quote
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Printer Assets Container */}
                <div className="printer-stage">
                    {/* Placeholder structure for future layered assets */}
                    <div className="printer-layers">
                        <img 
                            ref={assembledRef} 
                            src="/printer/assembled.png" 
                            alt="Fully assembled PrintFlow Studio DTF printer" 
                            className="printer-asset printer-assembled"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                        <img 
                            ref={explodedRef} 
                            src="/printer/exploded.png" 
                            alt="Exploded view of PrintFlow Studio DTF printer internal components" 
                            className="printer-asset printer-exploded"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', opacity: 0 }}
                        />
                    </div>
                </div>

                {/* Scroll-triggered Text Elements */}
                <div className="scroll-text-container">
                    <div ref={textRef1} className="scroll-text text-layer-1">
                        <h2>BUILT FOR THE DETAILS.</h2>
                    </div>
                    <div ref={textRef2} className="scroll-text text-layer-2">
                        <h2>COLOR WITHOUT COMPROMISE.</h2>
                    </div>
                    <div className="scroll-text text-final-layer">
                        <h2 ref={textRef3}>THERE'S MORE BEHIND EVERY PRINT.</h2>
                        <div ref={finalLogoRef} className="final-logo">
                            PRINTFLOW<span className="text-accent">STUDIO</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
