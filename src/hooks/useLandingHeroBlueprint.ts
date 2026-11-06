'use client';

import { useEffect } from 'react';
import type { RefObject } from 'react';
import gsap from 'gsap';

const calloutZones = ['homes', 'plots', 'commercial'];
const scanTravel = 258;
const litWindowOpacity = 0.75;

export function useLandingHeroBlueprint(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    const hero = root?.closest('section');
    const prefersStillness = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!root || !hero || prefersStillness) return;

    const findAll = (selector: string) =>
      Array.from(root.querySelectorAll<HTMLElement>(selector));

    const drawnLines = findAll('[data-draw]');
    const fadedLabels = findAll('[data-fade]');
    const typedTexts = findAll('[data-type]');
    const towerWindows = findAll('[data-window="tower"]');
    const lowWindows = findAll('[data-window="low"]');
    const allWindows = [...towerWindows, ...lowWindows];
    const dots = findAll('[data-dot]');
    const titleBlock = findAll('[data-scene="title-block"]');
    const titleRows = findAll('[data-title-row]');
    const compass = findAll('[data-scene="compass"]');
    const needle = findAll('[data-scene="needle"]');
    const scan = findAll('[data-scene="scan"]');

    // Remember the finished look, so everything can be drawn back up to it.
    const finishedFill = new Map(
      drawnLines.map((line) => [line, getComputedStyle(line).fillOpacity]),
    );
    const finishedWindowFill = getComputedStyle(allWindows[0]).fillOpacity;
    const finishedText = new Map(typedTexts.map((text) => [text, text.textContent ?? '']));

    function addDrawing(
      timeline: gsap.core.Timeline,
      stage: string,
      at: number,
      duration: number,
      stagger = 0.08,
    ) {
      const lines = findAll(`[data-draw="${stage}"]`);

      timeline.to(
        lines,
        { strokeDashoffset: 0, duration, stagger, ease: 'power2.inOut' },
        at,
      );

      lines.forEach((line, index) => {
        timeline.to(
          line,
          { fillOpacity: finishedFill.get(line), duration: 0.35, ease: 'power1.out' },
          at + index * stagger + duration * 0.7,
        );
      });
    }

    function addFade(timeline: gsap.core.Timeline, stage: string, at: number) {
      timeline.to(findAll(`[data-fade="${stage}"]`), { opacity: 1, duration: 0.4 }, at);
    }

    function addTyping(timeline: gsap.core.Timeline, element: HTMLElement, at: number) {
      const text = finishedText.get(element) ?? '';
      const typed = { letters: 0 };

      timeline.to(
        typed,
        {
          letters: text.length,
          duration: Math.min(0.55, text.length * 0.035),
          ease: 'none',
          onUpdate: () => {
            element.textContent = text.slice(0, Math.round(typed.letters));
          },
        },
        at,
      );
    }

    function addCallouts(timeline: gsap.core.Timeline, at: number) {
      calloutZones.forEach((zone, index) => {
        const startAt = at + index * 0.22;
        const label = findAll(`[data-type="${zone}"]`)[0];

        addDrawing(timeline, `callout-${zone}`, startAt, 0.45);
        timeline.to(
          findAll(`[data-dot="${zone}"]`),
          { scale: 1, duration: 0.45, ease: 'back.out(3)' },
          startAt + 0.38,
        );
        addTyping(timeline, label, startAt + 0.12);
      });
    }

    function addTitleBlock(timeline: gsap.core.Timeline, at: number) {
      timeline.to(titleBlock, { opacity: 1, duration: 0.3 }, at - 0.15);

      titleRows.forEach((row, index) => {
        const startAt = at + index * 0.12;
        const value = row.querySelector<HTMLElement>('[data-type="title"]');

        timeline.to(row, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }, startAt);
        if (value) addTyping(timeline, value, startAt + 0.1);
      });
    }

    function flickerRandomWindows() {
      gsap.utils
        .shuffle([...allWindows])
        .slice(0, 2)
        .forEach((window) => {
          gsap
            .timeline()
            .to(window, {
              keyframes: { fillOpacity: [litWindowOpacity * 0.6, 0.1, litWindowOpacity], easeEach: 'none' },
              duration: 0.3,
              ease: 'none',
            })
            .to(window, {
              fillOpacity: finishedWindowFill,
              duration: 1.1,
              ease: 'sine.inOut',
              delay: gsap.utils.random(1.8, 3.6),
            });
        });

      gsap.delayedCall(gsap.utils.random(0.8, 1.8), () => context.add(flickerRandomWindows));
    }

    function startIdleLife() {
      gsap.to(scan, { opacity: 1, duration: 0.6 });
      gsap.to(scan, {
        y: scanTravel,
        duration: 7,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
      gsap.fromTo(
        needle,
        { rotation: -5 },
        { rotation: 5, duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true },
      );
      flickerRandomWindows();
    }

    function playDrawing() {
      const timeline = gsap.timeline({
        onComplete: () => {
          gsap.set(drawnLines, { strokeDasharray: 'none' });
          context.add(startIdleLife);
        },
      });

      // The plot goes down first, then its measurements.
      addDrawing(timeline, 'plot', 0.15, 0.7);
      addDrawing(timeline, 'measure', 0.6, 0.5);
      addFade(timeline, 'measure', 0.95);

      // The buildings rise, front to back, from the ground up.
      addDrawing(timeline, 'house', 0.8, 0.5);
      addDrawing(timeline, 'commercial', 1, 0.5);
      addDrawing(timeline, 'shopfront', 1.4, 0.4, 0.06);
      addDrawing(timeline, 'tower', 1.25, 0.65, 0.1);
      addDrawing(timeline, 'tower-top', 1.85, 0.35);
      addDrawing(timeline, 'trees', 1.6, 0.35, 0.05);

      timeline
        .to(
          towerWindows,
          { opacity: 1, duration: 0.14, stagger: 0.011, ease: 'none' },
          1.9,
        )
        .to(lowWindows, { opacity: 1, duration: 0.3, stagger: 0.05 }, 1.85);

      addDrawing(timeline, 'floors', 2.35, 0.45);
      addFade(timeline, 'floors', 2.6);
      addCallouts(timeline, 2.5);

      // The finishing touches: compass, then the signed title block.
      timeline
        .to(compass, { opacity: 1, duration: 0.4 }, 2.75)
        .fromTo(
          needle,
          { rotation: -200 },
          { rotation: 0, duration: 1.5, ease: 'elastic.out(1, 0.35)', immediateRender: false },
          2.75,
        );

      addTitleBlock(timeline, 2.9);
    }

    const context = gsap.context(() => {
      gsap.set(drawnLines, { strokeDasharray: 1, strokeDashoffset: 1, fillOpacity: 0 });
      gsap.set(fadedLabels, { opacity: 0 });
      gsap.set(allWindows, { opacity: 0 });
      gsap.set(dots, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(titleBlock, { opacity: 0 });
      gsap.set(titleRows, { opacity: 0, x: -8 });
      gsap.set(compass, { opacity: 0 });
      gsap.set(needle, { svgOrigin: '458 44.5', rotation: -200 });
      gsap.set(scan, { opacity: 0 });
      typedTexts.forEach((text) => {
        text.textContent = '';
      });
      gsap.set(root, { opacity: 1 });
      playDrawing();
    }, root);

    // Nothing else on the site uses GSAP, so the whole clock can stop off-screen.
    const visibility = new IntersectionObserver(([entry]) => {
      gsap.globalTimeline.paused(!entry.isIntersecting);
    });
    visibility.observe(hero);

    return () => {
      visibility.disconnect();
      gsap.globalTimeline.paused(false);
      gsap.killTweensOf(flickerRandomWindows);
      context.revert();
      finishedText.forEach((text, element) => {
        element.textContent = text;
      });
    };
  }, [rootRef]);
}
