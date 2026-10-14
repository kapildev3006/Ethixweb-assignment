import { z } from 'zod';

export const updateLeadStatusSchema = z.object({
  status: z.enum(['New', 'Contacted', 'Discovery', 'Proposal', 'Converted', 'Archived', 'Spam'], {
    errorMap: () => ({ message: 'Invalid lead status.' }),
  }),
});

export const addLeadNoteSchema = z.object({
  text: z
    .string()
    .min(2, { message: 'Note must be at least 2 characters.' })
    .max(2000, { message: 'Note cannot exceed 2000 characters.' })
    .trim(),
});

export const updateLeadDetailsSchema = z.object({
  fullName: z.string().min(2).max(100).trim().optional(),
  companyName: z.string().max(120).trim().optional(),
  phone: z.string().min(7).max(20).trim().optional(),
  service: z.string().min(1).optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});
