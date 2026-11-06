import { landingHeroContent } from '@/data/landing/landingHero';
import styles from './LandingHero.module.css';

// Each half must be wider than the screen so the loop never shows a gap.
const repeatsPerHalf = 10;

function TickerHalf() {
  return Array.from({ length: repeatsPerHalf }, (_, repeat) =>
    landingHeroContent.tickerItems.map((item) => (
      <span
        className={item.isAccent ? styles.tickerItemAccent : styles.tickerItem}
        key={`${repeat}-${item.text}`}
      >
        {item.text}
        <span className={styles.tickerDiamond} />
      </span>
    )),
  );
}

export default function LandingHeroTicker() {
  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.tickerTrack}>
        <TickerHalf />
        <TickerHalf />
      </div>
    </div>
  );
}
