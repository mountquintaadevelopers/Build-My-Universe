import styles from './LandingHero.module.css';

// Each half of a track must be wider than the screen for the loop to stay seamless.
const repeatCount = 40;

type LandingHeroRibbonsProps = {
  greenText: string;
  whiteText: string;
};

function RibbonTrack({ text }: { text: string }) {
  return (
    <div className={styles.ribbonTrack}>
      {Array.from({ length: repeatCount }, (_, index) => (
        <span className={styles.ribbonItem} key={index}>
          {text}
          <span className={styles.ribbonDiamond} />
        </span>
      ))}
    </div>
  );
}

export default function LandingHeroRibbons({
  greenText,
  whiteText,
}: LandingHeroRibbonsProps) {
  return (
    <div className={styles.ribbons} aria-hidden="true">
      <div className={`${styles.ribbon} ${styles.ribbonWhite}`}>
        <RibbonTrack text={whiteText} />
      </div>
      <div className={`${styles.ribbon} ${styles.ribbonGreen}`}>
        <RibbonTrack text={greenText} />
      </div>
    </div>
  );
}
