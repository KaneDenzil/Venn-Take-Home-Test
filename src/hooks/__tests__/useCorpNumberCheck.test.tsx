import { renderHook, waitFor } from '@testing-library/react-native';
import { useCorpNumberCheck } from '../useCorpNumberCheck';

const mockFetch = jest.fn();
global.fetch = mockFetch as jest.MockedFunction<typeof fetch>;

describe('useCorpNumberCheck Hook', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    jest.clearAllMocks();
  });

  it('initializes with idle status', () => {
    const { result } = renderHook(() => useCorpNumberCheck());
    
    expect(result.current.status).toBe('idle');
    expect(result.current.message).toBeNull();
  });

  it('validates format - invalid when not 9 digits', async () => {
    const { result } = renderHook(() => useCorpNumberCheck());
    
    let isValid: boolean = false;
    await waitFor(async () => {
      isValid = await result.current.check('12345');
    });
    
    expect(isValid).toBe(false);
    await waitFor(() => {
      expect(result.current.status).toBe('invalid');
    });
    expect(result.current.message).toBe('Must be exactly 9 digits');
  });

  it('returns true for valid corporation number from API', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ corporationNumber: '123456789', valid: true }),
    });

    const { result } = renderHook(() => useCorpNumberCheck());
    
    let isValid: boolean = false;
    await waitFor(async () => {
      isValid = await result.current.check('123456789');
    });
    
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/corporation-number/123456789'),
      expect.any(Object)
    );
    expect(isValid).toBe(true);
    await waitFor(() => {
      expect(result.current.status).toBe('valid');
    });
    expect(result.current.message).toBeNull();
  });

  it('returns false for invalid corporation number from API', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ valid: false, message: 'Invalid corporation number' }),
    });

    const { result } = renderHook(() => useCorpNumberCheck());
    
    let isValid: boolean = false;
    await waitFor(async () => {
      isValid = await result.current.check('999999999');
    });
    
    expect(isValid).toBe(false);
    await waitFor(() => {
      expect(result.current.status).toBe('invalid');
    });
    expect(result.current.message).toBe('Invalid corporation number');
  });

  it('handles network errors gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useCorpNumberCheck());
    
    let isValid: boolean = false;
    await waitFor(async () => {
      isValid = await result.current.check('123456789');
    });
    
    expect(isValid).toBe(false);
    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });
    expect(result.current.message).toBe('Validation failed. Try again.');
  });

  it('resets to initial state', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ corporationNumber: '123456789', valid: true }),
    });

    const { result } = renderHook(() => useCorpNumberCheck());
    
    await waitFor(async () => {
      await result.current.check('123456789');
    });
    
    await waitFor(() => {
      expect(result.current.status).toBe('valid');
    });
    
    await waitFor(() => {
      result.current.reset();
    });
    
    await waitFor(() => {
      expect(result.current.status).toBe('idle');
    });
    expect(result.current.message).toBeNull();
  });
});

