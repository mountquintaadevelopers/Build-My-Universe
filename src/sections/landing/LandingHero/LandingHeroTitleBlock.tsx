import { landingHeroContent } from '@/data/landing/landingHero';
import styles from './LandingHero.module.css';

export default function LandingHeroTitleBlock() {
  return (
    <dl className={styles.titleBlock} data-scene="title-block">
      {landingHeroContent.titleRows.map((row) => (
        <div className={styles.titleRow} data-title-row key={row.label}>
          <dt className={styles.titleLabel}>{row.label}</dt>
          <dd
            className={row.isAccent ? styles.titleValueAccent : styles.titleValue}
            data-type="title"
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
