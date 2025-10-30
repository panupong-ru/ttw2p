import { prisma } from '@/core/libs/prisma';
import type {
  Weight,
  WeightType,
  Customer,
  Product,
  Transporter,
  Driver,
  WeightUnit,
  UserLogIn,
  Truck,
  RFIDTag,
} from '@/../prisma-client';
import { parseNumber } from '@/core/utils/number-format';
import { parseDate } from '@/core/utils/date-format';
import { getHWID } from '@/core/utils/hardware';

// Type for included relations
type WeightWithRelations = Weight & {
  WeightType: Pick<WeightType, 'DataID' | 'WeightTypeID' | 'WeightTypeName' | 'FlagCancel'> | null;
  Customer: Pick<Customer, 'DataID' | 'CustomerID' | 'CustomerName' | 'Address1' | 'Address2' | 'FlagCancel'> | null;
  Product: Pick<Product, 'DataID' | 'ProductID' | 'ProductName' | 'Price' | 'FlagCancel'> | null;
  Transporter: Pick<
    Transporter,
    'DataID' | 'TransporterID' | 'TransporterName' | 'Address1' | 'Address2' | 'FlagCancel'
  > | null;
  Driver: Pick<Driver, 'DataID' | 'DriverID' | 'DriverName' | 'Address1' | 'Address2' | 'FlagCancel'> | null;
  ProductUnit: Pick<WeightUnit, 'DataID' | 'WeightUnitID' | 'WeightUnitName' | 'KgToUnit' | 'FlagCancel'> | null;
  Truck: Pick<Truck, 'DataID' | 'CarRegister' | 'CarRegister2' | 'FlagCancel'> | null;
  RFIDTag: Pick<RFIDTag, 'DataID' | 'RFIDTagID' | 'RFIDTagSerialNo' | 'FlagCancel'> | null;
  UserLogInIn: Pick<UserLogIn, 'DataID' | 'LogInName' | 'FullName' | 'FlagCancel'> | null;
  UserLogInOut: Pick<UserLogIn, 'DataID' | 'LogInName' | 'FullName' | 'FlagCancel'> | null;
  UserLogInRegisterIn: Pick<UserLogIn, 'DataID' | 'LogInName' | 'FullName' | 'FlagCancel'> | null;
  UserLogInRegisterOut: Pick<UserLogIn, 'DataID' | 'LogInName' | 'FullName' | 'FlagCancel'> | null;
  PaymentUserLogIn: Pick<UserLogIn, 'DataID' | 'LogInName' | 'FullName' | 'FlagCancel'> | null;
  WeightNetApproveUserLogIn: Pick<UserLogIn, 'DataID' | 'LogInName' | 'FullName' | 'FlagCancel'> | null;
};

// Type for table display data
type WeightDisplay = WeightWithRelations & {
  WeightTypeDataName: string | null;
  CustomerDataName: string | null;
  ProductDataName: string | null;
  TransporterDataName: string | null;
  DriverDataName: string | null;
  ProductUnitDataName: string | null;
  TruckDataName: string | null;
  RFIDTagDataName: string | null;
  UserLogInInDataName: string | null;
  UserLogInOutDataName: string | null;
  UserLogInRegisterInDataName: string | null;
  UserLogInRegisterOutDataName: string | null;
  PaymentUserLogInDataName: string | null;
  WeightNetApproveUserLogInDataName: string | null;
};

export class WeightService {
  async find(
    filters: Record<string, string>,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ data: WeightDisplay[]; total: number }> {
    const skip = (page - 1) * pageSize;
    const where = this.buildWhereClause(filters);

    const [data, total] = await Promise.all([
      prisma.weight.findMany({
        where,
        skip,
        take: pageSize,
        include: {
          WeightType: true,
          Customer: true,
          Product: true,
          Transporter: true,
          Driver: true,
          ProductUnit: true,
          Truck: true,
          RFIDTag: true,
          UserLogInIn: true,
          UserLogInOut: true,
          UserLogInRegisterIn: true,
          UserLogInRegisterOut: true,
          PaymentUserLogIn: true,
          WeightNetApproveUserLogIn: true,
        },
        orderBy: {
          WeightDateIn: 'desc',
        },
      }) as unknown as WeightWithRelations[],
      prisma.weight.count({ where }),
    ]);

    const enhancedData = data.map((weight) => ({
      ...weight,
      WeightTypeDataName: weight.WeightType?.WeightTypeName ?? null,
      CustomerDataName: weight.Customer?.CustomerName ?? null,
      ProductDataName: weight.Product?.ProductName ?? null,
      TransporterDataName: weight.Transporter?.TransporterName ?? null,
      DriverDataName: weight.Driver?.DriverName ?? null,
      ProductUnitDataName: weight.ProductUnit?.WeightUnitName ?? null,
      TruckDataName: weight.Truck?.CarRegister ?? null,
      RFIDTagDataName: weight.RFIDTag?.RFIDTagSerialNo ?? null,
      UserLogInInDataName: weight.UserLogInIn?.FullName ?? null,
      UserLogInOutDataName: weight.UserLogInOut?.FullName ?? null,
      UserLogInRegisterInDataName: weight.UserLogInRegisterIn?.FullName ?? null,
      UserLogInRegisterOutDataName: weight.UserLogInRegisterOut?.FullName ?? null,
      PaymentUserLogInDataName: weight.PaymentUserLogIn?.FullName ?? null,
      WeightNetApproveUserLogInDataName: weight.WeightNetApproveUserLogIn?.FullName ?? null,
    }));

    return {
      data: enhancedData,
      total,
    };
  }

