import { z } from 'zod';

// Base schema for Truck
const truckSchema = z.object({
  DataID: z.string(),
  DataCenter: z.string().nullable(),
  CarRegister: z.string().min(1, 'ทะเบียนรถไม่สามารถเว้นว่างได้'),
  CarRegister2: z.string().nullable(),
  WeightTypeDataID: z.string().nullable(),
  CustomerDataID: z.string().nullable(),
  ProductDataID: z.string().nullable(),
  TransporterDataID: z.string().nullable(),
  DriverDataID: z.string().nullable(),
  SequenceWeight: z.string().nullable(),
  WeightDate: z.date().nullable(),
  WeightTime: z.date().nullable(),
  Weight: z.number().nullable(),
  UserLogInDataID: z.string().nullable(),
  WeightScaleID: z.string().nullable(),
  WeightAdjKey1: z.number().nullable().optional(),
  WeightAdjCal1: z.number().nullable().optional(),
  WeightAdjKey2: z.number().nullable().optional(),
  WeightAdjCal2: z.number().nullable().optional(),
  WeightAdjKey3: z.number().nullable().optional(),
  WeightAdjCal3: z.number().nullable().optional(),
  ProductUnitDataID: z.string().nullable(),
  Price: z.number().nullable(),
  Tax: z.number().nullable(),
  AmountAdjKey1: z.number().nullable(),
  AmountAdjCal1: z.number().nullable(),
  AmountAdjKey2: z.number().nullable(),
  AmountAdjCal2: z.number().nullable(),
  AmountAdjKey3: z.number().nullable(),
  AmountAdjCal3: z.number().nullable(),
  Remark1: z.string().nullable(),
  Remark2: z.string().nullable(),
  Remark3: z.string().nullable(),
  Remark4: z.string().nullable(),
  FlagAutoSave: z.string().nullable(),
  FlagPlatformEdgeSensor: z.string().nullable(),
  FlagCancel: z.string().nullable(),
  HWID: z.string().nullable(),
  DataHash: z.bigint().nullable(),
});

// Form schema - เฉพาะฟิลด์ที่ Form มี
const truckFormSchema = z.object({
  CarRegister: z.string().min(1, 'ทะเบียนรถไม่สามารถเว้นว่างได้'),
  WeightTypeDataID: z.string().nullable().optional(),
  CustomerDataID: z.string().nullable().optional(),
  ProductDataID: z.string().nullable().optional(),
  TransporterDataID: z.string().nullable().optional(),
  DriverDataID: z.string().nullable().optional(),
  WeightAdjKey1: z.number().nullable().optional(),
  WeightAdjCal1: z.number().nullable().optional(),
  WeightAdjKey2: z.number().nullable().optional(),
  WeightAdjCal2: z.number().nullable().optional(),
  WeightAdjKey3: z.number().nullable().optional(),
  WeightAdjCal3: z.number().nullable().optional(),
  AmountAdjCal1: z.number().nullable().optional(),
  AmountAdjCal2: z.number().nullable().optional(),
  AmountAdjCal3: z.number().nullable().optional(),
  Remark1: z.string().nullable().optional(),
  Remark2: z.string().nullable().optional(),
  Remark3: z.string().nullable().optional(),
});

// Schema for creating new Truck
export const createTruckSchema = truckFormSchema;

// Schema for updating Truck
export const updateTruckSchema = truckSchema.partial();

// Type inference
export type TruckSchema = z.infer<typeof truckSchema>;
export type CreateTruckSchema = z.infer<typeof createTruckSchema>;
export type UpdateTruckSchema = z.infer<typeof updateTruckSchema>;
