import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { OnboardingForm } from '../OnboardingForm';
import { Alert } from 'react-native';

const mockFetch = jest.fn();
global.fetch = mockFetch as jest.MockedFunction<typeof fetch>;

jest.spyOn(Alert, 'alert');

describe('OnboardingForm', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    const { getByTestId } = render(<OnboardingForm />);
    expect(getByTestId('firstNameInput')).toBeTruthy();
    expect(getByTestId('lastNameInput')).toBeTruthy();
    expect(getByTestId('phoneInput')).toBeTruthy();
    expect(getByTestId('corpInput')).toBeTruthy();
    expect(getByTestId('submitButton')).toBeTruthy();
  });

  it('validates required fields', async () => {
    const { getByTestId } = render(<OnboardingForm />);
    
    fireEvent.changeText(getByTestId('firstNameInput'), '');
    fireEvent(getByTestId('firstNameInput'), 'onBlur');
    
    await waitFor(() => {
      expect(screen.queryByText(/first name is required/i)).toBeTruthy();
    });
  });

  it('validates corporation number via API', async () => {
    const { getByTestId } = render(<OnboardingForm />);
    
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

  it('shows error for invalid corporation number', async () => {
    const { getByTestId } = render(<OnboardingForm />);
    
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
    const { getByTestId } = render(<OnboardingForm />);

    fireEvent.changeText(getByTestId('firstNameInput'), 'Jane');
    fireEvent.changeText(getByTestId('lastNameInput'), 'Doe');
    fireEvent.changeText(getByTestId('phoneInput'), '+14165551234');
    fireEvent.changeText(getByTestId('corpInput'), '123456789');

    mockFetch.mockResolvedValueOnce({ 
      ok: true, 
      json: async () => ({ corporationNumber: '123456789', valid: true }) 
    });

    fireEvent(getByTestId('corpInput'), 'onBlur');
    
    await waitFor(() => {
      const submitButton = getByTestId('submitButton');
      expect(submitButton.props.accessibilityState.disabled).toBe(false);
    });

    mockFetch.mockResolvedValueOnce({ 
      ok: true, 
      json: async () => ({ corporationNumber: '123456789', valid: true }) 
    });

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

  it('handles submission failure', async () => {
    const { getByTestId } = render(<OnboardingForm />);

    fireEvent.changeText(getByTestId('firstNameInput'), 'Jane');
    fireEvent.changeText(getByTestId('lastNameInput'), 'Doe');
    fireEvent.changeText(getByTestId('phoneInput'), '+14165551234');
    fireEvent.changeText(getByTestId('corpInput'), '123456789');

    mockFetch.mockResolvedValueOnce({ 
      ok: true, 
      json: async () => ({ corporationNumber: '123456789', valid: true }) 
    });

    fireEvent(getByTestId('corpInput'), 'onBlur');
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      const submitButton = getByTestId('submitButton');
      expect(submitButton.props.accessibilityState.disabled).toBe(false);
    });

    mockFetch.mockResolvedValueOnce({ 
      ok: true, 
      json: async () => ({ corporationNumber: '123456789', valid: true }) 
    });

    mockFetch.mockResolvedValueOnce({ 
      ok: false, 
      json: async () => ({ message: 'Invalid phone number' }) 
    });

    fireEvent.press(getByTestId('submitButton'));
    
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Submission failed', expect.any(String));
    });
  });
});

