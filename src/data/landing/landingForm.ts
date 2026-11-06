import type { LandingFormSocial, LandingFormValues } from '@/types/landing';

export const landingFormSectionId = 'early-access';

export const landingFormIntro = {
  badge: 'Early access',
  headingStart: 'Be first in when',
  headingAccent: 'BMU',
  headingEnd: 'opens',
  description:
    "Tell us what you're looking for. We'll reach out before launch with properties that match.",
  benefits: [
    'First look at new listings',
    'List your property free at launch',
    'Launch updates only — no spam',
  ],
  socialHeading: 'Follow our journey',
  socials: [
    { label: 'Instagram', icon: 'instagram' },
    { label: 'Facebook', icon: 'facebook' },
    { label: 'LinkedIn', icon: 'linkedin' },
  ] satisfies LandingFormSocial[],
};

export const landingFormFields = {
  fullNameLabel: 'Full name',
  fullNamePlaceholder: 'Your name',
  mobileLabel: 'Mobile number',
  mobilePrefix: '+91',
  mobilePlaceholder: '98765 43210',
  emailLabel: 'Email',
  emailPlaceholder: 'you@example.com',
  optionalLabel: '(optional)',
  lookingToLabel: "I'm looking to",
  lookingToOptions: ['Buy', 'Rent', 'Sell / List property', 'Invest'],
  propertyTypeLabel: 'Property type',
  propertyTypeOptions: [
    'Apartment',
    'Villa / Independent house',
    'Plot',
    'Commercial space',
  ],
  preferredAreaLabel: 'Preferred area',
  preferredAreaPlaceholder: 'e.g. Whitefield',
  consentLabel:
    'I agree to be contacted by BMU by call, WhatsApp or email about the launch.',
  submitLabel: 'Get early access',
};

export const landingFormInitialValues: LandingFormValues = {
  fullName: '',
  mobile: '',
  email: '',
  lookingTo: landingFormFields.lookingToOptions[0],
  propertyType: landingFormFields.propertyTypeOptions[0],
  preferredArea: '',
  consent: false,
};

export const landingFormErrorMessages = {
  fullName: 'Please enter your name.',
  mobile: 'Please enter a 10-digit mobile number.',
  email: 'Please enter a valid email address.',
  consent: 'Please agree so we can contact you.',
};

export const landingFormConfirmation = {
  title: 'Thank you!',
  message:
    'Thanks for your interest in BMU. We will share more as launch gets closer.',
  closeLabel: 'Done',
};
