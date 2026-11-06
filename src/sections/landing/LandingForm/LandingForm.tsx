import { Plus_Jakarta_Sans } from 'next/font/google';
import { landingFormSectionId } from '@/data/landing/landingForm';
import LandingFormFields from './LandingFormFields';
import LandingFormIntro from './LandingFormIntro';
import styles from './LandingForm.module.css';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function LandingForm() {
  return (
    <section
      id={landingFormSectionId}
      className={`${styles.section} ${plusJakartaSans.className}`}
    >
      <div className={styles.inner}>
        <LandingFormIntro />
        <LandingFormFields />
      </div>
    </section>
  );
}
