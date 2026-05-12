import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Image, Users, Sparkles, Settings } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/studio", icon: LayoutDashboard },
    { name: "Mockup Studio", path: "/studio/mockups", icon: Image },
    { name: "Influencer Lab", path: "/studio/influencers", icon: Users },
    { name: "Content Engine", path: "/studio/content", icon: Sparkles },
    { name: "Brand Kit", path: "/studio/brand-kit", icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Sparkles className="text-accent" />
        <span>PrintFlow AI</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              <item.icon />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="credits-badge">
          <span>Available Credits</span>
          <span className="credits-count">50</span>
        </div>
      </div>
    </aside>
  );
}
