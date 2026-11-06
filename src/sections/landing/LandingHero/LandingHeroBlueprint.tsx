'use client';

import { useRef } from 'react';
import { landingHeroContent } from '@/data/landing/landingHero';
import { landingHeroBlueprint as drawing } from '@/data/landing/landingHeroBlueprint';
import { useLandingHeroBlueprint } from '@/hooks/useLandingHeroBlueprint';
import type { LandingHeroCalloutZone } from '@/types/landing';
import LandingHeroTitleBlock from './LandingHeroTitleBlock';
import styles from './LandingHero.module.css';

const calloutZones: LandingHeroCalloutZone[] = ['homes', 'plots', 'commercial'];

export default function LandingHeroBlueprint() {
  const artRef = useRef<HTMLDivElement>(null);
  useLandingHeroBlueprint(artRef);

  const content = landingHeroContent;
  const { tower, house, commercial, compass } = drawing;
  const line = styles.line;

  return (
    <div className={styles.art} ref={artRef} aria-hidden="true">
      <svg className={styles.drawing} viewBox="0 0 510 350">
        <defs>
          <linearGradient id="landingHeroScanGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8bb72c" stopOpacity="0" />
            <stop offset="0.86" stopColor="#8bb72c" stopOpacity="0.1" />
            <stop offset="1" stopColor="#8bb72c" stopOpacity="0.5" />
          </linearGradient>
          <mask id="landingHeroPlotReveal" maskUnits="userSpaceOnUse" x="0" y="0" width="510" height="350">
            <polygon
              data-draw="plot"
              fill="none"
              stroke="#ffffff"
              strokeWidth="6"
              pathLength={1}
              points={drawing.plot}
            />
          </mask>
        </defs>

        <polygon
          className={styles.dashedLine}
          mask="url(#landingHeroPlotReveal)"
          points={drawing.plot}
        />

        <g data-zone="homes" className={styles.zone}>
          <polygon className={`${line} ${styles.wall}`} data-draw="tower" pathLength={1} points={tower.leftFace} />
          <polygon className={`${line} ${styles.wall}`} data-draw="tower" pathLength={1} points={tower.rightFace} />
          <polygon className={`${line} ${styles.roof}`} data-draw="tower" pathLength={1} points={tower.roof} />
          <polygon className={line} data-draw="tower-top" pathLength={1} points={tower.roofBase} />
          <polygon className={`${line} ${styles.roof}`} data-draw="tower-top" pathLength={1} points={tower.roofCubeTop} />
          <path className={line} data-draw="tower-top" pathLength={1} d={tower.roofCubeSides} />
          {tower.windows.map((points) => (
            <polygon className={styles.window} data-window="tower" key={points} points={points} />
          ))}
        </g>

        <g data-zone="plots" className={styles.zone}>
          <polygon className={`${line} ${styles.wall}`} data-draw="house" pathLength={1} points={house.leftWall} />
          <polygon className={`${line} ${styles.wall}`} data-draw="house" pathLength={1} points={house.rightWall} />
          <polygon className={`${line} ${styles.roof}`} data-draw="house" pathLength={1} points={house.roof} />
          <polygon className={`${line} ${styles.wall}`} data-draw="house" pathLength={1} points={house.gable} />
          <polygon className={styles.window} data-window="low" points={house.window} />
          <polygon className={styles.window} data-window="low" points={house.door} />
        </g>

        <g data-zone="commercial" className={styles.zone}>
          <polygon className={`${line} ${styles.wall}`} data-draw="commercial" pathLength={1} points={commercial.leftWall} />
          <polygon className={`${line} ${styles.wall}`} data-draw="commercial" pathLength={1} points={commercial.rightWall} />
          <polygon className={`${line} ${styles.roof}`} data-draw="commercial" pathLength={1} points={commercial.roof} />
          {commercial.windows.map((points) => (
            <polygon className={styles.window} data-window="low" key={points} points={points} />
          ))}
          <polygon className={`${line} ${styles.glass}`} data-draw="shopfront" pathLength={1} points={commercial.glass} />
          <path className={line} data-draw="shopfront" pathLength={1} d={commercial.glassBars} />
          <polygon className={`${line} ${styles.awning}`} data-draw="shopfront" pathLength={1} points={commercial.awning} />
        </g>

        {drawing.trees.map((tree) => (
          <g key={tree.x}>
            <circle className={line} data-draw="trees" pathLength={1} cx={tree.x} cy={tree.y} r={tree.radius} />
            <path
              className={line}
              data-draw="trees"
              pathLength={1}
              d={`M${tree.x - 4} ${tree.y}H${tree.x + 4}M${tree.x} ${tree.y}V${tree.y + 6}`}
            />
          </g>
        ))}

        <path className={line} data-draw="measure" pathLength={1} d={drawing.plotWidth.line} />
        <path className={line} data-draw="measure" pathLength={1} d={drawing.plotDepth.line} />
        <text
          className={styles.dimension}
          data-fade="measure"
          textAnchor="middle"
          transform={`rotate(${drawing.plotWidth.label.angle} ${drawing.plotWidth.label.x} ${drawing.plotWidth.label.y})`}
          x={drawing.plotWidth.label.x}
          y={drawing.plotWidth.label.y}
        >
          {content.plotWidthLabel}
        </text>
        <text
          className={styles.dimension}
          data-fade="measure"
          textAnchor="middle"
          transform={`rotate(${drawing.plotDepth.label.angle} ${drawing.plotDepth.label.x} ${drawing.plotDepth.label.y})`}
          x={drawing.plotDepth.label.x}
          y={drawing.plotDepth.label.y}
        >
          {content.plotDepthLabel}
        </text>
        <text className={styles.dimension} data-fade="measure" x={drawing.plotLabel.x} y={drawing.plotLabel.y}>
          {content.plotLabel}
        </text>

        <path className={line} data-draw="floors" pathLength={1} d={drawing.floors.line} />
        <text
          className={styles.dimension}
          data-fade="floors"
          textAnchor="middle"
          transform={`rotate(-90 ${drawing.floors.label.x} ${drawing.floors.label.y})`}
          x={drawing.floors.label.x}
          y={drawing.floors.label.y}
        >
          {content.floorsLabel}
        </text>

        {calloutZones.map((zone) => {
          const callout = drawing.callouts[zone];

          return (
            <g className={styles.callout} data-callout={zone} key={zone}>
              <rect className={styles.calloutHitArea} {...callout.hitArea} />
              <path className={line} data-draw={`callout-${zone}`} pathLength={1} d={callout.line} />
              <circle
                className={styles.calloutPulse}
                cx={callout.dot.x}
                cy={callout.dot.y}
                r="2.4"
              />
              <circle
                className={styles.calloutDot}
                data-dot={zone}
                cx={callout.dot.x}
                cy={callout.dot.y}
                r="2.4"
              />
              <text className={styles.calloutLabel} data-type={zone} x={callout.label.x} y={callout.label.y}>
                {content.callouts[zone]}
              </text>
            </g>
          );
        })}

        <g data-scene="compass">
          <circle className={line} cx={compass.x} cy={compass.y} r={compass.radius} />
          <circle className={styles.compassInner} cx={compass.x} cy={compass.y} r={compass.innerRadius} />
          <g data-scene="needle">
            <polygon className={styles.needleNorth} points={compass.needleNorth} />
            <polygon className={styles.needleSouth} points={compass.needleSouth} />
          </g>
          <text className={styles.compassLabel} textAnchor="middle" x={compass.x} y={compass.y - 22}>
            {content.compassLabel}
          </text>
        </g>

        <g className={styles.scan} data-scene="scan">
          <rect fill="url(#landingHeroScanGlow)" x="0" y="10" width="510" height="47" />
        </g>
      </svg>

      <LandingHeroTitleBlock />
    </div>
  );
}