  private buildWhereClause(filters: Record<string, string>): any {
    const where: any = {};
    const dateFields = [
      'WeightDateIn',
      'WeightTimeIn',
      'WeightDateOut',
      'WeightTimeOut',
      'RegisterDateIn',
      'RegisterTimeIn',
      'RegisterDateOut',
      'RegisterTimeOut',
      'PaymentDate',
      'PaymentTime',
    ];
    const numberFields = [
      'WeightIn',
      'WeightOut',
      'Weight',
      'WeightAdjust',
      'AdjustPercent',
      'AdjustPercentWeight',
      'WeightAdjKey1',
      'WeightAdjCal1',
      'WeightAdjKey2',
      'WeightAdjCal2',
      'WeightAdjKey3',
      'WeightAdjCal3',
      'WeightNet',
      'Price',
      'Tax',
      'KgToUnit',
      'Amount',
      'AmountAdjKey1',
      'AmountAdjCal1',
      'AmountAdjKey2',
      'AmountAdjCal2',
      'AmountAdjKey3',
      'AmountAdjCal3',
      'AmountNet',
      'TicketPrintCountIn',
      'TicketPrintCountOut',
      'WeightNetStandard',
      'WeightNetTolerancePositive',
      'WeightNetToleranceNegative',
    ];

    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        const value = filters[key];
        if (value === null || value === undefined || value === '') {
          continue;
        }

        if (dateFields.includes(key)) {
          where[key] = parseDate(value);
        } else if (numberFields.includes(key)) {
          where[key] = parseNumber(value);
        } else if (key.endsWith('ID')) {
          where[key] = value;
        } else {
          where[key] = {
            contains: value,
          };
        }
      }
    }
    return where;
  }

  async create(data: Omit<Weight, 'DataID'>): Promise<Weight> {
    // Generate SequenceRegisterIn based on FlagRegisterStatus
    let newSequenceRegisterIn: string;
    let newSequenceRegisterOut: string | null = null;

    if (data.FlagRegisterStatus === 'Y') {
      // ครั้งเดียว - หา sequence สำหรับ Y
      const latestWeightOnce = await prisma.weight.findFirst({
        where: {
          FlagRegisterStatus: 'Y',
        },
        orderBy: {
          SequenceRegisterIn: 'desc',
        },
        select: {
          SequenceRegisterIn: true,
          SequenceRegisterOut: true,
        },
      });

      let nextSequenceNumber = 1;
      if (latestWeightOnce && latestWeightOnce.SequenceRegisterIn) {
        nextSequenceNumber = parseInt(latestWeightOnce.SequenceRegisterIn, 10) + 1;
      }

      newSequenceRegisterIn = String(nextSequenceNumber).padStart(10, '0');
      newSequenceRegisterOut = newSequenceRegisterIn; // ครั้งเดียวใช้เลขเดียวกัน
    } else {
      // เข้าออก - หา sequence แยกสำหรับ In/Out
      const latestWeightIn = await prisma.weight.findFirst({
        where: {
          FlagRegisterStatus: 'N',
        },
        orderBy: {
          SequenceRegisterIn: 'desc',
        },
        select: {
          SequenceRegisterIn: true,
        },
      });

      let nextSequenceNumberIn = 1;
      if (latestWeightIn && latestWeightIn.SequenceRegisterIn) {
        nextSequenceNumberIn = parseInt(latestWeightIn.SequenceRegisterIn, 10) + 1;
      }

      newSequenceRegisterIn = String(nextSequenceNumberIn).padStart(10, '0');

      // ถ้ามี SequenceRegisterIn อยู่แล้ว แปลว่ากำลังชั่งออก
      if (data.SequenceRegisterIn) {
        const latestWeightOut = await prisma.weight.findFirst({
          where: {
            FlagRegisterStatus: 'N',
          },
          orderBy: {
            SequenceRegisterOut: 'desc',
          },
          select: {
            SequenceRegisterOut: true,
          },
        });

        let nextSequenceNumberOut = 1;
        if (latestWeightOut && latestWeightOut.SequenceRegisterOut) {
          nextSequenceNumberOut = parseInt(latestWeightOut.SequenceRegisterOut, 10) + 1;
        }

        newSequenceRegisterOut = String(nextSequenceNumberOut).padStart(10, '0');
      }
    }

    // Transform the data object to parse numbers
    // For dates, keep as undefined if null to avoid sending to Prisma
    const transformedData: any = {
      ...data,
      DataID: crypto.randomUUID(),
      SequenceRegisterIn: newSequenceRegisterIn,
      SequenceRegisterOut: newSequenceRegisterOut ?? data.SequenceRegisterOut,
      HWID: getHWID(),
      // Parse number fields
      WeightIn: parseNumber(data.WeightIn),
      WeightOut: parseNumber(data.WeightOut),
      Weight: parseNumber(data.Weight),
      WeightAdjust: parseNumber(data.WeightAdjust),
      AdjustPercent: parseNumber(data.AdjustPercent),
      AdjustPercentWeight: parseNumber(data.AdjustPercentWeight),
      WeightAdjKey1: parseNumber(data.WeightAdjKey1),
      WeightAdjCal1: parseNumber(data.WeightAdjCal1),
      WeightAdjKey2: parseNumber(data.WeightAdjKey2),
      WeightAdjCal2: parseNumber(data.WeightAdjCal2),
      WeightAdjKey3: parseNumber(data.WeightAdjKey3),
      WeightAdjCal3: parseNumber(data.WeightAdjCal3),
      WeightNet: parseNumber(data.WeightNet),
      Price: parseNumber(data.Price),
      Tax: parseNumber(data.Tax),
      KgToUnit: parseNumber(data.KgToUnit),
      Amount: parseNumber(data.Amount),
      AmountAdjKey1: parseNumber(data.AmountAdjKey1),
      AmountAdjCal1: parseNumber(data.AmountAdjCal1),
      AmountAdjKey2: parseNumber(data.AmountAdjKey2),
      AmountAdjCal2: parseNumber(data.AmountAdjCal2),
      AmountAdjKey3: parseNumber(data.AmountAdjKey3),
      AmountAdjCal3: parseNumber(data.AmountAdjCal3),
      AmountNet: parseNumber(data.AmountNet),
      TicketPrintCountIn: parseNumber(data.TicketPrintCountIn),
      TicketPrintCountOut: parseNumber(data.TicketPrintCountOut),
      WeightNetStandard: parseNumber(data.WeightNetStandard),
      WeightNetTolerancePositive: parseNumber(data.WeightNetTolerancePositive),
      WeightNetToleranceNegative: parseNumber(data.WeightNetToleranceNegative),
    };

    // Parse date fields
    transformedData.WeightDateIn = parseDate(data.WeightDateIn);
    transformedData.WeightTimeIn = parseDate(data.WeightTimeIn);
    transformedData.WeightDateOut = parseDate(data.WeightDateOut);
    transformedData.WeightTimeOut = parseDate(data.WeightTimeOut);
    transformedData.RegisterDateIn = parseDate(data.RegisterDateIn);
    transformedData.RegisterTimeIn = parseDate(data.RegisterTimeIn);
    transformedData.RegisterDateOut = parseDate(data.RegisterDateOut);
    transformedData.RegisterTimeOut = parseDate(data.RegisterTimeOut);
    transformedData.PaymentDate = parseDate(data.PaymentDate);
    transformedData.PaymentTime = parseDate(data.PaymentTime);

    return prisma.weight.create({
      data: transformedData,
    });
  }

  async update(id: string, data: Partial<Weight>): Promise<Weight> {
    // Create object with only defined fields, applying transformations
    const transformedData: any = {
      HWID: getHWID(),
    };

    // Copy all string fields as-is
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        // Handle date fields
        if (
          [
            'WeightDateIn',
            'WeightTimeIn',
            'WeightDateOut',
            'WeightTimeOut',
            'RegisterDateIn',
            'RegisterTimeIn',
            'RegisterDateOut',
            'RegisterTimeOut',
            'PaymentDate',
            'PaymentTime',
          ].includes(key)
        ) {
          transformedData[key] = parseDate(value);
        }
        // Handle number fields
        else if (
          [
            'WeightIn',
            'WeightOut',
            'Weight',
            'WeightAdjust',
            'AdjustPercent',
            'AdjustPercentWeight',
            'WeightAdjKey1',
            'WeightAdjCal1',
            'WeightAdjKey2',
            'WeightAdjCal2',
            'WeightAdjKey3',
            'WeightAdjCal3',
            'WeightNet',
            'Price',
            'Tax',
            'KgToUnit',
            'Amount',
            'AmountAdjKey1',
            'AmountAdjCal1',
            'AmountAdjKey2',
            'AmountAdjCal2',
            'AmountAdjKey3',
            'AmountAdjCal3',
            'AmountNet',
            'TicketPrintCountIn',
            'TicketPrintCountOut',
            'WeightNetStandard',
            'WeightNetTolerancePositive',
            'WeightNetToleranceNegative',
          ].includes(key)
        ) {
          transformedData[key] = parseNumber(value);
        }
        // Handle other fields as-is
        else {
          transformedData[key] = value;
        }
      }
    });

    return prisma.weight.update({
      where: { DataID: id },
      data: transformedData,
    });
  }

  async delete(id: string): Promise<Weight> {
    return prisma.weight.delete({
      where: { DataID: id },
    });
  }
}

export const weightService = new WeightService();
