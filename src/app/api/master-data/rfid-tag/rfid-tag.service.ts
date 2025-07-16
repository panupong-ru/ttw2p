import { prisma } from '@/core/libs/prisma';
import type {
  RFIDTag,
  WeightType,
  Customer,
  Product,
  Transporter,
  Driver,
  WeightUnit,
  UserLogIn,
} from '@/../prisma-client';

// Type สำหรับ relations ที่ต้องการ include
type RFIDTagWithRelations = RFIDTag & {
  WeightType: Pick<WeightType, 'DataID' | 'WeightTypeID' | 'WeightTypeName' | 'FlagCancel'> | null;
  Customer: Pick<Customer, 'DataID' | 'CustomerID' | 'CustomerName' | 'Address1' | 'Address2' | 'FlagCancel'> | null;
  Product: Pick<Product, 'DataID' | 'ProductID' | 'ProductName' | 'Price' | 'FlagCancel'> | null;
  Transporter: Pick<
    Transporter,
    'DataID' | 'TransporterID' | 'TransporterName' | 'Address1' | 'Address2' | 'FlagCancel'
  > | null;
  Driver: Pick<Driver, 'DataID' | 'DriverID' | 'DriverName' | 'Address1' | 'Address2' | 'FlagCancel'> | null;
  ProductUnit: Pick<WeightUnit, 'DataID' | 'WeightUnitID' | 'WeightUnitName' | 'KgToUnit' | 'FlagCancel'> | null;
  UserLogInIn: Pick<UserLogIn, 'DataID' | 'LogInName' | 'FullName' | 'FlagCancel'> | null;
  UserLogInOut: Pick<UserLogIn, 'DataID' | 'LogInName' | 'FullName' | 'FlagCancel'> | null;
};

// Type สำหรับข้อมูลที่จะแสดงในตาราง
type RFIDTagDisplay = RFIDTagWithRelations & {
  WeightTypeDataName: string | null;
  CustomerDataName: string | null;
  ProductDataName: string | null;
  TransporterDataName: string | null;
  DriverDataName: string | null;
  ProductUnitDataName: string | null;
  UserLogInInDataName: string | null;
  UserLogInOutDataName: string | null;
};

