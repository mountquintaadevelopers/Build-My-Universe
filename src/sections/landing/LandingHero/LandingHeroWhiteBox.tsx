import { landingHeroContent } from '@/data/landing/landingHero';
import styles from './LandingHero.module.css';

const topPoints = '98,0 196,54 98,108 0,54';

export default function LandingHeroWhiteBox() {
  const { whiteBoxCenter, whiteBoxFlaps } = landingHeroContent;

  return (
    <svg className={styles.shapeSvg} viewBox="0 0 196 216">
      <g data-scene="box">
        <polygon fill="#e4e4e4" points="0,54 98,108 98,216 0,160" />
        <polygon fill="#bdbdbd" points="98,108 196,54 196,160 98,216" />
        <polygon fill="#1c1c1c" points={topPoints} />
        <polygon data-scene="box-glow" fill="#e9f7a6" opacity="0" points={topPoints} />

        {whiteBoxFlaps.map((flap) => (
          <polygon
            data-scene={flap.name}
            fill={flap.fill}
            key={flap.name}
            points={[...flap.hinge, whiteBoxCenter].join(' ')}
          />
        ))}

        <polygon data-scene="box-lid" fill="#ffffff" points={topPoints} />
        <g
          data-scene="box-seams"
          fill="none"
          stroke="#e4e4e4"
          strokeWidth="7"
          strokeLinecap="round"
        >
          <line x1="98" y1="52" x2="98" y2="24" />
          <line x1="98" y1="52" x2="48" y2="72" />
          <line x1="98" y1="52" x2="148" y2="72" />
        </g>
      </g>
    </svg>
  );
}
