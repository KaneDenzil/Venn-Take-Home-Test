import React from 'react';
import { render } from '@testing-library/react-native';
import { OnboardingScreen } from '../OnboardingScreen';

jest.mock('../../components/organisms/OnboardingForm', () => ({
  OnboardingForm: () => null,
}));

describe('OnboardingScreen Tests', () => {
  describe('Screen Rendering', () => {
    it('renders the screen with correct title', () => {
      const { getByText } = render(<OnboardingScreen />);
      expect(getByText('Onboarding Form')).toBeTruthy();
    });

    it('renders without crashing', () => {
      const { root } = render(<OnboardingScreen />);
      expect(root).toBeTruthy();
    });
  });
});

