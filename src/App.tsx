import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FileGuidelines from "./pages/FileGuidelines";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CustomTShirts from "./pages/Services/CustomTShirts";
import DTFTransfers from "./pages/Services/DTFTransfers";
import BusinessApparel from "./pages/Services/BusinessApparel";
import ChurchShirts from "./pages/Services/ChurchShirts";
import SchoolSpiritWear from "./pages/Services/SchoolSpiritWear";
import SportsTeamShirts from "./pages/Services/SportsTeamShirts";
import FamilyReunionShirts from "./pages/Services/FamilyReunionShirts";
import EventShirts from "./pages/Services/EventShirts";
import PromotionalProducts from "./pages/Services/PromotionalProducts";
import DesignServices from "./pages/Services/DesignServices";
import DIYPrintSheets from "./pages/Services/DIYPrintSheets";
import Services from "./pages/Services";
import Quote from "./pages/Quote";
import About from "./pages/About";
import FAQ from "./pages/FAQ";

// Policies
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import ShippingPickup from "./pages/ShippingPickup";
import Returns from "./pages/Returns";
import ArtworkPolicy from "./pages/ArtworkPolicy";

// 404
import NotFound from "./pages/NotFound";

import "./styles/App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/file-guidelines" element={<FileGuidelines />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
        
        {/* Service Pages */}
        <Route path="/services" element={<Services />} />
        <Route path="/custom-t-shirts-chattanooga" element={<CustomTShirts />} />
        <Route path="/dtf-transfers-chattanooga" element={<DTFTransfers />} />
        <Route path="/business-apparel-chattanooga" element={<BusinessApparel />} />
        <Route path="/church-shirts-chattanooga" element={<ChurchShirts />} />
        <Route path="/school-spirit-wear-chattanooga" element={<SchoolSpiritWear />} />
        <Route path="/sports-team-shirts-chattanooga" element={<SportsTeamShirts />} />
        <Route path="/family-reunion-shirts" element={<FamilyReunionShirts />} />
        <Route path="/event-shirts-chattanooga" element={<EventShirts />} />
        <Route path="/promotional-products-chattanooga" element={<PromotionalProducts />} />
        <Route path="/apparel-design-services" element={<DesignServices />} />
        <Route path="/diy-dtf-print-sheets" element={<DIYPrintSheets />} />
        
        {/* Core Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/request-quote" element={<Quote />} />

        {/* Policy Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/shipping-pickup" element={<ShippingPickup />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/artwork-policy" element={<ArtworkPolicy />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
