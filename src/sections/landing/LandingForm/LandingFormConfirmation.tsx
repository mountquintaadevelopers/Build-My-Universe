'use client';

import { useEffect, useRef } from 'react';
import { landingFormConfirmation } from '@/data/landing/landingForm';
import styles from './LandingForm.module.css';

type LandingFormConfirmationProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LandingFormConfirmation({
  isOpen,
  onClose,
}: LandingFormConfirmationProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { title, message, closeLabel } = landingFormConfirmation;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.confirmation}
      aria-labelledby="landingFormConfirmationTitle"
      onClose={onClose}
    >
      <svg className={styles.confirmationIcon} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="currentColor" />
        <path
          d="M7 12.5l3.4 3.4L17 9"
          fill="none"
          stroke="#1c1c1c"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className={styles.confirmationTitle} id="landingFormConfirmationTitle">
        {title}
      </h3>
      <p className={styles.confirmationMessage}>{message}</p>
      <button type="button" className={styles.confirmationClose} onClick={onClose}>
        {closeLabel}
      </button>
    </dialog>
  );
}
