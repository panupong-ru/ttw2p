import { z } from 'zod';

// Base schema for Product
const productSchema = z.object({
  DataID: z.string(),
  DataCenter: z.string().nullable(),
  ProductID: z.string().min(1, 'รหัสสินค้าไม่สามารถเว้นว่างได้'),
  ProductName: z.string().min(1, 'ชื่อสินค้าไม่สามารถเว้นว่างได้'),
  ProductUnitDataID: z.string().optional().nullable(),
  Price: z.coerce.number().optional().nullable(),
  SequenceWeightIn: z.string().optional().nullable(),
  SequenceWeightOut: z.string().optional().nullable(),
  FlagCancel: z.string().optional().nullable(),
  HWID: z.string().optional().nullable(),
  DataHash: z.bigint().optional().nullable(),
});

// Form schema (exclude auto-generated fields)
const productFormSchema = productSchema.omit({
  DataID: true,
  DataCenter: true,
  HWID: true,
  DataHash: true,
});

// Schema for creating new Product
export const createProductSchema = productFormSchema;

// Schema for updating Product
export const updateProductSchema = productSchema.partial();

// Type inference
export type ProductSchema = z.infer<typeof productSchema>;
export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;

// Form data type for React Hook Form
export type ProductFormData = CreateProductSchema;
