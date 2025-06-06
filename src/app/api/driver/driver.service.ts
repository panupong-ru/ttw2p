import { prisma } from '@/core/libs/prisma';

export class DriverService {
  async findAll() {
    return prisma.driver.findMany({
      where: {
        FlagCancel: { not: '1' },
      },
    });
  }

  async findById(id: string) {
    return prisma.driver.findUnique({
      where: { DataID: id },
    });
  }

  async create(data: any) {
    return prisma.driver.create({
      data: {
        DataID: data.DataID,
        DataCenter: data.DataCenter,
        DriverID: data.DriverID,
        DriverName: data.DriverName,
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
    return prisma.driver.update({
      where: { DataID: id },
      data: {
        DataCenter: data.DataCenter,
        DriverID: data.DriverID,
        DriverName: data.DriverName,
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
    return prisma.driver.update({
      where: { DataID: id },
      data: { FlagCancel: '1' },
    });
  }
}
