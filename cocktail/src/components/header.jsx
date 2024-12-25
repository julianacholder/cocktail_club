import React, { useState } from 'react';
import Logo from '../assets/images/logo.png';
import '../assets/css/hero.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    closeMenu();
  };

  return (
    <header className="header-main">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>

      {/* Desktop Menu */}
      <nav className="desktop-menu">
        <a onClick={() => scrollToSection('recipes')} style={{ cursor: 'pointer' }}>Recipes</a>
        <a onClick={() => scrollToSection('new')} style={{ cursor: 'pointer' }}>New Cocktails</a>
        <a onClick={() => scrollToSection('random')} style={{ cursor: 'pointer' }}>Random</a>
        <a onClick={() => scrollToSection('most')} style={{ cursor: 'pointer' }}>Most Popular</a>
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
          <a onClick={() => handleNavClick('recipes')} style={{ cursor: 'pointer' }}>Recipes</a>
          <a onClick={() => handleNavClick('new')} style={{ cursor: 'pointer' }}>New Cocktails</a>
          <a onClick={() => handleNavClick('random')} style={{ cursor: 'pointer' }}>Random</a>
          <a onClick={() => handleNavClick('most')} style={{ cursor: 'pointer' }}>Most Popular</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

