import { prisma } from '@/core/libs/prisma';
import type {
  Truck,
  WeightType,
  Customer,
  Product,
  Transporter,
  Driver,
  WeightUnit,
  UserLogIn,
} from '@/../prisma-client';

// Type for included relations
type TruckWithRelations = Truck & {
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

// Type for table display
type TruckDisplay = TruckWithRelations & {
  WeightTypeDataName: string | null;
  CustomerDataName: string | null;
  ProductDataName: string | null;
  TransporterDataName: string | null;
  DriverDataName: string | null;
  ProductUnitDataName: string | null;
  UserLogInDataName: string | null;
};

export class TruckService {
  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: TruckDisplay[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.truck.findMany({
        skip,
        take: pageSize,
        where: {
          FlagCancel: { not: '1' },
        },
        include: {
          WeightType: true,
          Customer: true,
          Product: true,
          Transporter: true,
          Driver: true,
          ProductUnit: true,
          UserLogIn: true,
        },
        orderBy: {
          CarRegister: 'asc',
        },
      }),
      prisma.truck.count({
        where: {
          FlagCancel: { not: '1' },
        },
      }),
    ]);

    const enhancedData = data.map((truck) => ({
      ...truck,
      WeightTypeDataName: truck.WeightType?.WeightTypeName ?? null,
      CustomerDataName: truck.Customer?.CustomerName ?? null,
      ProductDataName: truck.Product?.ProductName ?? null,
      TransporterDataName: truck.Transporter?.TransporterName ?? null,
      DriverDataName: truck.Driver?.DriverName ?? null,
      ProductUnitDataName: truck.ProductUnit?.WeightUnitName ?? null,
      UserLogInDataName: truck.UserLogIn?.FullName ?? null,
    }));

    return {
      data: enhancedData,
      total,
    };
  }

  async findById(id: string): Promise<TruckWithRelations | null> {
    return prisma.truck.findUnique({
      where: { DataID: id },
      include: {
        WeightType: true,
        Customer: true,
        Product: true,
        Transporter: true,
        Driver: true,
        ProductUnit: true,
        UserLogIn: true,
      },
    });
  }

  async create(data: Omit<Truck, 'DataID'>): Promise<Truck> {
    // Convert string numbers to float
    const convertedData = {
      ...data,
      Weight: data.Weight ? parseFloat(data.Weight.toString()) : null,
      WeightAdjKey1: data.WeightAdjKey1 ? parseFloat(data.WeightAdjKey1.toString()) : null,
      WeightAdjKey2: data.WeightAdjKey2 ? parseFloat(data.WeightAdjKey2.toString()) : null,
      WeightAdjKey3: data.WeightAdjKey3 ? parseFloat(data.WeightAdjKey3.toString()) : null,
      WeightAdjCal1: data.WeightAdjCal1 ? parseFloat(data.WeightAdjCal1.toString()) : null,
      WeightAdjCal2: data.WeightAdjCal2 ? parseFloat(data.WeightAdjCal2.toString()) : null,
      WeightAdjCal3: data.WeightAdjCal3 ? parseFloat(data.WeightAdjCal3.toString()) : null,
      Price: data.Price ? parseFloat(data.Price.toString()) : null,
      Tax: data.Tax ? parseFloat(data.Tax.toString()) : null,
      AmountAdjKey1: data.AmountAdjKey1 ? parseFloat(data.AmountAdjKey1.toString()) : null,
      AmountAdjKey2: data.AmountAdjKey2 ? parseFloat(data.AmountAdjKey2.toString()) : null,
      AmountAdjKey3: data.AmountAdjKey3 ? parseFloat(data.AmountAdjKey3.toString()) : null,
      AmountAdjCal1: data.AmountAdjCal1 ? parseFloat(data.AmountAdjCal1.toString()) : null,
      AmountAdjCal2: data.AmountAdjCal2 ? parseFloat(data.AmountAdjCal2.toString()) : null,
      AmountAdjCal3: data.AmountAdjCal3 ? parseFloat(data.AmountAdjCal3.toString()) : null,
    };

    return prisma.truck.create({
      data: {
        DataID: crypto.randomUUID(),
        ...convertedData,
      },
    });
  }

  async update(id: string, data: Partial<Truck>): Promise<Truck> {
    // Convert string numbers to float
    const convertedData = {
      ...data,
      Weight: data.Weight ? parseFloat(data.Weight.toString()) : null,
      WeightAdjKey1: data.WeightAdjKey1 ? parseFloat(data.WeightAdjKey1.toString()) : null,
      WeightAdjKey2: data.WeightAdjKey2 ? parseFloat(data.WeightAdjKey2.toString()) : null,
      WeightAdjKey3: data.WeightAdjKey3 ? parseFloat(data.WeightAdjKey3.toString()) : null,
      WeightAdjCal1: data.WeightAdjCal1 ? parseFloat(data.WeightAdjCal1.toString()) : null,
      WeightAdjCal2: data.WeightAdjCal2 ? parseFloat(data.WeightAdjCal2.toString()) : null,
      WeightAdjCal3: data.WeightAdjCal3 ? parseFloat(data.WeightAdjCal3.toString()) : null,
      Price: data.Price ? parseFloat(data.Price.toString()) : null,
      Tax: data.Tax ? parseFloat(data.Tax.toString()) : null,
      AmountAdjKey1: data.AmountAdjKey1 ? parseFloat(data.AmountAdjKey1.toString()) : null,
      AmountAdjKey2: data.AmountAdjKey2 ? parseFloat(data.AmountAdjKey2.toString()) : null,
      AmountAdjKey3: data.AmountAdjKey3 ? parseFloat(data.AmountAdjKey3.toString()) : null,
      AmountAdjCal1: data.AmountAdjCal1 ? parseFloat(data.AmountAdjCal1.toString()) : null,
      AmountAdjCal2: data.AmountAdjCal2 ? parseFloat(data.AmountAdjCal2.toString()) : null,
      AmountAdjCal3: data.AmountAdjCal3 ? parseFloat(data.AmountAdjCal3.toString()) : null,
    };

    return prisma.truck.update({
      where: { DataID: id },
      data: convertedData,
    });
  }

  async delete(id: string): Promise<Truck> {
    return prisma.truck.delete({
      where: { DataID: id },
    });
  }
}
