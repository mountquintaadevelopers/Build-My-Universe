export type LandingHeroStar = {
  left: string;
  top: string;
};

export type LandingHeroWindow = {
  points: string;
  delay: string;
};

export type LandingHeroContent = {
  badge: string;
  headingStart: string;
  headingAccent: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  ribbonGreenText: string;
  ribbonWhiteText: string;
  stars: LandingHeroStar[];
  buildingWindows: LandingHeroWindow[];
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
