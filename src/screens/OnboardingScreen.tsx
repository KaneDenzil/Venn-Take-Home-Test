import React from 'react';
import { FormTemplate } from '../components/templates/FormTemplate';
import { OnboardingForm } from '../components/organisms/OnboardingForm';

export const OnboardingScreen: React.FC = () => {
  return (
    <FormTemplate title="Onboarding Form">
      <OnboardingForm />
    </FormTemplate>
  );
};
