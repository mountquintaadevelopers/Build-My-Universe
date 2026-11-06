import { landingHeroContent } from '@/data/landing/landingHero';
import styles from './LandingHero.module.css';

const roofPoints = '122,44 244,98 122,152 0,98';
const windowLightColor = '#e9f7a6';

export default function LandingHeroBuilding() {
  const { buildingWindows } = landingHeroContent;

  return (
    <svg className={styles.shapeSvg} viewBox="0 0 244 304">
      <g data-scene="building">
        <polygon fill="#8bb72c" points="0,98 122,152 122,302 0,236" />
        <polygon fill="#6a8f1c" points="122,152 244,98 244,236 122,302" />
        <polygon fill="#aed45a" points={roofPoints} />
        <polygon
          data-scene="roof-flash"
          fill={windowLightColor}
          opacity="0"
          points={roofPoints}
        />
        <polygon
          data-scene="roof-ring"
          fill="none"
          stroke={windowLightColor}
          strokeWidth="3"
          opacity="0"
          points={roofPoints}
        />

        {buildingWindows.map((points) => (
          <polygon fill="#1c1c1c" key={points} points={points} />
        ))}
        {buildingWindows.map((points) => (
          <polygon
            data-scene="window"
            fill={windowLightColor}
            key={points}
            opacity="0"
            points={points}
          />
        ))}

        <g data-scene="roof-cube">
          <polygon fill="#e4e4e4" points="74,26 123,52 123,108 74,80" />
          <polygon fill="#bdbdbd" points="123,52 172,26 172,80 123,108" />
          <polygon
            data-scene="roof-cube-top"
            fill="#ffffff"
            points="123,0 172,26 123,52 74,26"
          />
        </g>
      </g>
    </svg>
  );
}
