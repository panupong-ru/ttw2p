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
import { getHWID } from '@/core/utils/hardware';

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
  UserLogIn: Pick<UserLogIn, 'DataID' | 'LogInName' | 'FullName' | 'FlagCancel'> | null;
};

// Type สำหรับข้อมูลที่จะแสดงในตาราง
type RFIDTagDisplay = RFIDTagWithRelations & {
  WeightTypeDataName: string | null;
  CustomerDataName: string | null;
  ProductDataName: string | null;
  TransporterDataName: string | null;
  DriverDataName: string | null;
  ProductUnitDataName: string | null;
  UserLogInDataName: string | null;
};

export class RFIDTagService {
  async find(
    filters: Record<string, string>,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ data: RFIDTagDisplay[]; total: number }> {
    const skip = (page - 1) * pageSize;
    const where = this.buildWhereClause(filters);

    const [data, total] = await Promise.all([
      prisma.rFIDTag.findMany({
        where,
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
          UserLogIn: {
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
      prisma.rFIDTag.count({ where }),
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
        UserLogInDataName: rfidTag.UserLogIn?.FullName ?? null,
      })
    );

    return { data: formattedData, total };
  }

  private buildWhereClause(filters: Record<string, string>): any {
    const where: any = {};
    const dateFields = ['WeightDate', 'WeightTime'];
    const numberFields = [
      'Weight',
      'WeightAdjKey1',
      'WeightAdjCal1',
      'WeightAdjKey2',
      'WeightAdjCal2',
      'WeightAdjKey3',
      'WeightAdjCal3',
      'Price',
      'Tax',
      'AmountAdjKey1',
      'AmountAdjCal1',
      'AmountAdjKey2',
      'AmountAdjCal2',
      'AmountAdjKey3',
      'AmountAdjCal3',
    ];

    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        const value = filters[key];
        if (value === null || value === undefined || value === '') {
          continue;
        }

        if (key.endsWith('ID')) {
          where[key] = value;
        } else if (dateFields.includes(key)) {
          where[key] = new Date(value);
        } else if (numberFields.includes(key)) {
          where[key] = parseFloat(value);
        } else {
          where[key] = {
            contains: value,
          };
        }
      }
    }
    return where;
  }

  async create(data: RFIDTag): Promise<RFIDTag> {
    // Convert string numbers to float
    const convertedData = {
      ...data,
      DataID: data.RFIDTagID ? data.RFIDTagID : crypto.randomUUID(),
      HWID: getHWID(),
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
      Price: data.Price ? parseFloat(data.Price.toString()) : null,
      Tax: data.Tax ? parseFloat(data.Tax.toString()) : null,
      WeightDate: data.WeightDate ? new Date(data.WeightDate) : null,
      WeightTime: data.WeightTime ? new Date(data.WeightTime) : null,
    };

    return prisma.rFIDTag.create({
      data: {
        ...convertedData,
      },
    });
  }

  async update(id: string, data: Partial<RFIDTag>): Promise<RFIDTag> {
    const convertedData = {
      ...data,
      HWID: getHWID(),
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
      Price: data.Price ? parseFloat(data.Price.toString()) : null,
      Tax: data.Tax ? parseFloat(data.Tax.toString()) : null,
      WeightDate: data.WeightDate ? new Date(data.WeightDate) : null,
      WeightTime: data.WeightTime ? new Date(data.WeightTime) : null,
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
