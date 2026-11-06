'use client';

import Image from 'next/image';
import { landingHeroContent } from '@/data/landing/landingHero';
import { useLandingHeroParallax } from '@/hooks/useLandingHeroParallax';
import styles from './LandingHero.module.css';

export default function LandingHeroShapes() {
  const shapesRef = useLandingHeroParallax<HTMLDivElement>();

  return (
    <div className={styles.shapes} ref={shapesRef} aria-hidden="true">
      <div className={styles.building}>
        <div className={styles.shapeMotion}>
          <Image
            className={styles.shapeImage}
            src="/images/landing/landingHeroBuildingBase.webp"
            alt=""
            width={976}
            height={1216}
            sizes="(max-width: 768px) 24vw, 14vw"
            loading="eager"
          />
          <svg className={styles.buildingWindows} viewBox="0 0 244 304">
            {landingHeroContent.buildingWindows.map((window) => (
              <polygon
                className={styles.buildingWindow}
                key={window.points}
                points={window.points}
                style={{ animationDelay: window.delay }}
              />
            ))}
          </svg>
          <Image
            className={styles.buildingCube}
            src="/images/landing/landingHeroBuildingCube.webp"
            alt=""
            width={976}
            height={1216}
            sizes="(max-width: 768px) 24vw, 14vw"
            loading="eager"
          />
        </div>
      </div>

      <div className={styles.greenCube}>
        <div className={styles.shapeMotion}>
          <Image
            className={styles.shapeImage}
            src="/images/landing/landingHeroGreenCube.webp"
            alt=""
            width={792}
            height={864}
            sizes="(max-width: 768px) 12vw, 8vw"
            loading="eager"
          />
        </div>
      </div>

      <div className={styles.whiteCube}>
        <div className={styles.shapeMotion}>
          <Image
            className={styles.shapeImage}
            src="/images/landing/landingHeroWhiteCube.webp"
            alt=""
            width={784}
            height={864}
            sizes="(max-width: 768px) 18vw, 11vw"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
