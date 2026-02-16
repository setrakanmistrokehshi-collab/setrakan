// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import setrakanLogo from '../../src/assets/logo-img.jpg'; // ← fix path if needed
import './Nav.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <div className="nav-container">
        {/* Logo first */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={setrakanLogo} alt="SETRAKAN" className="logo-img" />
        </Link>

        {/* Desktop nav (hidden on mobile) */}
        <nav className="nav-links desktop-nav">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/services" onClick={closeMenu}>Services</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
          <Link to="/register" onClick={closeMenu}>Register</Link>
          <Link to="/login" onClick={closeMenu}>Login</Link>
          <Link to="/user" onClick={closeMenu}>userList</Link>
          <Link to="/GetUser/:id" onClick={closeMenu}>GetUser</Link>
          <Link to="/EditUser/edit/:id" onClick={closeMenu}>EditUser</Link>
          <Link to="/product" onClick={closeMenu}>Products</Link>
        </nav>

        {/* Hamburger – always last in flex, appears only on mobile */}
        <button
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile menu panel – full overlay */}
        <nav className={`nav-links mobile-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/services" onClick={closeMenu}>Services</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
          <Link to="/register" onClick={closeMenu}>Register</Link>
          <Link to="/login" onClick={closeMenu}>Login</Link>
          <Link to="/user" onClick={closeMenu}>userList</Link>
          <Link to="/GetUser/:id" onClick={closeMenu}>GetUser</Link>
          <Link to="/EditUser/edit/:id" onClick={closeMenu}>EditUser</Link>
          <Link to="/product" onClick={closeMenu}>Products</Link>
        </nav>
      </div>
    </header>
  );
}