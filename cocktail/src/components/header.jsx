import React, { useState } from 'react';
import Logo from '../assets/images/logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Prevent body scrolling when menu is open
    document.body.style.overflow = menuOpen ? 'auto' : 'hidden';
  };

  return (
    <div className={`header-main ${menuOpen ? 'menu-open' : ''}`}>
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
          <a href="#recipes" onClick={toggleMenu}>Recipes</a>
          <a href="#recipes" onClick={toggleMenu}>New Cocktails</a>
          <a href="#recipes" onClick={toggleMenu}>Random</a>
          <a href="#recipes" onClick={toggleMenu}>Most Popular</a>
        </nav>
      </div>
    </div>
  );
};

export default Header;
