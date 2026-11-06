'use client';

import { useLandingHeroParallax } from '@/hooks/useLandingHeroParallax';
import { useLandingHeroScene } from '@/hooks/useLandingHeroScene';
import LandingHeroBuilding from './LandingHeroBuilding';
import LandingHeroGreenCrate from './LandingHeroGreenCrate';
import LandingHeroWhiteBox from './LandingHeroWhiteBox';
import styles from './LandingHero.module.css';

const trailCount = 3;

export default function LandingHeroShapes() {
  const shapesRef = useLandingHeroParallax<HTMLDivElement>();
  useLandingHeroScene(shapesRef);

  return (
    <div className={styles.shapes} ref={shapesRef} aria-hidden="true">
      <div className={styles.building}>
        <div className={styles.shapeMotion}>
          <LandingHeroBuilding />
        </div>
      </div>

      <div className={styles.greenCube}>
        <div className={styles.shapeMotion}>
          <LandingHeroGreenCrate />
        </div>
      </div>

      <div className={styles.whiteCube}>
        <div className={styles.shapeMotion}>
          <LandingHeroWhiteBox />
        </div>
      </div>

      {Array.from({ length: trailCount }, (_, index) => (
        <span className={styles.sceneTrail} data-scene="trail" key={index} />
      ))}

      <div className={styles.sceneBlock} data-scene="block">
        <svg viewBox="0 0 60 66">
          <g data-scene="block-spin">
            <polygon fill="#aed45a" points="0,16 30,33 30,66 0,49" />
            <polygon fill="#8bb72c" points="30,33 60,16 60,49 30,66" />
            <polygon fill="#e9f7a6" points="30,0 60,16 30,33 0,16" />
          </g>
        </svg>
      </div>
    </div>
  );
}
