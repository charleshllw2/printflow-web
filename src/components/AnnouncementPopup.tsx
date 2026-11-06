import { useState, useEffect } from 'react';
import '../styles/AnnouncementPopup.css';

export default function AnnouncementPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const dismissed = sessionStorage.getItem('announcementDismissed');
        if (!dismissed) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('announcementDismissed', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="announcement-popup">
            <button type="button" className="announcement-close" onClick={handleClose} aria-label="Close">
                &times;
            </button>
            <p><strong>No-minimum custom shirts &amp; DTF transfers</strong><br/>Chattanooga pickup by arrangement &bull; Nationwide shipping</p>
        </div>
    );
}
