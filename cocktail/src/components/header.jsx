import React, { useState } from 'react';
import Logo from '../assets/images/logo.png';
import '../assets/css/hero.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);

    // Dynamically adjust the header's width and margin-top when the mobile menu opens
    const header = document.querySelector('.header-main');
    if (!menuOpen) {
      header.style.width = '100%';
      header.style.marginTop = '0';
    } else {
      header.style.width = '';  // Reset to the original width
      header.style.marginTop = '';  // Reset to the original margin-top
    }

    // Prevent or allow scrolling when the menu is open or closed
    document.body.style.overflow = !menuOpen ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setMenuOpen(false);

    // Reset header styles when the mobile menu is closed
    const header = document.querySelector('.header-main');
    header.style.width = '';  // Reset to the original width
    header.style.marginTop = '';  // Reset to the original margin-top

    // Allow scrolling when the menu is closed
    document.body.style.overflow = 'auto';
  };

  return (
    <header className="header-main">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>

      {/* Desktop Menu */}
      <nav className="desktop-menu">
        <a href="#recipes">Recipes</a>
        <a href="#recipes">New Cocktails</a>
        <a href="#recipes">Random</a>
        <a href="#recipes">Most Popular</a>
      </nav>

      {/* Hamburger Button */}
      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Full Screen Mobile Menu */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'active' : ''}`}>
        <nav className="mobile-menu">
          <a href="#recipes" onClick={closeMenu}>Recipes</a>
          <a href="#new-cocktails" onClick={closeMenu}>New Cocktails</a>
          <a href="#random" onClick={closeMenu}>Random</a>
          <a href="#most-popular" onClick={closeMenu}>Most Popular</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

