import { prisma } from '@/core/libs/prisma';

export class CustomerService {
  async findAll() {
    return prisma.customer.findMany({
      where: {
        FlagCancel: { not: '1' },
      },
    });
  }

  async findById(id: string) {
    return prisma.customer.findUnique({
      where: { DataID: id },
    });
  }

  async create(data: any) {
    return prisma.customer.create({
      data: {
        DataID: data.DataID,
        DataCenter: data.DataCenter,
        CustomerID: data.CustomerID,
        CustomerName: data.CustomerName,
        Address1: data.Address1,
        Address2: data.Address2,
        SequenceWeightIn: data.SequenceWeightIn,
        SequenceWeightOut: data.SequenceWeightOut,
        FlagCancel: data.FlagCancel || '0',
        HWID: data.HWID,
        DataHash: data.DataHash,
      },
    });
  }

  async update(id: string, data: any) {
    return prisma.customer.update({
      where: { DataID: id },
      data: {
        DataCenter: data.DataCenter,
        CustomerID: data.CustomerID,
        CustomerName: data.CustomerName,
        Address1: data.Address1,
        Address2: data.Address2,
        SequenceWeightIn: data.SequenceWeightIn,
        SequenceWeightOut: data.SequenceWeightOut,
        FlagCancel: data.FlagCancel,
        HWID: data.HWID,
        DataHash: data.DataHash,
      },
    });
  }

  async delete(id: string) {
    return prisma.customer.update({
      where: { DataID: id },
      data: { FlagCancel: '1' },
    });
  }
}
