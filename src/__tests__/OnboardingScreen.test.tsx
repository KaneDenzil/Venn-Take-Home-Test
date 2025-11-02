import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { Alert } from 'react-native';

const mockFetch = jest.fn();
global.fetch = mockFetch as any;

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('OnboardingScreen Integration Tests', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    jest.clearAllMocks();
  });

  it('renders all form fields correctly', () => {
    const { getByTestId } = render(<OnboardingScreen />);
    expect(getByTestId('firstNameInput')).toBeTruthy();
    expect(getByTestId('lastNameInput')).toBeTruthy();
    expect(getByTestId('phoneInput')).toBeTruthy();
    expect(getByTestId('corpInput')).toBeTruthy();
    expect(getByTestId('submitButton')).toBeTruthy();
  });

  it('validates first name - required field', async () => {
    const { getByTestId, findByText } = render(<OnboardingScreen />);
    
    fireEvent.changeText(getByTestId('firstNameInput'), '');
    fireEvent(getByTestId('firstNameInput'), 'onBlur');
    
    await waitFor(() => {
      expect(screen.queryByText(/first name is required/i)).toBeTruthy();
    });
  });

  it('validates first name - max 50 characters', async () => {
    const { getByTestId } = render(<OnboardingScreen />);
    const longName = 'a'.repeat(51);
    
    fireEvent.changeText(getByTestId('firstNameInput'), longName);
    fireEvent(getByTestId('firstNameInput'), 'onBlur');
    
    await waitFor(() => {
      expect(screen.queryByText(/max 50 characters/i)).toBeTruthy();
    });
  });

  it('validates last name - required field', async () => {
    const { getByTestId } = render(<OnboardingScreen />);
    
    fireEvent.changeText(getByTestId('lastNameInput'), '');
    fireEvent(getByTestId('lastNameInput'), 'onBlur');
    
    await waitFor(() => {
      expect(screen.queryByText(/last name is required/i)).toBeTruthy();
    });
  });

  it('validates phone number - must start with +1', async () => {
    const { getByTestId } = render(<OnboardingScreen />);
    
    fireEvent.changeText(getByTestId('phoneInput'), '4165551234');
    fireEvent(getByTestId('phoneInput'), 'onBlur');
    
    await waitFor(() => {
      expect(screen.queryByText(/use \+1 followed by 10 digits/i)).toBeTruthy();
    });
  });

  it('validates phone number - correct format', async () => {
    const { getByTestId } = render(<OnboardingScreen />);
    
    fireEvent.changeText(getByTestId('phoneInput'), '+14165551234');
    fireEvent(getByTestId('phoneInput'), 'onBlur');
    
    await waitFor(() => {
      expect(screen.queryByText(/use \+1 followed by 10 digits/i)).toBeFalsy();
    });
  });

  it('validates corporation number - must be 9 digits', async () => {
    const { getByTestId } = render(<OnboardingScreen />);
    
    fireEvent.changeText(getByTestId('corpInput'), '12345');
    fireEvent(getByTestId('corpInput'), 'onBlur');
    
    await waitFor(() => {
      expect(screen.queryByText(/must be exactly 9 digits/i)).toBeTruthy();
    });
  });

  it('validates corporation number via API - valid number', async () => {
    const { getByTestId } = render(<OnboardingScreen />);
    
    mockFetch.mockResolvedValueOnce({ 
      ok: true, 
      json: async () => ({ corporationNumber: '123456789', valid: true }) 
    });

    fireEvent.changeText(getByTestId('corpInput'), '123456789');
    fireEvent(getByTestId('corpInput'), 'onBlur');
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/corporation-number/123456789'), 
        expect.any(Object)
      );
    });
  });

  it('validates corporation number via API - invalid number', async () => {
    const { getByTestId } = render(<OnboardingScreen />);
    
    mockFetch.mockResolvedValueOnce({ 
      ok: true, 
      json: async () => ({ valid: false, message: 'Invalid corporation number' }) 
    });

    fireEvent.changeText(getByTestId('corpInput'), '999999999');
    fireEvent(getByTestId('corpInput'), 'onBlur');
    
    await waitFor(() => {
      expect(screen.queryByText(/invalid corporation number/i)).toBeTruthy();
    });
  });

  it('submits form successfully with valid data', async () => {
    const { getByTestId } = render(<OnboardingScreen />);

    // Fill all fields
    fireEvent.changeText(getByTestId('firstNameInput'), 'Jane');
    fireEvent.changeText(getByTestId('lastNameInput'), 'Doe');
    fireEvent.changeText(getByTestId('phoneInput'), '+14165551234');
    fireEvent.changeText(getByTestId('corpInput'), '123456789');

    // Mock corporation number validation
    mockFetch.mockResolvedValueOnce({ 
      ok: true, 
      json: async () => ({ corporationNumber: '123456789', valid: true }) 
    });

    fireEvent(getByTestId('corpInput'), 'onBlur');
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/corporation-number/123456789'), 
        expect.any(Object)
      );
    });

    // Mock form submission
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    fireEvent.press(getByTestId('submitButton'));
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/profile-details'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: 'Jane',
            lastName: 'Doe',
            phone: '+14165551234',
            corporationNumber: '123456789',
          }),
        })
      );
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Success', expect.any(String));
    });
  });

  it('shows error on form submission failure', async () => {
    const { getByTestId } = render(<OnboardingScreen />);

    // Fill all fields
    fireEvent.changeText(getByTestId('firstNameInput'), 'Jane');
    fireEvent.changeText(getByTestId('lastNameInput'), 'Doe');
    fireEvent.changeText(getByTestId('phoneInput'), '+14165551234');
    fireEvent.changeText(getByTestId('corpInput'), '123456789');

    // Mock corporation number validation success
    mockFetch.mockResolvedValueOnce({ 
      ok: true, 
      json: async () => ({ corporationNumber: '123456789', valid: true }) 
    });

    fireEvent(getByTestId('corpInput'), 'onBlur');
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    // Mock form submission failure
    mockFetch.mockResolvedValueOnce({ 
      ok: false, 
      json: async () => ({ message: 'Invalid phone number' }) 
    });

    fireEvent.press(getByTestId('submitButton'));
    
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Submission failed', expect.any(String));
    });
  });

  it('disables submit button while form is invalid', () => {
    const { getByTestId } = render(<OnboardingScreen />);
    const submitButton = getByTestId('submitButton');
    
    expect(submitButton.props.accessibilityState.disabled).toBe(true);
  });

  it('enables submit button when all fields are valid', async () => {
    const { getByTestId } = render(<OnboardingScreen />);

    fireEvent.changeText(getByTestId('firstNameInput'), 'Jane');
    fireEvent.changeText(getByTestId('lastNameInput'), 'Doe');
    fireEvent.changeText(getByTestId('phoneInput'), '+14165551234');
    fireEvent.changeText(getByTestId('corpInput'), '123456789');

    // Mock valid corporation number
    mockFetch.mockResolvedValueOnce({ 
      ok: true, 
      json: async () => ({ corporationNumber: '123456789', valid: true }) 
    });

    fireEvent(getByTestId('corpInput'), 'onBlur');
    
    await waitFor(() => {
      const submitButton = getByTestId('submitButton');
      expect(submitButton.props.accessibilityState.disabled).toBe(false);
    });
  });
});
