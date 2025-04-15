import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import SideBar from "./SideBar";
import "./Layout.css";

export default function Layout() {
  useEffect(() => {
    const nav = document.querySelector('.top-nav');
    const threshold = window.innerHeight * 0.1; // 100vh

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > threshold) {
        nav.classList.add('nav-slide'); // Add animation class
      } else {
        nav.classList.remove('nav-slide'); // Remove animation class
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const logo = document.querySelector('.site-logo');
    const threshold = window.innerHeight * 1.8; // 200vh height

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > threshold) {
        logo.classList.add('hidden-logo'); // Hide logo after scrolling 200vh
      } else {
        logo.classList.remove('hidden-logo'); // Show logo if scroll is back up
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="body-container">
      {/* Sidebar Component */}
      <SideBar />

      {/* Header */}
      <header className="header-layout">
        <Link to="/">
          <img
            src="/assets/pheoinix_logo.png"
            alt="Logo"
            className="site-logo cursor-pointer"
          />
        </Link>
      </header>

      {/* Navigation */}
      <nav className="top-nav">
        <Link to="/Tv" className="hover:underline">TV</Link>
        <Link to="/Movies" className="hover:underline">Movies</Link>
        <Link to="/SearchAnime" className="hover:underline">Series</Link>
        <Link to="/Manga" className="hover:underline">Manga</Link>
      </nav>

      {/* Main Content */}
      <main className="main-layout">
        <div className="eclipse">
          <div className="Glow"></div>
        </div>
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="footer-section">
      
        <div className="footer-container">
          <div className="footer-logo">
            <img src="/assets/Logo_arabic.png" width="195" height="112" />
          </div>
          <div className="footer-links">
            <div className="footer-links1">
              <a href="">·StreamVerse Prototype Page</a>
              <a href=""> · Dusk Blue</a>
              <a href=""> · 100% Original Content</a>
              <a href="">· Privacy Policy</a>
              <a href=""> · Join Our Community</a>
              <a href="">· Terms of Use</a>
              <a href="">· Global Hits </a>
            </div>

            <div className="footer-links2">
              <p>Follow Us </p>
              <div className="sm-logo">
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/social_media/TwitterX.png" alt="X (Twitter)" width="30" height="30" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/social_media/Instagram.png" alt="Instagram" width="30" height="30" />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/social_media/Facebook.png" alt="Facebook" width="30" height="30" />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/social_media/YouTube.png" alt="YouTube" width="30" height="30" />
                </a>
              </div>

              <div className="app-logo">
                <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/mobile apps/google.png" alt="Get it on Google Play" width="180" height="180" />
                </a>

              
                  <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/mobile apps/aple.png" alt="Download on the App Store" width="180" height="180" />
                  </a>

                  <span
                  style={{
                    backgroundColor: 'white',
                    width: "50px",
                    height: "40px",
                    position: "relative",
                    top: "70px",
                    left: "-170px",
                    zIndex: "-4"
                  }}
                ></span>
                
              </div>
              
            </div>
          </div>
        </div>
        <div className="footer-rights">
          <p>&copy; PHEOINIX® · All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
