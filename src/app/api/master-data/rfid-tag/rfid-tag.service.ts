import { prisma } from '@/core/libs/prisma';
import type { RFIDTag } from '@/../prisma-client';
import { randomUUID } from 'crypto';

export class RFIDTagService {
  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: any[]; total: number }> {
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
    const formattedData = data.map((rfidTag: any) => ({
      ...rfidTag,
      WeightTypeDataName: rfidTag.WeightType?.WeightTypeName || null,
      ProductDataName: rfidTag.Product?.ProductName || null,
      TransporterDataName: rfidTag.Transporter?.TransporterName || null,
      DriverDataName: rfidTag.Driver?.DriverName || null,
      ProductUnitDataName: rfidTag.ProductUnit?.WeightUnitName || null,
      UserLogInInDataName: rfidTag.UserLogInIn?.FullName || null,
      UserLogInOutDataName: rfidTag.UserLogInOut?.FullName || null,
      CustomerDataName: rfidTag.Customer?.CustomerName || null,
    }));

    return { data: formattedData, total };
  }

  async findById(id: string): Promise<any | null> {
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
    return prisma.rFIDTag.create({
      data: {
        DataID: randomUUID(),
        ...data,
      },
    });
  }

  async update(id: string, data: Partial<RFIDTag>): Promise<RFIDTag> {
    return prisma.rFIDTag.update({
      where: { DataID: id },
      data,
    });
  }

  async delete(id: string): Promise<RFIDTag> {
    // ดึงข้อมูลก่อนลบ
    const rfidTag = await this.findById(id);
    if (!rfidTag) {
      throw new Error('RFID Tag not found');
    }

    return prisma.rFIDTag.delete({
      where: { DataID: id },
    });
  }
}
