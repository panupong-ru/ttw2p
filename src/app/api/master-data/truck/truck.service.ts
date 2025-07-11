import { prisma } from '@/core/libs/prisma';
import type { Truck } from '@/../prisma-client';
import { randomUUID } from 'crypto';

export class TruckService {
  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: any[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.truck.findMany({
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
          CarRegister: 'asc',
        },
      }),
      prisma.truck.count(),
    ]);

    // Format data for table display
    const formattedData = data.map((truck: any) => ({
      ...truck,
      WeightTypeDataName: truck.WeightType?.WeightTypeName || null,
      ProductDataName: truck.Product?.ProductName || null,
      TransporterDataName: truck.Transporter?.TransporterName || null,
      DriverDataName: truck.Driver?.DriverName || null,
      ProductUnitDataName: truck.ProductUnit?.WeightUnitName || null,
      UserLogInDataName: truck.UserLogIn?.FullName || null,
      CustomerDataName: truck.Customer?.CustomerName || null,
    }));

    return { data: formattedData, total };
  }

  async findById(id: string): Promise<any | null> {
    return prisma.truck.findUnique({
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
        UserLogIn: {
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

  async create(data: Omit<Truck, 'DataID'>): Promise<Truck> {
    return prisma.truck.create({
      data: {
        DataID: randomUUID(),
        ...data,
      },
    });
  }

  async update(id: string, data: Partial<Truck>): Promise<Truck> {
    return prisma.truck.update({
      where: { DataID: id },
      data,
    });
  }

  async delete(id: string): Promise<Truck> {
    // ดึงข้อมูลก่อนลบ
    const truck = await this.findById(id);
    if (!truck) {
      throw new Error('Truck not found');
    }

    return prisma.truck.delete({
      where: { DataID: id },
    });
  }
}
