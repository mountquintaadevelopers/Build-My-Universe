import { landingHeroContent } from '@/data/landing/landingHero';
import LandingHeroRibbons from './LandingHeroRibbons';
import LandingHeroShapes from './LandingHeroShapes';
import styles from './LandingHero.module.css';

export default function LandingHero() {
  const {
    badge,
    headingStart,
    headingAccent,
    description,
    ctaLabel,
    ctaHref,
    ribbonGreenText,
    ribbonWhiteText,
    stars,
  } = landingHeroContent;

  return (
    <section className={styles.hero}>
      <div className={styles.stars} aria-hidden="true">
        {stars.map((star, index) => (
          <span
            className={styles.star}
            key={`${star.left}-${star.top}`}
            style={{
              left: star.left,
              top: star.top,
              animationDelay: `${(index * 0.7) % 4}s`,
            }}
          />
        ))}
        <span className={styles.shootingStar} />
      </div>

      <div className={styles.content}>
        <p className={styles.badge}>
          <span className={styles.badgeDot} aria-hidden="true" />
          {badge}
        </p>

        <h1 className={styles.heading}>
          <span>{headingStart}</span>{' '}
          <span className={styles.headingAccent}>{headingAccent}</span>
        </h1>

        <p className={styles.description}>{description}</p>

        <a href={ctaHref} className={styles.cta}>
          {ctaLabel}
          <svg
            className={styles.ctaArrow}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 12h16M14 6l6 6-6 6" />
          </svg>
        </a>
      </div>

      <LandingHeroShapes />
      <LandingHeroRibbons greenText={ribbonGreenText} whiteText={ribbonWhiteText} />
    </section>
  );
}
