export type CorpCheckResponse =
  | { corporationNumber: string; valid: true }
  | { valid: false; message?: string };

const BASE_URL = 'https://fe-hometask-api.qa.vault.tryvault.com';

export async function checkCorporationNumber(number: string, signal?: AbortSignal): Promise<CorpCheckResponse> {
  const res = await fetch(`${BASE_URL}/corporation-number/${number}`, { signal });
  if (!res.ok) {
    return { valid: false, message: 'Validation failed. Try again.' };
  }
  const json = await res.json();
  return json as CorpCheckResponse;
}

export type ProfilePayload = {
  firstName: string;
  lastName: string;
  corporationNumber: string;
  phone: string;
};

export async function submitProfile(payload: ProfilePayload) {
  const res = await fetch(`${BASE_URL}/profile-details`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({ message: 'Submission failed' }));
    throw new Error(data.message || 'Submission failed');
  }
  return true;
}
