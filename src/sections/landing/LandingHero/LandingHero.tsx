import { landingHeroContent } from '@/data/landing/landingHero';
import LandingHeroBlueprint from './LandingHeroBlueprint';
import LandingHeroTicker from './LandingHeroTicker';
import styles from './LandingHero.module.css';

function Crosshair({ className }: { className: string }) {
  return (
    <svg className={`${styles.crosshair} ${className}`} viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="4" />
      <path d="M8 0V16M0 8H16" />
    </svg>
  );
}

export default function LandingHero() {
  const {
    badge,
    headingStart,
    headingAccent,
    rulerLabel,
    description,
    ctaLabel,
    ctaHref,
    services,
  } = landingHeroContent;

  return (
    <section className={styles.hero}>
      <Crosshair className={styles.crosshairTopLeft} />
      <Crosshair className={styles.crosshairTopRight} />
      <Crosshair className={styles.crosshairBottomLeft} />

      <div className={styles.layout}>
        <div className={styles.content}>
          <p className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            {badge}
          </p>

          <div className={styles.headingBlock}>
            <h1 className={styles.heading}>
              <span>{headingStart}</span>{' '}
              <span className={styles.headingAccent}>{headingAccent}</span>
            </h1>
            <p className={styles.ruler}>
              <span className={styles.rulerLine} aria-hidden="true" />
              <span className={styles.rulerLabel}>{rulerLabel}</span>
            </p>
          </div>

          <p className={styles.description}>{description}</p>

          <div className={styles.actions}>
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
            <p className={styles.services}>{services}</p>
          </div>
        </div>

        <LandingHeroBlueprint />
      </div>

      <LandingHeroTicker />
    </section>
  );
}
