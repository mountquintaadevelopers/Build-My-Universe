import { landingFormSectionId } from '@/data/landing/landingForm';
import type { LandingHeroContent } from '@/types/landing';

export const landingHeroContent: LandingHeroContent = {
  badge: 'Launching soon in Bengaluru',
  headingStart: 'Build My',
  headingAccent: 'Universee',
  rulerLabel: 'Planned for you',
  description:
    'A new way to buy, rent and sell homes, plots and commercial spaces is almost ready.',
  ctaLabel: 'Get early access',
  ctaHref: `#${landingFormSectionId}`,
  services: 'Buy · Rent · Sell',
  callouts: {
    homes: 'HOMES',
    plots: 'PLOTS & VILLAS',
    commercial: 'COMMERCIAL',
  },
  floorsLabel: 'G+8 FLOORS',
  plotLabel: 'PLOT 01',
  plotWidthLabel: '60 FT',
  plotDepthLabel: '40 FT',
  compassLabel: 'N',
  titleRows: [
    { label: 'Project', value: 'Build My Universee' },
    { label: 'Location', value: 'Bengaluru, KA' },
    { label: 'Status', value: 'Coming soon', isAccent: true },
    { label: 'Sheet', value: '01 · Scale 1:100' },
  ],
  tickerItems: [
    { text: 'Coming soon', isAccent: true },
    { text: 'Build My Universee' },
    { text: 'Buy · Rent · Sell' },
    { text: 'Bengaluru' },
  ],
};
