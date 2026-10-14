import { z } from 'zod';

export const enquirySchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(100, { message: 'Name cannot exceed 100 characters.' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Please enter a valid business email address.' })
    .max(120, { message: 'Email cannot exceed 120 characters.' })
    .trim(),
  phone: z
    .string()
    .min(7, { message: 'Phone number must be at least 7 digits.' })
    .max(20, { message: 'Phone number cannot exceed 20 characters.' })
    .regex(/^[0-9+\s\-()]+$/, { message: 'Please enter a valid phone number (e.g. +91 98765 43210).' })
    .trim(),
  companyName: z
    .string()
    .max(120, { message: 'Company name cannot exceed 120 characters.' })
    .optional()
    .or(z.literal('')),
  service: z
    .string()
    .min(1, { message: 'Please select a primary service of interest.' }),
  budget: z
    .string()
    .optional()
    .or(z.literal('')),
  timeline: z
    .string()
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, { message: 'Please provide at least 10 characters describing your project or goals.' })
    .max(3000, { message: 'Project description cannot exceed 3000 characters.' })
    .trim(),
  privacyAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must acknowledge our privacy terms to proceed.',
    }),
  // Anti-spam honeypot (must be empty)
  website_url_hp: z.string().max(0, { message: 'Spam detected.' }).optional(),
  // Timestamp check
  form_load_time: z.number().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
