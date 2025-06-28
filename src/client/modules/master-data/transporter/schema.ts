import { z } from 'zod';

// Base schema for WeightType
const transporterSchema = z.object({
  DataID: z.string(),
  DataCenter: z.string().nullable(),
  TransporterID: z.string().min(1, 'รหัสผู้ขนส่งไม่สามารถเว้นว่างได้'),
  TransporterName: z.string().min(1, 'ชื่อผู้ขนส่งไม่สามารถเว้นว่างได้'),
  Address1: z.string().nullable(),
  Address2: z.string().nullable(),
  SequenceWeightIn: z.string().nullable(),
  SequenceWeightOut: z.string().nullable(),
  FlagCancel: z.string().nullable(),
  HWID: z.string().nullable(),
  DataHash: z.bigint().nullable(),
});

const transporterFormSchema = transporterSchema.omit({
  DataID: true,
  DataCenter: true,
  HWID: true,
  DataHash: true,
});

// Schema for creating new WeightType
export const createTransporterSchema = transporterFormSchema;

// Schema for updating WeightType
export const updateTransporterSchema = transporterSchema.partial();

// Type inference
export type TransporterSchema = z.infer<typeof transporterSchema>;
export type CreateTransporterSchema = z.infer<typeof createTransporterSchema>;
export type UpdateTransporterSchema = z.infer<typeof updateTransporterSchema>;
