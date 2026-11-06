'use client';

import { useEffect, useRef } from 'react';

// Shares the pointer position as --parallax-x and --parallax-y, each from -1 to 1.
export function useLandingHeroParallax<Element extends HTMLElement>() {
  const ref = useRef<Element>(null);

  useEffect(() => {
    const element = ref.current;
    const canUseParallax = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    ).matches;

    if (!element || !canUseParallax) return;

    let frame = 0;

    function handlePointerMove(event: PointerEvent) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = (event.clientY / window.innerHeight) * 2 - 1;
        element?.style.setProperty('--parallax-x', x.toFixed(3));
        element?.style.setProperty('--parallax-y', y.toFixed(3));
      });
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return ref;
}
