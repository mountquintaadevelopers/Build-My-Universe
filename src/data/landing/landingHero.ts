import { landingFormSectionId } from '@/data/landing/landingForm';
import type { LandingHeroContent } from '@/types/landing';

export const landingHeroContent: LandingHeroContent = {
  badge: 'Launching soon in Bengaluru',
  headingStart: 'Build My',
  headingAccent: 'Universe',
  description:
    'A new way to buy, rent and sell homes, plots and commercial spaces is almost ready.',
  ctaLabel: 'Get early access',
  ctaHref: `#${landingFormSectionId}`,
  ribbonGreenText: 'Coming soon',
  ribbonWhiteText: 'Build My Universe',
  stars: [
    { left: '7.9%', top: '17.4%' },
    { left: '13.9%', top: '32.5%' },
    { left: '21.9%', top: '11.7%' },
    { left: '29.9%', top: '46.3%' },
    { left: '35.9%', top: '21.2%' },
    { left: '41.9%', top: '62.8%' },
    { left: '47.8%', top: '9.9%' },
    { left: '54.8%', top: '60.5%' },
    { left: '62%', top: '13.3%' },
    { left: '66%', top: '38.6%' },
    { left: '69.9%', top: '53.7%' },
    { left: '77.9%', top: '28.9%' },
    { left: '85.9%', top: '61.6%' },
    { left: '91.8%', top: '44.2%' },
  ],
  // Window shapes match landingHeroBuilding.svg; delays make them light up out of order.
  buildingWindows: [
    { points: '17,127.6 51,142.7 51,181.7 17,166.6', delay: '2s' },
    { points: '193,197.7 227,182.6 227,221.6 193,236.7', delay: '2.9s' },
    { points: '71,206.3 105,221.4 105,260.4 71,245.3', delay: '3.8s' },
    { points: '139,166.4 173,151.3 173,190.3 139,205.4', delay: '4.7s' },
    { points: '17,182.6 51,197.7 51,236.7 17,221.6', delay: '5.9s' },
    { points: '193,142.7 227,127.6 227,166.6 193,181.7', delay: '6.8s' },
    { points: '71,151.3 105,166.4 105,205.4 71,190.3', delay: '8s' },
    { points: '139,221.4 173,206.3 173,245.3 139,260.4', delay: '9.1s' },
  ],
};
