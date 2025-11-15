'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'INFO', path: '/info' },
    { name: 'MAP', path: '/map' },
    { name: 'SEARCH', path: '/search' },
    { name: 'BOOTH', path: '/booth' },
    { name: 'STAGE', path: '/stage' },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img
            className={styles.logo_img}
            src='/icon/sf-logo-mono-with-text.svg'
            alt='SF25'
            width={120}
            height={40}
          />
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map(item => (
              <li key={item.name} className={styles.navListItem}>
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
          <div className={styles.hamburger} onClick={toggleHandler}>
            <span className={isMenuOpen ? styles.barOpen : styles.bar}></span>
            <span className={isMenuOpen ? styles.barOpen : styles.bar}></span>
            <span className={isMenuOpen ? styles.barOpen : styles.bar}></span>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
      >
        <ul className={styles.mobileNavList}>
          {navItems.map(item => (
            <li
              key={item.name}
              className={styles.mobileNavListItem}
              onClick={toggleHandler}
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
