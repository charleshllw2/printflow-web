import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import FileGuidelines from "./pages/FileGuidelines";
const Admin = lazy(() => import("./pages/Admin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// New SEO Services Pages
import CustomTShirts from "./pages/Services/CustomTShirts";
import DTFTransfers from "./pages/Services/DTFTransfers";
import BusinessApparel from "./pages/Services/BusinessApparel";
import ChurchShirts from "./pages/Services/ChurchShirts";
import SportsTeamShirts from "./pages/Services/SportsTeamShirts";
import EventShirts from "./pages/Services/EventShirts";
import NoMinimumShirts from "./pages/Services/NoMinimumShirts";
import CustomApparel from "./pages/Services/CustomApparel";

import Services from "./pages/Services";
const Shop = lazy(() => import("./pages/Shop"));
import ShopCatalog from "./pages/ShopPage";
import ShopProductPage from "./pages/ShopProductPage";
import Quote from "./pages/Quote";
import FAQ from "./pages/FAQ";
import OurWork from "./pages/OurWork";

// Policies
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import ShippingPickup from "./pages/ShippingPickup";
import Returns from "./pages/Returns";
import ArtworkPolicy from "./pages/ArtworkPolicy";

// 404
import NotFound from "./pages/NotFound";

import "./styles/App.css";

export function AppRoutes() {
  const { pathname } = useLocation();
  return (
    <>
      {["/admin", "/login"].includes(pathname) && <Helmet><meta name="robots" content="noindex,nofollow" /></Helmet>}
      <Suspense fallback={<div role="status" style={{ padding: "120px 24px" }}>Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/file-guidelines" element={<FileGuidelines />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          
          {/* Legacy Redirects */}
          <Route path="/business-apparel-chattanooga" element={<Navigate to="/business-shirts-chattanooga" replace />} />
          <Route path="/custom-tshirts-chattanooga" element={<Navigate to="/custom-t-shirts-chattanooga" replace />} />
          
          {/* Service Pages */}
          <Route path="/services" element={<Services />} />
          <Route path="/custom-t-shirts-chattanooga" element={<CustomTShirts />} />
          <Route path="/business-shirts-chattanooga" element={<BusinessApparel />} />
          <Route path="/dtf-transfers-chattanooga" element={<DTFTransfers />} />
          <Route path="/church-shirts-chattanooga" element={<ChurchShirts />} />
          <Route path="/team-shirts-chattanooga" element={<SportsTeamShirts />} />
          <Route path="/event-shirts-chattanooga" element={<EventShirts />} />
          <Route path="/custom-shirts-no-minimum-chattanooga" element={<NoMinimumShirts />} />
          <Route path="/custom-apparel-chattanooga" element={<CustomApparel />} />
          
          {/* Core Pages */}
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/request-quote" element={<Quote />} />

          {/* Policy Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/shipping-pickup" element={<ShippingPickup />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/artwork-policy" element={<ArtworkPolicy />} />

          {/* Shop Routes */}
          <Route path="/shop" element={<ShopCatalog />} />
          <Route path="/shop/:slug" element={<ShopProductPage />} />
          <Route path="/dtf-transfers" element={<Shop />} />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}
