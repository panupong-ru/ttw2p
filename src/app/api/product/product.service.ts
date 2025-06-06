import { prisma } from '@/core/libs/prisma';

export class ProductService {
  async findAll() {
    return prisma.product.findMany({
      where: {
        FlagCancel: { not: '1' },
      },
    });
  }

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { DataID: id },
    });
  }

  async create(data: any) {
    return prisma.product.create({
      data: {
        DataID: data.DataID,
        DataCenter: data.DataCenter,
        ProductID: data.ProductID,
        ProductName: data.ProductName,
        ProductUnitDataID: data.ProductUnitDataID,
        Price: data.Price,
        SequenceWeightIn: data.SequenceWeightIn,
        SequenceWeightOut: data.SequenceWeightOut,
        FlagCancel: data.FlagCancel || '0',
        HWID: data.HWID,
        DataHash: data.DataHash,
      },
    });
  }

  async update(id: string, data: any) {
    return prisma.product.update({
      where: { DataID: id },
      data: {
        DataCenter: data.DataCenter,
        ProductID: data.ProductID,
        ProductName: data.ProductName,
        ProductUnitDataID: data.ProductUnitDataID,
        Price: data.Price,
        SequenceWeightIn: data.SequenceWeightIn,
        SequenceWeightOut: data.SequenceWeightOut,
        FlagCancel: data.FlagCancel,
        HWID: data.HWID,
        DataHash: data.DataHash,
      },
    });
  }

  async delete(id: string) {
    return prisma.product.update({
      where: { DataID: id },
      data: { FlagCancel: '1' },
    });
  }
}
