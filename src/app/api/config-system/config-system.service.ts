import { prisma } from '@/core/libs/prisma';

export class ConfigSystemService {
  async findAll() {
    return prisma.configSystem.findMany();
  }

  async findById(id: string) {
    return prisma.configSystem.findUnique({
      where: { ConfigName: id },
    });
  }

  async create(data: any) {
    return prisma.configSystem.create({
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
    return prisma.configSystem.update({
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
    return prisma.configSystem.delete({
      where: { ConfigName: id },
    });
  }
}
