import { useCallback, useRef, useState } from 'react';
import { checkCorporationNumber } from '../utils/onboarding/api';

type Status = 'idle' | 'checking' | 'valid' | 'invalid' | 'error';

export function useCorpNumberCheck() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const ctrlRef = useRef<AbortController | null>(null);
  const lastValueRef = useRef<string>('');

  const check = useCallback(async (number: string) => {
    if (!/^\d{9}$/.test(number)) {
      setStatus('invalid');
      setMessage('Must be exactly 9 digits');
      return false;
    }

    ctrlRef.current?.abort();
    const ctrl = new AbortController();
    ctrlRef.current = ctrl;
    setStatus('checking');
    setMessage(null);
    lastValueRef.current = number;

    try {
      const res = await checkCorporationNumber(number, ctrl.signal);
      if (lastValueRef.current !== number) return false;
      if ('valid' in res && res.valid) {
        setStatus('valid');
        setMessage(null);
        return true;
      } else {
        setStatus('invalid');
        setMessage(res.message || 'Invalid corporation number');
        return false;
      }
    } catch {
      if (lastValueRef.current !== number) return false;
      setStatus('error');
      setMessage('Validation failed. Try again.');
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setMessage(null);
    ctrlRef.current?.abort();
    ctrlRef.current = null;
  }, []);

  return { status, message, check, reset };
}
