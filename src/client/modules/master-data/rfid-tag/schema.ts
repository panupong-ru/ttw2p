import { z } from 'zod';

// Base schema for RFIDTag
const rfidTagSchema = z.object({
  DataID: z.string(),
  DataCenter: z.string().nullable(),
  RFIDTagID: z.string().nullable(),
  RFIDTagSerialNo: z.string().nullable(),
  CarRegister: z.string().min(1, 'ทะเบียนรถไม่สามารถเว้นว่างได้'),
  CarRegister2: z.string().nullable(),
  WeightTypeDataID: z.string().nullable(),
  CustomerDataID: z.string().nullable(),
  ProductDataID: z.string().nullable(),
  TransporterDataID: z.string().nullable(),
  DriverDataID: z.string().nullable(),
  SequenceWeightIn: z.string().nullable(),
  WeightDateIn: z.date().nullable(),
  WeightTimeIn: z.date().nullable(),
  WeightIn: z.number().nullable(),
  UserLogInDataIDIn: z.string().nullable(),
  TicketPrintCountIn: z.number().nullable(),
  SequenceWeightOut: z.string().nullable(),
  WeightDateOut: z.date().nullable(),
  WeightTimeOut: z.date().nullable(),
  WeightOut: z.number().nullable(),
  UserLogInDataIDOut: z.string().nullable(),
  TicketPrintCountOut: z.number().nullable(),
  Weight: z.number().nullable(),
  WeightAdjust: z.number().nullable(),
  AdjustPercent: z.number().nullable(),
  AdjustPercentWeight: z.number().nullable(),
  WeightAdjKey1: z.number().nullable(),
  WeightAdjCal1: z.number().nullable(),
  WeightAdjKey2: z.number().nullable(),
  WeightAdjCal2: z.number().nullable(),
  WeightAdjKey3: z.number().nullable(),
  WeightAdjCal3: z.number().nullable(),
  WeightNet: z.number().nullable(),
  ProductUnitDataID: z.string().nullable(),
  KgToUnit: z.number().nullable(),
  Price: z.number().nullable(),
  Tax: z.number().nullable(),
  Amount: z.number().nullable(),
  AmountAdjKey1: z.number().nullable(),
  AmountAdjCal1: z.number().nullable(),
  AmountAdjKey2: z.number().nullable(),
  AmountAdjCal2: z.number().nullable(),
  AmountAdjKey3: z.number().nullable(),
  AmountAdjCal3: z.number().nullable(),
  AmountNet: z.number().nullable(),
  Remark1: z.string().nullable(),
  Remark2: z.string().nullable(),
  Remark3: z.string().nullable(),
  Remark4: z.string().nullable(),
  FlagCancel: z.string().nullable(),
  HWID: z.string().nullable(),
  DataHash: z.bigint().nullable(),
});

// Form schema - เฉพาะฟิลด์ที่ Form มี
const rfidTagFormSchema = z.object({
  RFIDTagID: z.string().min(1, 'รหัส RFID Tag ไม่สามารถเว้นว่างได้'),
  RFIDTagSerialNo: z.string().min(1, 'Serial No. ไม่สามารถเว้นว่างได้'),
  CarRegister: z.string().min(1, 'ทะเบียนรถไม่สามารถเว้นว่างได้'),
  CarRegister2: z.string().nullable(),
  WeightTypeDataID: z.string().nullable(),
  CustomerDataID: z.string().nullable(),
  ProductDataID: z.string().nullable(),
  TransporterDataID: z.string().nullable(),
  DriverDataID: z.string().nullable(),
  WeightAdjKey1: z.number().nullable(),
  AmountAdjCal1: z.number().nullable(),
  WeightAdjKey2: z.number().nullable(),
  AmountAdjCal2: z.number().nullable(),
  WeightAdjKey3: z.number().nullable(),
  AmountAdjCal3: z.number().nullable(),
  Remark1: z.string().nullable(),
  Remark2: z.string().nullable(),
  Remark3: z.string().nullable(),
  Remark4: z.string().nullable(),
});

// Schema for creating new RFIDTag
export const createRFIDTagSchema = rfidTagFormSchema;

// Schema for updating RFIDTag
export const updateRFIDTagSchema = rfidTagSchema.partial();

// Type inference
export type RFIDTagSchema = z.infer<typeof rfidTagSchema>;
export type CreateRFIDTagSchema = z.infer<typeof createRFIDTagSchema>;
export type UpdateRFIDTagSchema = z.infer<typeof updateRFIDTagSchema>;
