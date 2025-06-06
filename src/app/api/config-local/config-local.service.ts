import { prisma } from '@/core/libs/prisma';

export class ConfigLocalService {
  async findAll() {
    return prisma.configLocal.findMany();
  }

  async findById(id: string) {
    return prisma.configLocal.findUnique({
      where: { ConfigName: id },
    });
  }

  async create(data: any) {
    return prisma.configLocal.create({
      data: {
        DataID: data.DataID,
        DataCenter: data.DataCenter,
        ConfigName: data.ConfigName,
        ConfigValue: data.ConfigValue,
        HWID: data.HWID,
        DataHash: data.DataHash,
      },
    });
  }

  async update(id: string, data: any) {
    return prisma.configLocal.update({
      where: { ConfigName: id },
      data: {
        DataID: data.DataID,
        DataCenter: data.DataCenter,
        ConfigValue: data.ConfigValue,
        HWID: data.HWID,
        DataHash: data.DataHash,
      },
    });
  }

  async delete(id: string) {
    return prisma.configLocal.delete({
      where: { ConfigName: id },
    });
  }
}
