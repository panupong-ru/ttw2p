import { z } from 'zod';

// Base schema for Customer data
export const customerSchema = z.object({
  DataID: z.string(),
  DataCenter: z.string().nullable(),
  CustomerID: z.string().min(1, 'รหัสคู่ค้าไม่สามารถเว้นว่างได้'),
  CustomerName: z.string().min(1, 'ชื่อคู่ค้าไม่สามารถเว้นว่างได้'),
  Address1: z.string().nullable(),
  Address2: z.string().nullable(),
  SequenceWeightIn: z.string().nullable(),
  SequenceWeightOut: z.string().nullable(),
  FlagCancel: z.string().nullable(),
  HWID: z.string().nullable(),
  DataHash: z.bigint().nullable(),
});

// Schema for form data (excludes system fields)
export const customerFormSchema = customerSchema.omit({
  DataID: true,
  DataCenter: true,
  HWID: true,
  DataHash: true,
});

// Schema for creating new Customer
export const createCustomerSchema = customerFormSchema;

// Schema for updating Customer (all fields optional)
export const updateCustomerSchema = customerFormSchema.partial();

// Type inference
export type CustomerSchema = z.infer<typeof customerSchema>;
export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerSchema = z.infer<typeof updateCustomerSchema>;
