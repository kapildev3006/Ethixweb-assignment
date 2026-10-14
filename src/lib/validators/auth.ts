import { z } from 'zod';

export const adminLoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid administrator email address.' })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
  rememberMe: z.boolean().optional(),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
