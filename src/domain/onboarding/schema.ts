import { z } from 'zod';

export const onboardingSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'Max 50 characters'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Max 50 characters'),
  phone: z.string().regex(/^\+1\d{10}$/, 'Use +1 followed by 10 digits'),
  corporationNumber: z.string().regex(/^\d{9}$/, 'Must be exactly 9 digits'),
});

export type OnboardingForm = z.infer<typeof onboardingSchema>;
