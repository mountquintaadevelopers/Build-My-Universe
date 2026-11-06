export type LandingHeroCalloutZone = 'homes' | 'plots' | 'commercial';

export type LandingHeroTitleRow = {
  label: string;
  value: string;
  isAccent?: boolean;
};

export type LandingHeroTickerItem = {
  text: string;
  isAccent?: boolean;
};

export type LandingHeroContent = {
  badge: string;
  headingStart: string;
  headingAccent: string;
  rulerLabel: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  services: string;
  callouts: Record<LandingHeroCalloutZone, string>;
  floorsLabel: string;
  plotLabel: string;
  plotWidthLabel: string;
  plotDepthLabel: string;
  compassLabel: string;
  titleRows: LandingHeroTitleRow[];
  tickerItems: LandingHeroTickerItem[];
};

export type LandingFormValues = {
  fullName: string;
  mobile: string;
  email: string;
  lookingTo: string;
  propertyType: string;
  preferredArea: string;
  consent: boolean;
};

export type LandingFormErrorField = 'fullName' | 'mobile' | 'email' | 'consent';

export type LandingFormErrors = Partial<Record<LandingFormErrorField, string>>;

export type LandingFormSocialIcon = 'instagram' | 'facebook' | 'linkedin';

export type LandingFormSocial = {
  label: string;
  icon: LandingFormSocialIcon;
};
