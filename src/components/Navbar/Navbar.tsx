import Link from 'next/link';
import { navbarContent } from '@/data/navbar';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { logoLetter, brandName, brandTagline, homeHref, blogsLabel, blogsHref } =
    navbarContent;

  return (
    <header className={styles.navbar}>
      <Link href={homeHref} className={styles.brand} aria-label={brandTagline}>
        <span className={styles.logo} aria-hidden="true">
          {logoLetter}
        </span>
        <span className={styles.brandText}>
          <span className={styles.brandName}>{brandName}</span>
          <span className={styles.brandTagline}>{brandTagline}</span>
        </span>
      </Link>

      <nav aria-label="Main">
        <Link href={blogsHref} className={styles.blogsLink}>
          {blogsLabel}
        </Link>
      </nav>
    </header>
  );
}
