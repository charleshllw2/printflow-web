import '../styles/ProductionProcess.css';

export default function ProductionProcess() {
    return (
        <section className="production-section section">
            <div className="container">
                <div className="production-image-wrapper">
                    <img 
                        src="/production-process.jpg" 
                        alt="High quality custom apparel printing process" 
                        className="production-image"
                    />
                </div>
            </div>
        </section>
    );
}
