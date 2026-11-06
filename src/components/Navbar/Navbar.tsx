'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navbarContent } from '@/data/navbar';
import styles from './Navbar.module.css';

export default function Navbar() {
  const {
    logoLetter,
    brandName,
    brandTagline,
    landingSheetLabel,
    homeHref,
    blogsLabel,
    blogsHref,
  } = navbarContent;
  const isLandingPage = usePathname() === homeHref;

  return (
    <header className={`${styles.navbar} ${isLandingPage ? styles.navbarLanding : ''}`}>
      <Link href={homeHref} className={styles.brand} aria-label={brandTagline}>
        <span className={styles.logo} aria-hidden="true">
          {logoLetter}
        </span>
        <span className={styles.brandText}>
          <span className={styles.brandName}>{brandName}</span>
          <span className={styles.brandTagline}>{brandTagline}</span>
        </span>
      </Link>

      {isLandingPage && <p className={styles.sheetLabel}>{landingSheetLabel}</p>}

      <nav aria-label="Main">
        <Link href={blogsHref} className={styles.blogsLink}>
          {blogsLabel}
        </Link>
      </nav>
    </header>
  );
}
