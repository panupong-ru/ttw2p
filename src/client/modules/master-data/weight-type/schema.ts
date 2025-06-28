import { z } from 'zod';

// Custom type for File or string
const fileSchema = z.union([z.custom<File>((value) => value instanceof File), z.string().nullable()]);

// Base schema for WeightType
const weightTypeSchema = z.object({
  DataID: z.string(),
  DataCenter: z.string().nullable(),
  WeightTypeID: z.string().min(1, 'รหัสประเภทชั่งไม่สามารถเว้นว่างได้'),
  WeightTypeName: z.string().min(1, 'ชื่อประเภทชั่งไม่สามารถเว้นว่างได้'),
  FileRegisterTicketIn: fileSchema.optional(),
  FileRegisterTicketOut: fileSchema.optional(),
  FileAutoRegisterTicketIn: fileSchema.optional(),
  FileAutoRegisterTicketOut: fileSchema.optional(),
  FileTicketIn: fileSchema.optional(),
  FileTicketOut: fileSchema.optional(),
  FileAutoTicketIn: fileSchema.optional(),
  FileAutoTicketOut: fileSchema.optional(),
  FileTicketRFIDTag: fileSchema.optional(),
  SequenceRegisterIn: z.string().nullable(),
  SequenceRegisterOut: z.string().nullable(),
  SequenceWeightIn: z.string().nullable(),
  SequenceWeightOut: z.string().nullable(),
  FlagPayment: z.string().nullable(),
  FlagCancel: z.string().nullable(),
  HWID: z.string().nullable(),
  DataHash: z.bigint().nullable(),
});

const weightTypeFormSchema = weightTypeSchema.omit({
  DataID: true,
  DataCenter: true,
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
