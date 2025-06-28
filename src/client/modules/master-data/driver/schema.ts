import { z } from 'zod';

// Base schema for WeightType
const driverSchema = z.object({
  DataID: z.string(),
  DataCenter: z.string().nullable(),
  DriverID: z.string().min(1, 'รหัสพนักงานขับรถไม่สามารถเว้นว่างได้'),
  DriverName: z.string().min(1, 'ชื่อพนักงานขับรถไม่สามารถเว้นว่างได้'),
  Address1: z.string().nullable(),
  Address2: z.string().nullable(),
  SequenceWeightIn: z.string().nullable(),
  SequenceWeightOut: z.string().nullable(),
  FlagCancel: z.string().nullable(),
  HWID: z.string().nullable(),
  DataHash: z.bigint().nullable(),
});

const driverFormSchema = driverSchema.omit({
  DataID: true,
  DataCenter: true,
  HWID: true,
  DataHash: true,
});

// Schema for creating new WeightType
export const createDriverSchema = driverFormSchema;

// Schema for updating WeightType
export const updateDriverSchema = driverSchema.partial();

// Type inference
export type DriverSchema = z.infer<typeof driverSchema>;
export type CreateDriverSchema = z.infer<typeof createDriverSchema>;
export type UpdateDriverSchema = z.infer<typeof updateDriverSchema>;