export class RFIDTagService {
  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: RFIDTagDisplay[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.rFIDTag.findMany({
        skip,
        take: pageSize,
        include: {
          WeightType: {
            select: {
              DataID: true,
              WeightTypeID: true,
              WeightTypeName: true,
              FlagCancel: true,
            },
          },
          Customer: {
            select: {
              DataID: true,
              CustomerID: true,
              CustomerName: true,
              Address1: true,
              Address2: true,
              FlagCancel: true,
            },
          },
          Product: {
            select: {
              DataID: true,
              ProductID: true,
              ProductName: true,
              Price: true,
              FlagCancel: true,
            },
          },
          Transporter: {
            select: {
              DataID: true,
              TransporterID: true,
              TransporterName: true,
              Address1: true,
              Address2: true,
              FlagCancel: true,
            },
          },
          Driver: {
            select: {
              DataID: true,
              DriverID: true,
              DriverName: true,
              Address1: true,
              Address2: true,
              FlagCancel: true,
            },
          },
          ProductUnit: {
            select: {
              DataID: true,
              WeightUnitID: true,
              WeightUnitName: true,
              KgToUnit: true,
              FlagCancel: true,
            },
          },
          UserLogInIn: {
            select: {
              DataID: true,
              LogInName: true,
              FullName: true,
              FlagCancel: true,
            },
          },
          UserLogInOut: {
            select: {
              DataID: true,
              LogInName: true,
              FullName: true,
              FlagCancel: true,
            },
          },
        },
        orderBy: {
          RFIDTagID: 'asc',
        },
      }),
      prisma.rFIDTag.count(),
    ]);

    // Format data for table display
    const formattedData = data.map(
      (rfidTag): RFIDTagDisplay => ({
        ...rfidTag,
        WeightTypeDataName: rfidTag.WeightType?.WeightTypeName ?? null,
        CustomerDataName: rfidTag.Customer?.CustomerName ?? null,
        ProductDataName: rfidTag.Product?.ProductName ?? null,
        TransporterDataName: rfidTag.Transporter?.TransporterName ?? null,
        DriverDataName: rfidTag.Driver?.DriverName ?? null,
        ProductUnitDataName: rfidTag.ProductUnit?.WeightUnitName ?? null,
        UserLogInInDataName: rfidTag.UserLogInIn?.FullName ?? null,
        UserLogInOutDataName: rfidTag.UserLogInOut?.FullName ?? null,
      })
    );

    return { data: formattedData, total };
  }

  async findById(id: string): Promise<RFIDTagWithRelations | null> {
    return prisma.rFIDTag.findUnique({
      where: { DataID: id },
      include: {
        WeightType: {
          select: {
            DataID: true,
            WeightTypeID: true,
            WeightTypeName: true,
            FlagCancel: true,
          },
        },
        Customer: {
          select: {
            DataID: true,
            CustomerID: true,
            CustomerName: true,
            Address1: true,
            Address2: true,
            FlagCancel: true,
          },
        },
        Product: {
          select: {
            DataID: true,
            ProductID: true,
            ProductName: true,
            Price: true,
            FlagCancel: true,
          },
        },
        Transporter: {
          select: {
            DataID: true,
            TransporterID: true,
            TransporterName: true,
            Address1: true,
            Address2: true,
            FlagCancel: true,
          },
        },
        Driver: {
          select: {
            DataID: true,
            DriverID: true,
            DriverName: true,
            Address1: true,
            Address2: true,
            FlagCancel: true,
          },
        },
        ProductUnit: {
          select: {
            DataID: true,
            WeightUnitID: true,
            WeightUnitName: true,
            KgToUnit: true,
            FlagCancel: true,
          },
        },
        UserLogInIn: {
          select: {
            DataID: true,
            LogInName: true,
            FullName: true,
            FlagCancel: true,
          },
        },
        UserLogInOut: {
          select: {
            DataID: true,
            LogInName: true,
            FullName: true,
            FlagCancel: true,
          },
        },
      },
    });
  }

  async create(data: Omit<RFIDTag, 'DataID'>): Promise<RFIDTag> {
    // Convert string numbers to float
    const convertedData = {
      ...data,
      WeightAdjKey1: data.WeightAdjKey1 ? parseFloat(data.WeightAdjKey1.toString()) : null,
      WeightAdjKey2: data.WeightAdjKey2 ? parseFloat(data.WeightAdjKey2.toString()) : null,
      WeightAdjKey3: data.WeightAdjKey3 ? parseFloat(data.WeightAdjKey3.toString()) : null,
      WeightAdjCal1: data.WeightAdjCal1 ? parseFloat(data.WeightAdjCal1.toString()) : null,
      WeightAdjCal2: data.WeightAdjCal2 ? parseFloat(data.WeightAdjCal2.toString()) : null,
      WeightAdjCal3: data.WeightAdjCal3 ? parseFloat(data.WeightAdjCal3.toString()) : null,
      AmountAdjKey1: data.AmountAdjKey1 ? parseFloat(data.AmountAdjKey1.toString()) : null,
      AmountAdjKey2: data.AmountAdjKey2 ? parseFloat(data.AmountAdjKey2.toString()) : null,
      AmountAdjKey3: data.AmountAdjKey3 ? parseFloat(data.AmountAdjKey3.toString()) : null,
      AmountAdjCal1: data.AmountAdjCal1 ? parseFloat(data.AmountAdjCal1.toString()) : null,
      AmountAdjCal2: data.AmountAdjCal2 ? parseFloat(data.AmountAdjCal2.toString()) : null,
      AmountAdjCal3: data.AmountAdjCal3 ? parseFloat(data.AmountAdjCal3.toString()) : null,
      Weight: data.Weight ? parseFloat(data.Weight.toString()) : null,
      WeightIn: data.WeightIn ? parseFloat(data.WeightIn.toString()) : null,
      WeightOut: data.WeightOut ? parseFloat(data.WeightOut.toString()) : null,
      WeightAdjust: data.WeightAdjust ? parseFloat(data.WeightAdjust.toString()) : null,
      AdjustPercent: data.AdjustPercent ? parseFloat(data.AdjustPercent.toString()) : null,
      AdjustPercentWeight: data.AdjustPercentWeight ? parseFloat(data.AdjustPercentWeight.toString()) : null,
      WeightNet: data.WeightNet ? parseFloat(data.WeightNet.toString()) : null,
      KgToUnit: data.KgToUnit ? parseFloat(data.KgToUnit.toString()) : null,
      Price: data.Price ? parseFloat(data.Price.toString()) : null,
      Tax: data.Tax ? parseFloat(data.Tax.toString()) : null,
      Amount: data.Amount ? parseFloat(data.Amount.toString()) : null,
      AmountNet: data.AmountNet ? parseFloat(data.AmountNet.toString()) : null,
    };

    return prisma.rFIDTag.create({
      data: {
        DataID: crypto.randomUUID(),
        ...convertedData,
      },
    });
  }

  async update(id: string, data: Partial<RFIDTag>): Promise<RFIDTag> {
    // Convert string numbers to float
    const convertedData = {
      ...data,
      WeightAdjKey1: data.WeightAdjKey1 ? parseFloat(data.WeightAdjKey1.toString()) : null,
      WeightAdjKey2: data.WeightAdjKey2 ? parseFloat(data.WeightAdjKey2.toString()) : null,
      WeightAdjKey3: data.WeightAdjKey3 ? parseFloat(data.WeightAdjKey3.toString()) : null,
      WeightAdjCal1: data.WeightAdjCal1 ? parseFloat(data.WeightAdjCal1.toString()) : null,
      WeightAdjCal2: data.WeightAdjCal2 ? parseFloat(data.WeightAdjCal2.toString()) : null,
      WeightAdjCal3: data.WeightAdjCal3 ? parseFloat(data.WeightAdjCal3.toString()) : null,
      AmountAdjKey1: data.AmountAdjKey1 ? parseFloat(data.AmountAdjKey1.toString()) : null,
      AmountAdjKey2: data.AmountAdjKey2 ? parseFloat(data.AmountAdjKey2.toString()) : null,
      AmountAdjKey3: data.AmountAdjKey3 ? parseFloat(data.AmountAdjKey3.toString()) : null,
      AmountAdjCal1: data.AmountAdjCal1 ? parseFloat(data.AmountAdjCal1.toString()) : null,
      AmountAdjCal2: data.AmountAdjCal2 ? parseFloat(data.AmountAdjCal2.toString()) : null,
      AmountAdjCal3: data.AmountAdjCal3 ? parseFloat(data.AmountAdjCal3.toString()) : null,
      Weight: data.Weight ? parseFloat(data.Weight.toString()) : null,
      WeightIn: data.WeightIn ? parseFloat(data.WeightIn.toString()) : null,
      WeightOut: data.WeightOut ? parseFloat(data.WeightOut.toString()) : null,
      WeightAdjust: data.WeightAdjust ? parseFloat(data.WeightAdjust.toString()) : null,
      AdjustPercent: data.AdjustPercent ? parseFloat(data.AdjustPercent.toString()) : null,
      AdjustPercentWeight: data.AdjustPercentWeight ? parseFloat(data.AdjustPercentWeight.toString()) : null,
      WeightNet: data.WeightNet ? parseFloat(data.WeightNet.toString()) : null,
      KgToUnit: data.KgToUnit ? parseFloat(data.KgToUnit.toString()) : null,
      Price: data.Price ? parseFloat(data.Price.toString()) : null,
      Tax: data.Tax ? parseFloat(data.Tax.toString()) : null,
      Amount: data.Amount ? parseFloat(data.Amount.toString()) : null,
      AmountNet: data.AmountNet ? parseFloat(data.AmountNet.toString()) : null,
    };

    return prisma.rFIDTag.update({
      where: { DataID: id },
      data: convertedData,
    });
  }

  async delete(id: string): Promise<RFIDTag> {
    return prisma.rFIDTag.delete({
      where: { DataID: id },
    });
  }
}
