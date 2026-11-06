import { landingFormIntro } from '@/data/landing/landingForm';
import type { LandingFormSocialIcon } from '@/types/landing';
import styles from './LandingForm.module.css';

const socialIcons: Record<LandingFormSocialIcon, React.ReactNode> = {
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.6" cy="7.4" r="1.2" fill="currentColor" />
    </>
  ),
  facebook: (
    <path
      fill="currentColor"
      d="M13.5 21v-7.5h2.6l.4-3h-3V8.7c0-.9.3-1.5 1.5-1.5h1.6V4.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.1H7.8v3h2.6V21h3.1z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      d="M5 9.5h3V19H5V9.5zM6.5 5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM10.5 9.5h2.9v1.3c.5-.8 1.5-1.5 3-1.5 3 0 3.6 2 3.6 4.5V19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3.2V9.5z"
    />
  ),
};

export default function LandingFormIntro() {
  const {
    badge,
    headingStart,
    headingAccent,
    headingEnd,
    description,
    benefits,
    socialHeading,
    socials,
  } = landingFormIntro;

  return (
    <div className={styles.intro}>
      <p className={styles.badge}>
        <span className={styles.badgeDot} aria-hidden="true" />
        {badge}
      </p>

      <h2 className={styles.heading}>
        {headingStart} <span className={styles.headingAccent}>{headingAccent}</span>{' '}
        {headingEnd}
      </h2>

      <p className={styles.description}>{description}</p>

      <ul className={styles.benefits}>
        {benefits.map((benefit) => (
          <li className={styles.benefit} key={benefit}>
            <svg className={styles.benefitIcon} viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="12" fill="currentColor" />
              <path
                d="M7 12.5l3.4 3.4L17 9"
                fill="none"
                stroke="#1c1c1c"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {benefit}
          </li>
        ))}
      </ul>

      <div className={styles.social}>
        <p className={styles.socialHeading}>{socialHeading}</p>
        <div className={styles.socialIcons}>
          {socials.map((social) => (
            <span className={styles.socialIcon} key={social.icon}>
              <svg viewBox="0 0 24 24" role="img" aria-label={social.label}>
                {socialIcons[social.icon]}
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
