import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import "./SideBar.css";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Sidebar Toggle Button (Same icon, rotates) */}
      <button className="menu-btn" onClick={toggleSidebar}>
        <Menu size={28} className={`icon-rotate ${isOpen ? "open" : ""}`} />
      </button>
        
      {/* Sidebar Panel */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="solidBar"></div>

        <nav className="sidebar-nav">
        <Link to="/profil" onClick={toggleSidebar}>Profil</Link>
          <Link to="/settings" onClick={toggleSidebar}>Settings</Link>
          <Link to="/FavoriteAnime" onClick={toggleSidebar}>Favoris</Link> {/* This ensures redirection to FavoriteAnime page */}
          <Link to="/Logout" onClick={toggleSidebar}>Logout</Link>
        </nav>
      </div>
    </>
  );
}
