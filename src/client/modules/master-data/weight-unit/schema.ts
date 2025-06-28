import { z } from 'zod';

// Base schema for WeightUnit
const weightUnitSchema = z.object({
  DataID: z.string(),
  DataCenter: z.string().nullable(),
  WeightUnitID: z.string().min(1, 'รหัสหน่วยราคาไม่สามารถเว้นว่างได้'),
  WeightUnitName: z.string().min(1, 'ชื่อหน่วยราคาไม่สามารถเว้นว่างได้'),
  KgToUnit: z.coerce.number().optional().nullable(),
  FlagCancel: z.string().optional().nullable(),
  HWID: z.string().optional().nullable(),
  DataHash: z.bigint().optional().nullable(),
});

// Form schema (exclude auto-generated fields)
const weightUnitFormSchema = weightUnitSchema.omit({
  DataID: true,
  DataCenter: true,
  HWID: true,
  DataHash: true,
});

// Schema for creating new Product
export const createWeightUnitSchema = weightUnitFormSchema;

// Schema for updating Product
export const updateWeightUnitSchema = weightUnitSchema.partial();

// Type inference
export type WeightUnitSchema = z.infer<typeof weightUnitSchema>;
export type CreateWeightUnitSchema = z.infer<typeof createWeightUnitSchema>;
export type UpdateWeightUnitSchema = z.infer<typeof updateWeightUnitSchema>;

// Form data type for React Hook Form
export type WeightUnitFormData = CreateWeightUnitSchema;
