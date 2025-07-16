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
  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: WeightDisplay[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.weight.findMany({
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
      prisma.weight.count({
        where: {
          FlagCancel: { not: '1' },
        },
      }),
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

  async findById(id: string): Promise<Weight | null> {
    return prisma.weight.findUnique({
      where: { DataID: id },
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
    }) as Promise<Weight | null>;
  }

  async create(data: Omit<Weight, 'DataID'>): Promise<Weight> {
    return prisma.weight.create({
      data: {
        ...data,
        DataID: `W${Date.now()}`,
      },
    });
  }

  async update(id: string, data: Partial<Weight>): Promise<Weight> {
    return prisma.weight.update({
      where: { DataID: id },
      data,
    });
  }

  async delete(id: string): Promise<Weight> {
    return prisma.weight.delete({
      where: { DataID: id },
    });
  }
}
