import { z } from 'zod';

// Base schema for RFIDTag
export const rfidTagSchema = z.object({
  DataID: z.string().nullable(),
  DataCenter: z.string().nullable(),
  RFIDTagID: z.string().nullable(),
  RFIDTagSerialNo: z.string().nullable(),
  CarRegister: z.string().nullable(),
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
  WeightAdjKey1: z.number().nullable(),
  WeightAdjCal1: z.number().nullable(),
  WeightAdjKey2: z.number().nullable(),
  WeightAdjCal2: z.number().nullable(),
  WeightAdjKey3: z.number().nullable(),
  WeightAdjCal3: z.number().nullable(),
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
  FlagCancel: z.string().nullable(),
  HWID: z.string().nullable(),
  DataHash: z.bigint().nullable(),
});

// Schema for creating new RFIDTag
export const createRFIDTagSchema = rfidTagSchema;

// Schema for updating RFIDTag
export const updateRFIDTagSchema = rfidTagSchema.partial();

// Type inference
export type RFIDTagSchema = z.infer<typeof rfidTagSchema>;
export type CreateRFIDTagSchema = z.infer<typeof createRFIDTagSchema>;
export type UpdateRFIDTagSchema = z.infer<typeof updateRFIDTagSchema>;
