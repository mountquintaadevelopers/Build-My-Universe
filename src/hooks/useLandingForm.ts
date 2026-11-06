'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  landingFormErrorMessages,
  landingFormInitialValues,
} from '@/data/landing/landingForm';
import type {
  LandingFormErrorField,
  LandingFormErrors,
  LandingFormValues,
} from '@/types/landing';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateLandingForm(values: LandingFormValues): LandingFormErrors {
  const errors: LandingFormErrors = {};
  const email = values.email.trim();

  if (!values.fullName.trim()) errors.fullName = landingFormErrorMessages.fullName;
  if (!/^\d{10}$/.test(values.mobile.replace(/\s/g, ''))) {
    errors.mobile = landingFormErrorMessages.mobile;
  }
  if (email && !emailPattern.test(email)) errors.email = landingFormErrorMessages.email;
  if (!values.consent) errors.consent = landingFormErrorMessages.consent;

  return errors;
}

export function useLandingForm() {
  const [values, setValues] = useState(landingFormInitialValues);
  const [errors, setErrors] = useState<LandingFormErrors>({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  function updateValue<Field extends keyof LandingFormValues>(
    field: Field,
    value: LandingFormValues[Field],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const { [field as LandingFormErrorField]: _cleared, ...remaining } = current;
      return remaining;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateLandingForm(values);
    setErrors(nextErrors);

    const [firstInvalidField] = Object.keys(nextErrors);
    if (firstInvalidField) {
      const field = event.currentTarget.elements.namedItem(firstInvalidField);
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    setIsConfirmationOpen(true);
  }

  function closeConfirmation() {
    setIsConfirmationOpen(false);
    setValues(landingFormInitialValues);
  }

  return {
    values,
    errors,
    isConfirmationOpen,
    updateValue,
    handleSubmit,
    closeConfirmation,
  };
}
