import { prisma } from '@/core/libs/prisma';

const productData = [
  {
    DataID: 'AA52B8BEECC1FB47A512F02826D16FF7',
    ProductID: 'P002',
    ProductName: 'Product2',
    ProductUnitDataID: '102E44E63967CD43A7C43F95F426628F',
    Price: 0,
    FlagCancel: 'N',
  },
  {
    DataID: 'AAB80FBA1C93D24885A48F04ED7ACC7B',
    ProductID: 'P004',
    ProductName: 'Product4',
    ProductUnitDataID: '102E44E63967CD43A7C43F95F426628F',
    Price: 0,
    FlagCancel: 'N',
  },
  {
    DataID: 'P001',
    ProductID: 'P001',
    ProductName: 'Product1',
    ProductUnitDataID: '102E44E63967CD43A7C43F95F426628F',
    Price: 1,
    FlagCancel: 'N',
    DataHash: -2274775906111305023n,
  },
  {
    DataID: 'P003',
    ProductID: 'P003',
    ProductName: 'Product3',
    ProductUnitDataID: '7C6E0F18CC4D7246924078FF80FCFE78',
    Price: 3,
    FlagCancel: 'N',
    DataHash: 987602544784863621n,
  },
];

const Seed_Product = () =>
  prisma.$transaction(
    productData.map((row) => {
      const { DataID, ...rest } = row;
      return prisma.product.upsert({
        where: { DataID },
        update: rest,
        create: row,
      });
    })
  );

export { Seed_Product };
