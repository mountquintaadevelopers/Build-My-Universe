'use client';

import { landingFormFields } from '@/data/landing/landingForm';
import { useLandingForm } from '@/hooks/useLandingForm';
import LandingFormConfirmation from './LandingFormConfirmation';
import styles from './LandingForm.module.css';

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p className={styles.error} id={id}>
      {message}
    </p>
  );
}

export default function LandingFormFields() {
  const {
    values,
    errors,
    isConfirmationOpen,
    updateValue,
    handleSubmit,
    closeConfirmation,
  } = useLandingForm();
  const content = landingFormFields;

  return (
    <>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="fullName">
              {content.fullNameLabel}
            </label>
            <input
              className={styles.input}
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder={content.fullNamePlaceholder}
              value={values.fullName}
              onChange={(event) => updateValue('fullName', event.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullNameError' : undefined}
            />
            <FieldError id="fullNameError" message={errors.fullName} />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="mobile">
              {content.mobileLabel}
            </label>
            <div className={styles.mobileInput}>
              <span className={styles.mobilePrefix}>{content.mobilePrefix}</span>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={11}
                placeholder={content.mobilePlaceholder}
                value={values.mobile}
                onChange={(event) => updateValue('mobile', event.target.value)}
                aria-invalid={Boolean(errors.mobile)}
                aria-describedby={errors.mobile ? 'mobileError' : undefined}
              />
            </div>
            <FieldError id="mobileError" message={errors.mobile} />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            {content.emailLabel}{' '}
            <span className={styles.optional}>{content.optionalLabel}</span>
          </label>
          <input
            className={styles.input}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={content.emailPlaceholder}
            value={values.email}
            onChange={(event) => updateValue('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'emailError' : undefined}
          />
          <FieldError id="emailError" message={errors.email} />
        </div>

        <fieldset className={styles.chips}>
          <legend className={styles.label}>{content.lookingToLabel}</legend>
          <div className={styles.chipList}>
            {content.lookingToOptions.map((option) => (
              <label className={styles.chip} key={option}>
                <input
                  className={styles.chipInput}
                  type="radio"
                  name="lookingTo"
                  value={option}
                  checked={values.lookingTo === option}
                  onChange={() => updateValue('lookingTo', option)}
                />
                <span className={styles.chipLabel}>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="propertyType">
              {content.propertyTypeLabel}
            </label>
            <select
              className={`${styles.input} ${styles.select}`}
              id="propertyType"
              name="propertyType"
              value={values.propertyType}
              onChange={(event) => updateValue('propertyType', event.target.value)}
            >
              {content.propertyTypeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="preferredArea">
              {content.preferredAreaLabel}{' '}
              <span className={styles.optional}>{content.optionalLabel}</span>
            </label>
            <input
              className={styles.input}
              id="preferredArea"
              name="preferredArea"
              type="text"
              placeholder={content.preferredAreaPlaceholder}
              value={values.preferredArea}
              onChange={(event) => updateValue('preferredArea', event.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={styles.consent}>
            <input
              className={styles.consentInput}
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(event) => updateValue('consent', event.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? 'consentError' : undefined}
            />
            {content.consentLabel}
          </label>
          <FieldError id="consentError" message={errors.consent} />
        </div>

        <button type="submit" className={styles.submit}>
          {content.submitLabel}
          <svg
            className={styles.submitArrow}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 12h16M14 6l6 6-6 6" />
          </svg>
        </button>
      </form>

      <LandingFormConfirmation isOpen={isConfirmationOpen} onClose={closeConfirmation} />
    </>
  );
}
