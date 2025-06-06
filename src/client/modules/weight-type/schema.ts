import { z } from 'zod';

// Base schema for WeightType
const weightTypeSchema = z.object({
  DataID: z.number(),
  WeightTypeID: z.string().min(1, 'รหัสประเภทชั่งไม่สามารถเว้นว่างได้'),
  WeightTypeName: z.string().min(1, 'ชื่อประเภทชั่งไม่สามารถเว้นว่างได้'),
  FileRegisterTicketIn: z.string().optional(),
  FileRegisterTicketOut: z.string().optional(),
  FileAutoRegisterTicketIn: z.string().optional(),
  FileAutoRegisterTicketOut: z.string().optional(),
  FileTicketIn: z.string().optional(),
  FileTicketOut: z.string().optional(),
  FileAutoTicketIn: z.string().optional(),
  FileAutoTicketOut: z.string().optional(),
  FileTicketRFIDTag: z.string().optional(),
  SequenceRegisterIn: z.string().optional(),
  SequenceRegisterOut: z.string().optional(),
  SequenceWeightIn: z.string().optional(),
  SequenceWeightOut: z.string().optional(),
  FlagPayment: z.string().optional(),
  FlagCancel: z.string().optional(),
  HWID: z.string().optional(),
  DataHash: z.number().optional(),
});

const weightTypeFormSchema = weightTypeSchema.omit({
  DataID: true,
  HWID: true,
  DataHash: true,
});

// Schema for creating new WeightType
export const createWeightTypeSchema = weightTypeFormSchema;

// Schema for updating WeightType
export const updateWeightTypeSchema = weightTypeSchema.partial();

// Type inference
export type WeightTypeSchema = z.infer<typeof weightTypeSchema>;
export type CreateWeightTypeSchema = z.infer<typeof createWeightTypeSchema>;
export type UpdateWeightTypeSchema = z.infer<typeof updateWeightTypeSchema>;
