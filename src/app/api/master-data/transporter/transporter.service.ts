import { prisma } from '@/core/libs/prisma';
import type { Transporter } from '@/../prisma-client';

export class TransporterService {
  async findAll(page: number = 1, pageSize: number = 10): Promise<{ data: Transporter[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.transporter.findMany({
        skip,
        take: pageSize,
        orderBy: {
          TransporterID: 'asc',
        },
      }),
      prisma.transporter.count(),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<Transporter | null> {
    return prisma.transporter.findUnique({
      where: { DataID: id },
    });
  }

  async create(data: Omit<Transporter, 'DataID'>): Promise<Transporter> {
    return prisma.transporter.create({
      data: {
        DataID: data.TransporterID || crypto.randomUUID(),
        ...data,
      },
    });
  }

  async update(id: string, data: Partial<Transporter>): Promise<Transporter> {
    return prisma.transporter.update({
      where: { DataID: id },
      data,
    });
  }

  async delete(id: string): Promise<Transporter> {
    return prisma.transporter.delete({
      where: { DataID: id },
    });
  }
}
