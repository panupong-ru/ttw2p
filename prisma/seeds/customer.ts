import { prisma } from '@/core/libs/prisma';

const customerData = [
  {
    DataID: '00001',
    CustomerID: '00001',
    CustomerName: 'Customer 00001',
    Address1: '',
    Address2: '',
    FlagCancel: 'N',
    HWID: 'BFEBFBFF000406E3',
    DataHash: 5491802207403267967n,
  },
  {
    DataID: '00002',
    CustomerID: '00002',
    CustomerName: 'Customer 00002',
    FlagCancel: 'N',
  },
  {
    DataID: '00003',
    CustomerID: '00003',
    CustomerName: 'Customer 00003',
    FlagCancel: 'N',
  },
  {
    DataID: '00004',
    CustomerID: '00004',
    CustomerName: 'Customer 00004',
    FlagCancel: 'N',
  },
  {
    DataID: '00005',
    CustomerID: '00005',
    CustomerName: 'Customer 00005',
    FlagCancel: 'N',
  },
  {
    DataID: '00006',
    CustomerID: '00006',
    CustomerName: 'Customer 00006',
    FlagCancel: 'N',
  },
  {
    DataID: '00007',
    CustomerID: '00007',
    CustomerName: 'Customer 00007',
    FlagCancel: 'N',
  },
  {
    DataID: '00008',
    CustomerID: '00008',
    CustomerName: 'Customer 00008',
    FlagCancel: 'N',
  },
  {
    DataID: '00009',
    CustomerID: '00009',
    CustomerName: 'Customer 00009',
    FlagCancel: 'N',
  },
  {
    DataID: '00010',
    CustomerID: '00010',
    CustomerName: 'Customer 00010',
    FlagCancel: 'N',
  },
];

const Seed_Customer = () =>
  prisma.$transaction(
    customerData.map((row) => {
      const { DataID, ...rest } = row;
      return prisma.customer.upsert({
        where: { DataID },
        update: rest,
        create: row,
      });
    })
  );

export { Seed_Customer };
