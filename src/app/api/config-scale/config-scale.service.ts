import { prisma } from '@/core/libs/prisma';

export class ConfigScaleService {
  async findAll() {
    return prisma.configScale.findMany();
  }

  async findById(id: string) {
    return prisma.configScale.findUnique({
      where: { BrandName: id },
    });
  }

  async create(data: any) {
    return prisma.configScale.create({
      data: {
        DataID: data.DataID,
        DataCenter: data.DataCenter,
        BrandName: data.BrandName,
        ComPort: data.ComPort,
        BitPerSecond: data.BitPerSecond,
        DataBit: data.DataBit,
        Parity: data.Parity,
        StopBit: data.StopBit,
        PacketSize: data.PacketSize,
        StartAscii: data.StartAscii,
        EndAscii: data.EndAscii,
        WeightPos: data.WeightPos,
        WeightSize: data.WeightSize,
        ToledoFormat: data.ToledoFormat,
        RightToLeftWeight: data.RightToLeftWeight,
        Status: data.Status,
        HWID: data.HWID,
        DataHash: data.DataHash,
      },
    });
  }

  async update(id: string, data: any) {
    return prisma.configScale.update({
      where: { BrandName: id },
      data: {
        DataID: data.DataID,
        DataCenter: data.DataCenter,
        ComPort: data.ComPort,
        BitPerSecond: data.BitPerSecond,
        DataBit: data.DataBit,
        Parity: data.Parity,
        StopBit: data.StopBit,
        PacketSize: data.PacketSize,
        StartAscii: data.StartAscii,
        EndAscii: data.EndAscii,
        WeightPos: data.WeightPos,
        WeightSize: data.WeightSize,
        ToledoFormat: data.ToledoFormat,
        RightToLeftWeight: data.RightToLeftWeight,
        Status: data.Status,
        HWID: data.HWID,
        DataHash: data.DataHash,
      },
    });
  }

  async delete(id: string) {
    return prisma.configScale.delete({
      where: { BrandName: id },
    });
  }
}
