'use client';

import { useEffect } from 'react';
import type { RefObject } from 'react';
import gsap from 'gsap';
import { landingHeroContent } from '@/data/landing/landingHero';
import type { LandingHeroPoint } from '@/types/landing';

const sceneLengthSeconds = 12;
const shortestRestSeconds = 3;
const firstSceneDelaySeconds = 3.5;
const flapOpenDegrees = 118;

// A flap's free corner, in pixels, when it stands straight up from its hinge.
const flapHeight = 54;

const { whiteBoxCenter, whiteBoxFlaps } = landingHeroContent;

function getFlapPoints(hinge: [LandingHeroPoint, LandingHeroPoint], degrees: number) {
  const [start, end] = hinge;
  const radians = (degrees * Math.PI) / 180;
  const middleX = (start[0] + end[0]) / 2;
  const middleY = (start[1] + end[1]) / 2;
  const tipX = middleX + (whiteBoxCenter[0] - middleX) * Math.cos(radians);
  const tipY =
    middleY +
    (whiteBoxCenter[1] - middleY) * Math.cos(radians) -
    flapHeight * Math.sin(radians);

  return `${start} ${end} ${tipX},${tipY}`;
}

export function useLandingHeroScene(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    const hero = root?.closest('section');
    const prefersStillness = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!root || !hero || prefersStillness) return;

    const find = (name: string) => root.querySelector<HTMLElement>(`[data-scene="${name}"]`)!;
    const findAll = (name: string) =>
      Array.from(root.querySelectorAll<HTMLElement>(`[data-scene="${name}"]`));

    const building = find('building');
    const roofCube = find('roof-cube');
    const roofCubeTop = find('roof-cube-top');
    const roofFlash = find('roof-flash');
    const roofRing = find('roof-ring');
    const windows = findAll('window');
    const box = find('box');
    const boxLid = find('box-lid');
    const boxSeams = find('box-seams');
    const boxGlow = find('box-glow');
    const crate = find('crate');
    const block = find('block');
    const blockSpin = find('block-spin');
    const trails = findAll('trail');

    const flapAngles: Record<string, number> = {};
    whiteBoxFlaps.forEach((flap) => {
      flapAngles[flap.name] = 0;
    });

    function renderFlaps() {
      whiteBoxFlaps.forEach((flap) => {
        find(flap.name).setAttribute('points', getFlapPoints(flap.hinge, flapAngles[flap.name]));
      });
    }

    let current: gsap.core.Animation | null = null;
    let isOnScreen = true;

    function track(animation: gsap.core.Animation) {
      current = animation;
      animation.paused(!isOnScreen);
    }

    // The building, roof block and ring all react to anything that lands on the roof.
    function addRoofImpact(timeline: gsap.core.Timeline, at: number, force: number) {
      timeline
        .to(roofCube, { scaleX: 1.12, scaleY: 0.8, duration: 0.07, ease: 'power2.out' }, at)
        .to(roofCube, { scaleX: 1, scaleY: 1, duration: 0.8, ease: 'elastic.out(1, 0.4)' }, at + 0.07)
        .to(
          building,
          { scaleX: 1 + 0.04 * force, scaleY: 1 - 0.06 * force, duration: 0.09, ease: 'power2.out' },
          at,
        )
        .to(building, { scaleX: 1, scaleY: 1, duration: 1, ease: 'elastic.out(1, 0.38)' }, at + 0.09)
        .fromTo(
          roofFlash,
          { opacity: 0.7 },
          { opacity: 0, duration: 0.45, ease: 'power2.out', immediateRender: false },
          at,
        )
        .fromTo(
          roofRing,
          { opacity: 0.9, scale: 0.35 },
          { opacity: 0, scale: 1.3, duration: 0.7, ease: 'expo.out', immediateRender: false },
          at,
        );
    }

    // Each light stutters like a real tube starting up, one floor after the other.
    function addWindowsWaking(timeline: gsap.core.Timeline, at: number) {
      windows.forEach((window, index) => {
        const floorPause = index >= windows.length / 2 ? 0.12 : 0;
        timeline.to(
          window,
          {
            keyframes: { opacity: [0, 0.85, 0.15, 0.7, 0.35, 1], easeEach: 'none' },
            duration: 0.4,
            ease: 'none',
          },
          at + index * 0.085 + floorPause,
        );
      });
    }

    function addCrateHop(timeline: gsap.core.Timeline, at: number) {
      timeline
        .to(crate, { scaleX: 1.07, scaleY: 0.9, duration: 0.1, ease: 'power2.out' }, at)
        .to(crate, { scaleX: 0.95, scaleY: 1.07, y: -36, duration: 0.24, ease: 'power2.out' }, at + 0.1)
        .to(crate, { scaleX: 1, scaleY: 1, y: 0, duration: 0.22, ease: 'power2.in' }, at + 0.34)
        .to(crate, { scaleX: 1.07, scaleY: 0.92, duration: 0.06, ease: 'power2.out' }, at + 0.56)
        .to(crate, { scaleX: 1, scaleY: 1, duration: 0.7, ease: 'elastic.out(1, 0.4)' }, at + 0.62);
    }

    function getFlight() {
      const rootBox = root!.getBoundingClientRect();
      const heroBox = hero!.getBoundingClientRect();
      const centerOf = (element: HTMLElement) => {
        const elementBox = element.getBoundingClientRect();
        return {
          x: elementBox.left + elementBox.width / 2 - rootBox.left,
          y: elementBox.top + elementBox.height / 2 - rootBox.top,
        };
      };

      const start = centerOf(boxLid);
      const end = centerOf(roofCubeTop);
      const distance = Math.hypot(end.x - start.x, end.y - start.y);
      const lowestPeak = heroBox.top - rootBox.top + 24;
      const peakY = Math.max(lowestPeak, Math.min(start.y, end.y) - Math.min(170, distance * 0.35));

      // Gravity: time to rise and fall depends on the square root of the height.
      const rise = Math.sqrt(Math.max(start.y - peakY, 1));
      const fall = Math.sqrt(Math.max(end.y - peakY, 1));
      const duration = 0.75 + Math.min(distance / 2000, 0.55);

      return {
        start,
        end,
        peakY,
        duration,
        riseDuration: (duration * rise) / (rise + fall),
        fallDuration: (duration * fall) / (rise + fall),
      };
    }

    function addFlight(timeline: gsap.core.Timeline, at: number) {
      const flight = getFlight();
      const halfBlock = block.offsetWidth / 2;
      const flyer = (element: HTMLElement, startAt: number) => {
        timeline
          .to(element, { x: flight.end.x - halfBlock, duration: flight.duration, ease: 'none' }, startAt)
          .to(
            element,
            { y: flight.peakY - halfBlock, duration: flight.riseDuration, ease: 'power2.out' },
            startAt,
          )
          .to(
            element,
            { y: flight.end.y - halfBlock, duration: flight.fallDuration, ease: 'power2.in' },
            startAt + flight.riseDuration,
          );
      };
      const startPosition = {
        x: flight.start.x - halfBlock,
        y: flight.start.y - halfBlock,
      };

      timeline
        .set([block, ...trails], startPosition, at)
        .set(block, { scaleX: 0.3, scaleY: 0.3, opacity: 1 }, at)
        .set(blockSpin, { rotation: 0 }, at)
        .to(block, { scaleX: 0.8, scaleY: 1.3, duration: 0.14, ease: 'power3.out' }, at)
        .to(block, { scaleX: 1, scaleY: 1, duration: flight.riseDuration * 0.7, ease: 'sine.out' }, at + 0.14)
        .to(
          block,
          { scaleX: 0.85, scaleY: 1.22, duration: flight.fallDuration * 0.6, ease: 'sine.in' },
          at + flight.duration - flight.fallDuration * 0.6,
        )
        .to(blockSpin, { rotation: -360, duration: flight.duration, ease: 'none' }, at);

      flyer(block, at);

      trails.forEach((trail, index) => {
        const lag = (index + 1) * 0.055;
        timeline.set(trail, { opacity: 0.75 - index * 0.2, scale: 0.7 - index * 0.17 }, at + lag);
        flyer(trail, at + lag);
      });

      const impactAt = at + flight.duration;

      timeline
        .to(block, { scaleX: 0, scaleY: 0, opacity: 0, duration: 0.1, ease: 'power2.in' }, impactAt)
        .to(trails, { opacity: 0, duration: 0.12 }, impactAt);

      return impactAt;
    }

    function playScene() {
      const timeline = gsap.timeline({
        onComplete: () => {
          const rest = Math.max(shortestRestSeconds, sceneLengthSeconds - timeline.duration());
          track(gsap.delayedCall(rest, () => context.add(playScene)));
        },
      });

      // The windows go dark, so the next landing has something to wake up.
      timeline.to(windows, {
        opacity: 0,
        duration: 0.5,
        stagger: { each: 0.06, from: 'random' },
      }, 0);

      // 1. Build-up: the box crouches before it fires.
      const crouchAt = 0.5;
      const popAt = crouchAt + 0.4;

      timeline
        .to(box, { scaleX: 1.05, scaleY: 0.92, duration: 0.4, ease: 'power2.inOut' }, crouchAt)
        .to(box, { scaleX: 0.96, scaleY: 1.08, duration: 0.12, ease: 'power3.out' }, popAt)
        .to(box, { scaleX: 1, scaleY: 1, duration: 0.7, ease: 'elastic.out(1, 0.45)' }, popAt + 0.12)
        .set(boxLid, { opacity: 0 }, popAt)
        .to(boxSeams, { opacity: 0, duration: 0.06 }, popAt)
        .to(boxGlow, { opacity: 0.85, duration: 0.18, ease: 'power2.out' }, popAt);

      whiteBoxFlaps.forEach((flap, index) => {
        timeline.to(
          flapAngles,
          {
            [flap.name]: flapOpenDegrees,
            duration: 0.42,
            ease: 'back.out(2.4)',
            onUpdate: renderFlaps,
          },
          popAt + index * 0.035,
        );
      });

      // 2 to 5. Launch, impact and the chain reaction that follows it.
      const impactAt = addFlight(timeline, popAt + 0.07);

      addRoofImpact(timeline, impactAt, 1);
      addWindowsWaking(timeline, impactAt + 0.12);
      addCrateHop(timeline, impactAt + 0.25);

      // 6. Settle: the flaps fall shut and the box takes the small thump.
      const closeAt = impactAt + 0.55;
      const closedAt = closeAt + 0.45;

      timeline.to(boxGlow, { opacity: 0, duration: 0.4, ease: 'power1.in' }, closeAt);

      [...whiteBoxFlaps].reverse().forEach((flap, index) => {
        timeline.to(
          flapAngles,
          {
            [flap.name]: 0,
            duration: 0.3,
            ease: 'power3.in',
            onUpdate: renderFlaps,
          },
          closeAt + index * 0.05,
        );
      });

      timeline
        .set(boxLid, { opacity: 1 }, closedAt)
        .to(boxSeams, { opacity: 1, duration: 0.1 }, closedAt)
        .to(box, { scaleX: 1.025, scaleY: 0.965, duration: 0.07, ease: 'power2.out' }, closedAt)
        .to(box, { scaleX: 1, scaleY: 1, duration: 0.6, ease: 'elastic.out(1, 0.45)' }, closedAt + 0.07);

      track(timeline);
    }

    function playIntro() {
      const roofLandAt = 1.45;
      const timeline = gsap.timeline({
        onComplete: () => {
          track(gsap.delayedCall(firstSceneDelaySeconds, () => context.add(playScene)));
        },
      });

      timeline
        .to(building, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.in' }, 0.2)
        .to(building, { scaleX: 1.05, scaleY: 0.9, duration: 0.09, ease: 'power2.out' }, 0.7)
        .to(building, { scaleX: 1, scaleY: 1, duration: 1, ease: 'elastic.out(1, 0.38)' }, 0.79)
        .to(box, { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.8)' }, 0.45)
        .to(crate, { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(2.2)' }, 0.6)
        .set(roofCube, { opacity: 1 }, roofLandAt - 0.36)
        .to(roofCube, { y: 0, duration: 0.36, ease: 'power3.in' }, roofLandAt - 0.36);

      addRoofImpact(timeline, roofLandAt, 0.7);
      addWindowsWaking(timeline, roofLandAt + 0.12);
      track(timeline);
    }

    const context = gsap.context(() => {
      gsap.set(building, { svgOrigin: '122 302', y: -70, opacity: 0 });
      gsap.set(roofCube, { svgOrigin: '123 108', y: -150, opacity: 0 });
      gsap.set(roofRing, { svgOrigin: '122 98' });
      gsap.set(box, { svgOrigin: '98 216', scale: 0.7, opacity: 0 });
      gsap.set(crate, { svgOrigin: '99 216', scale: 0.7, opacity: 0 });
      gsap.set(blockSpin, { svgOrigin: '30 33' });
      gsap.set(root, { opacity: 1 });
      playIntro();
    }, root);

    const visibility = new IntersectionObserver(([entry]) => {
      isOnScreen = entry.isIntersecting;
      current?.paused(!isOnScreen);
    });
    visibility.observe(hero);

    return () => {
      visibility.disconnect();
      current?.kill();
      context.revert();
    };
  }, [rootRef]);
}
