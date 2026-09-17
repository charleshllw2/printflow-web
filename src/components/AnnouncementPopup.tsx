import { useState, useEffect } from 'react';
import '../styles/AnnouncementPopup.css';

export default function AnnouncementPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user already dismissed it in this session
        const dismissed = sessionStorage.getItem('announcementDismissed');
        if (!dismissed) {
            // Show popup slightly after page load
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
            <button className="announcement-close" onClick={handleClose} aria-label="Close">
                &times;
            </button>
            <p><strong>Fast turnaround available</strong><br/>Local Chattanooga pickup &bull; Nationwide shipping</p>
        </div>
    );
}
