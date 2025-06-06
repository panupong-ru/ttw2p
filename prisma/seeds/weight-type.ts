import { prisma } from '@/core/libs/prisma';

const WeightType = [
  {
    DataID: 'TW001',
    WeightTypeID: 'TW001',
    WeightTypeName: 'Receiving',
    FlagPayment: 'N',
    FlagCancel: 'N',
    HWID: 'BFEBFBFF000406E3',
    DataHash: BigInt('-4775010652341596959'),
  },
  {
    DataID: 'TW002',
    WeightTypeID: 'TW002',
    WeightTypeName: 'Delivery',
    FlagPayment: 'N',
    FlagCancel: 'N',
    HWID: 'BFEBFBFF000406E3',
    DataHash: BigInt('-1221460884400021820'),
  },
  {
    DataID: 'TW003',
    WeightTypeID: 'TW003',
    WeightTypeName: 'General',
    FlagPayment: 'N',
    FlagCancel: 'N',
    HWID: 'BFEBFBFF000406E3',
    DataHash: BigInt('8685395212452127739'),
  },
];

const Seed_WeightType = () =>
  prisma.$transaction(
    WeightType.map((row) => {
      const { DataID, ...rest } = row;
      return prisma.weightType.upsert({
        where: { DataID },
        update: rest,
        create: row,
      });
    })
  );

export { Seed_WeightType };
