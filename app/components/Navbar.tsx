"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link href="/">GARAGE 22</Link>
          </div>
          
          <ul className={styles.navLinks}>
            <li><Link href="#about">About</Link></li>
            <li><Link href="#services">Services</Link></li>
            <li><Link href="#contact">Contact</Link></li>
          </ul>

          <div className={styles.cta}>
            <Link href="#contact" className={styles.bookBtn}>Book Service</Link>
          </div>

          <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`${styles.line} ${isOpen ? styles.open : ''}`}></span>
            <span className={`${styles.line} ${isOpen ? styles.open : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Full screen mobile overlay menu */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.menuOpen : ''}`}>
        <ul className={styles.mobileNavLinks}>
          <li><Link href="#about" onClick={toggleMenu}>About</Link></li>
          <li><Link href="#services" onClick={toggleMenu}>Services</Link></li>
          <li><Link href="#contact" onClick={toggleMenu}>Contact</Link></li>
        </ul>
      </div>
    </>
  );
}
